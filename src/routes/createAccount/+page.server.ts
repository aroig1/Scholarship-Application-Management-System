//import { initializeLucia } from "$lib/server/auth";
import {fail, redirect} from "@sveltejs/kit";
import {generateId} from "lucia";
import {Argon2id} from "oslo/password";
import {
    saveUser,
    checkUserTableExists,
    checkSessionTableExists,
    dropSession
} from "$lib/util";
import type {D1Database} from "@cloudflare/workers-types";
import type {Actions} from "./$types";
import type {User, UserID} from "$lib/types";
import {UserType} from "$lib/types";

const phoneNumberPattern = /^\(\d{3}\)-\d{3}-\d{4}$/;

const normalizePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumberPattern.test(phoneNumber)) {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
    }
    return phoneNumber;
};

const validateInput = (user: User, password: string) => {
    const errors = [];

    if (
        typeof user.username !== "string" ||
        user.username.length < 3 ||
        user.username.length > 31 ||
        !/^[a-zA-Z0-9+=!#$%^&*_-]+$/.test(user.username)
    ) {
        errors.push("Invalid username");
    }

    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255 ||
        !/^[a-zA-Z0-9+=!#$%^&*_-]+$/.test(password)
    ) {
        errors.push("Invalid password");
    }

    if (
        typeof user.firstName !== "string" ||
        user.firstName.length < 1 ||
        user.firstName.length > 255 ||
        !/^[a-zA-Z\s]+$/.test(user.firstName)
    ) {
        errors.push("Invalid first name");
    }

    if (
        typeof user.lastName !== "string" ||
        user.lastName.length < 1 ||
        user.lastName.length > 255 ||
        !/^[a-zA-Z\s]+$/.test(user.lastName)
    ) {
        errors.push("Invalid last name");
    }

    if (
        typeof user.email !== "string" ||
        user.email.length < 3 ||
        user.email.length > 255 ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
        errors.push("Invalid email");
    }

    if (!phoneNumberPattern.test(user.phone)) {
        const digitsOnly = user.phone.replace(/\D/g, "");
        if (digitsOnly.length < 10) {
            errors.push("Phone number must have at least 10 digits");
        }
        user.phone = normalizePhoneNumber(digitsOnly);
    }

    if (errors.length > 0) {
        throw new Error(errors.join("\n"));
    }
    return null;
};

async function checkUsers(db: D1Database, user_id: string): Promise<boolean> {
    const errors = [];

    try {
        const result = db
            .prepare(`SELECT COUNT(*) AS total FROM users WHERE username = ?`)
            .bind(user_id);
        const total = await result.first("total");

        if (total === 0) {
            return true;
        } else {
            errors.push("Username already taken. Please make a new username");
        }
    } catch (error: any) {
        errors.push(error.message);
    }

    if (errors.length > 0) {
        throw new Error(errors.join("\n"));
    }
    return false;
}

function getUserTypeFromString(userTypeString: string): UserType | undefined {
    switch (userTypeString.toLowerCase()) {
        case "applicant":
            return UserType.Applicant;
        case "administrator":
            return UserType.Administrator;
        case "donor":
            return UserType.Donor;
        default:
            return undefined; // Return undefined for invalid input
    }
}

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const id: UserID = generateId(15);
        const tempPass = formData.get("password") as string;
        const salt = generateId(8);
        const hashedPassword = await new Argon2id().hash(salt + tempPass);
        console.log(formData);
        const userTypeString = getUserTypeFromString(
            formData.get("userType") as string
        );
        let user: User;

        try {
            user = {
                id: id,
                password: {
                    hash: hashedPassword,
                    salt: salt
                },
                username: formData.get("username") as string,
                firstName: formData.get("firstName") as string,
                lastName: formData.get("lastName") as string,
                phone: formData.get("phoneNumber") as string,
                email: formData.get("email") as string,
                type: userTypeString as UserType
            };

            validateInput(user, tempPass);

            if (!event.platform?.env.DB) {
                let message = "DB IS NULL";
                return fail(422, {
                    error: true,
                    message
                });
            }
            console.log(user);
            console.log(event.platform);
            await checkUserTableExists(event.platform?.env.DB);

            if (await checkUsers(event.platform?.env.DB, user.username)) {
                await saveUser(event.platform?.env.DB, user);
            }
        } catch (error: any) {
            let message = error.message;

            return fail(422, {
                error: true,
                message
            });
        }

        checkSessionTableExists(event.platform?.env.DB);
        const session = await event.locals.lucia.createSession(id, {});
        const sessionCookie = event.locals.lucia.createSessionCookie(
            session.id
        );
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        redirect(302, "/"); //TODO:: SHOULD GO TO HOME PAGE
    }
};

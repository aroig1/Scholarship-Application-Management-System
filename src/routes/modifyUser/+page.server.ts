import {error, fail, redirect} from "@sveltejs/kit";
import {
    saveUser,
    checkUserTableExists,
    checkSessionTableExists,
    dropSession,
    loadUser_by_id,
    updateUser
} from "$lib/util";
import type {D1Database} from "@cloudflare/workers-types";
import type {Actions} from "@sveltejs/kit";
import type {User, UserID} from "$lib/types";
import {UserType} from "$lib/types";
import type {PageServerLoad} from "./$types";

const phoneNumberPattern = /^\(\d{3}\)-\d{3}-\d{4}$/;

const normalizePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumberPattern.test(phoneNumber)) {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
    }
    return phoneNumber;
};

const validateInput = (user: User) => {
    const errors = [];

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

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;

    if (event.locals.user?.id == null) {
        error(403, "You are not authorized to view this page");
    }

    await checkUserTableExists(db);
    const user = (await loadUser_by_id(
        db,
        event.locals.user?.id as unknown as string
    )) as User;

    return {
        user: user
    };
};

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        let user: User;

        try {
            user = {
                id: event.locals.user?.id as string,
                password: {
                    hash: "",
                    salt: ""
                },
                username: "",
                firstName: formData.get("firstName") as string,
                lastName: formData.get("lastName") as string,
                phone: formData.get("phoneNumber") as string,
                email: formData.get("email") as string,
                type: "" as unknown as UserType
            };

            validateInput(user);

            if (!event.platform?.env.DB) {
                let message = "DB IS NULL";
                return fail(422, {
                    error: true,
                    message
                });
            }
            await checkUserTableExists(event.platform?.env.DB);
            await updateUser(event.platform?.env.DB, user);
        } catch (error: any) {
            let message = error.message;

            return fail(422, {
                error: true,
                message
            });
        }

        redirect(302, "/");
    }
};

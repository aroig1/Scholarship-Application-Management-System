import type {D1Database} from "@cloudflare/workers-types";
import {fail, redirect, error} from "@sveltejs/kit";
import {Argon2id} from "oslo/password";
import {loadUser_by_username, checkUserTableExists} from "$lib/util";

import type {Actions, PageServerLoad} from "./$types";
import {UserType, type User} from "$lib/types";

export async function _doesUsernameExist(db: D1Database, username: string) {
    const errors = [];

    try {
        const results = db
            .prepare(
                "SELECT COUNT(*) AS count FROM users WHERE username LIKE ?1"
            )
            .bind(username);
        const total = await results.first("count");

        if (total === 0) {
            errors.push("Invalid Username or Password, Please try again");
        }
    } catch (error: any) {
        errors.push(error.message);
    }

    if (errors.length > 0) {
        throw new Error(errors.join("\n"));
    }
}

export const load: PageServerLoad = async (event) => {
    if (event.locals.user?.id != null) {
        error(403);
    }
};

export const actions: Actions = {
    login: async (event: any) => {
        const formData = await event.request.formData();
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        let existingUser;

        if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-zA-Z0-9+=!#$%^&*_-]/.test(username)
        ) {
            return fail(422, {
                error: true,
                message: "Invalid username"
            });
        }
        if (
            typeof password !== "string" ||
            password.length < 6 ||
            password.length > 255 ||
            !/^[a-zA-Z0-9+=!#$%^&*_-]/.test(username)
        ) {
            return fail(422, {
                error: true,
                message: "Invalid password"
            });
        }

        try {
            if (!event.platform?.env.DB) {
                let message = "DB IS NULL";
                return fail(422, {
                    error: true,
                    message
                });
            }

            await checkUserTableExists(event.platform?.env.DB);

            await _doesUsernameExist(event.platform?.env.DB, username);

            existingUser = (await loadUser_by_username(
                event.platform?.env.DB,
                username
            )) as User;
            // if(existingUser === null)
            const validPassword = await new Argon2id().verify(
                existingUser?.password.hash,
                existingUser?.password.salt + password
            );

            if (!validPassword) {
                throw new Error("Incorrect username or password");
            }
        } catch (error: any) {
            let message = error.message;

            return fail(404, {
                error: true,
                message: message
            });
        }

        const session = await event.locals.lucia.createSession(
            existingUser?.id,
            {}
        );
        const sessionCookie = event.locals.lucia.createSessionCookie(
            session.id
        );
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        redirect(302, "/");
    }
};

import type {Actions} from "@sveltejs/kit";
import type {D1Database} from "@cloudflare/workers-types";
import {fail} from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const first = formData.get("firstName") as string;
        const last = formData.get("lastName") as string;

        let foundUsers;

        if (!event.platform?.env.DB) {
            let message = "DB IS NULL";
            return fail(422, {
                error: true,
                message
            });
        }

        if (first.length > 0 && last.length > 0) {
            foundUsers = await event.platform?.env.DB.prepare(
                `SELECT * FROM users WHERE firstName LIKE ?1 AND lastName LIKE ?2`
            )
                .bind("%" + first + "%", "%" + last + "%")
                .all();
        } else if (first.length > 0) {
            foundUsers = await event.platform?.env.DB.prepare(
                `SELECT * FROM users WHERE firstName LIKE ?`
            )
                .bind("%" + first + "%")
                .all();
        } else {
            foundUsers = await event.platform?.env.DB.prepare(
                `SELECT * FROM users WHERE lastName LIKE ?`
            )
                .bind("%" + last + "%")
                .all();
        }

        return {
            isSearchView: false,
            Users: foundUsers.results
        };
    }
};

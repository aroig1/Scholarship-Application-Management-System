import {saveScholarship} from "$lib/util";
import {v4 as uuidv4} from "uuid";
import type {Major, Minor, Scholarship} from "$lib/types.js";
import type {PageServerLoad} from "./$types";
import {UserType, majors, minors} from "$lib/types";

import {error, redirect, type Actions} from "@sveltejs/kit";
import type {D1Database} from "@cloudflare/workers-types";

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;
    // @ts-ignore
    if (event.locals.user?.type != UserType.Donor) {
        error(403, "You are not authorized to view this page");
    }

    return {
        majors: majors as unknown as Major[],
        minors: minors as unknown as Minor[]
    };
};

export const actions: Actions = {
    default: async ({locals, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;

        const scholarship: Scholarship = {
            id: uuidv4(),
            name: data.get("name") as string,
            amount: Number(data.get("amount") as string),
            donorID: locals.user?.id as string,
            numAvailable: Number(data.get("numAvailable") as string),
            requiredMajors: JSON.parse(
                data.get("requiredMajors") as string
            ).map((s: string) => s as Major),
            requiredMinors: JSON.parse(
                data.get("requiredMinors") as string
            ).map((s: string) => s as Minor),
            requiredGPA: Number(data.get("requiredGPA") as string),
            deadline: new Date(data.get("deadline") as string),
            other: data.get("other") as string,
            description: data.get("description") as string,
            archived: false
        };

        saveScholarship(db, scholarship);

        redirect(302, "/donorScholarships");
    }
};

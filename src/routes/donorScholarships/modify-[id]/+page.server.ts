import {
    updateScholarship,
    loadScholarship,
    checkUserTableExists
} from "$lib/util";
import type {Major, Minor, Scholarship} from "$lib/types";
import {UserType, majors, minors} from "$lib/types";

import {error, type Actions} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";

async function loadDBScholarship(id: string | undefined, db: D1Database) {
    return (await loadScholarship(
        db,
        id as string // id for testing: "6edf1e4c-2178-40a2-8825-7faadbb9f072"
    )) as Scholarship;
}

export const load: PageServerLoad = async (event) => {
    const db = event.platform?.env.DB as D1Database;

    // @ts-ignore
    if (
        event.locals.user?.type != UserType.Administrator &&
        event.locals.user?.type != UserType.Donor
    ) {
        error(403);
    }

    const scholarship = await loadDBScholarship(event.params.id, db);

    return {
        majors: majors as unknown as Major[],
        minors: minors as unknown as Minor[],
        scholarship: scholarship
    };
};

export const actions: Actions = {
    name: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.name = data.get("name") as string;
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    amount: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.amount = Number(data.get("amount") as string);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    numAvailable: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.numAvailable = Number(data.get("numAvailable") as string);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    requiredMajors: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.requiredMajors = JSON.parse(
            data.get("requiredMajors") as string
        ).map((s: string) => s as Major);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    requiredMinors: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.requiredMinors = JSON.parse(
            data.get("requiredMinors") as string
        ).map((s: string) => s as Minor);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    requiredGPA: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.requiredGPA = Number(data.get("requiredGPA") as string);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    deadline: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.deadline = new Date(data.get("deadline") as string);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    other: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.other = data.get("other") as string;
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    description: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.description = data.get("description") as string;
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    archived: async ({params, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB as D1Database;
        const scholarship = await loadDBScholarship(params.id, db);

        scholarship.archived = !scholarship.archived;
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    }
};

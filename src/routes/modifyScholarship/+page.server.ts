import {updateScholarship, loadScholarship} from '$lib/util'
import type {Major, Minor, Scholarship} from "$lib/types.js";

import type {Actions} from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import type { D1Database } from '@cloudflare/workers-types';

async function loadDBScholarship (db: D1Database) {
    return await loadScholarship(db, "6edf1e4c-2178-40a2-8825-7faadbb9f072") as Scholarship; // MUST BE UPDATED BASED ON SCHOLARSHIP SELECTED
}

export const load: PageServerLoad = async ({ platform }) => {
    const db = platform?.env.DB;
    const scholarship = await loadDBScholarship(db);

    return {
        scholarship: scholarship
    };
}

export const actions: Actions = {
    name: async ({request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;
        const scholarship = await loadDBScholarship(db);

        scholarship.name = data.get("name") as string;
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    amount: async ({request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;
        const scholarship = await loadDBScholarship(db);

        scholarship.amount = Number(data.get("amount") as string);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    numAvailable: async ({request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;
        const scholarship = await loadDBScholarship(db);

        scholarship.numAvailable = Number(data.get("numAvailable") as string);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    requiredMajors: async ({request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;
        const scholarship = await loadDBScholarship(db);

        scholarship.requiredMajors = JSON.parse(data.get("requiredMajors") as string).map((s: string) => s as Major);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    requiredMinors: async ({request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;
        const scholarship = await loadDBScholarship(db);

        scholarship.requiredMinors = JSON.parse(data.get("requiredMinors") as string).map((s: string) => s as Minor);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    requiredGPA: async ({request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;
        const scholarship = await loadDBScholarship(db);

        scholarship.requiredGPA = Number(data.get("requiredGPA") as string);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    deadline: async ({request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;
        const scholarship = await loadDBScholarship(db);

        scholarship.deadline = new Date(data.get("deadline") as string);
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    },
    other: async ({request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;
        const scholarship = await loadDBScholarship(db);

        scholarship.other = data.get("other") as string;
        updateScholarship(db, scholarship);

        return {
            success: true
        };
    }
};
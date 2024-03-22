import {updateScholarship, loadScholarship} from '$lib/util'
import type {Major, Minor, Scholarship} from "$lib/types.js";

import type {Actions} from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
    const db = platform?.env.DB;
    const scholarship = await loadScholarship(db, "test") as Scholarship;

    return {
        scholarship: scholarship
    };
}

export const actions: Actions = {
    default: async ({cookies, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;

        console.log("SUBMITTED FORM");
        console.log(data);

        const scholarship: Scholarship = {
            id: "GET ID DYNAMICALLY", // Not in form, grabbed based on scholarship chosen to modify
            name: data.get("name") as string,
            amount: Number(data.get("amount") as string),
            donorID: data.get("donorID") as string, // needs to be loaded from user data
            numAvailable: Number(data.get("numAvailable") as string),
            requiredMajors: JSON.parse(data.get("requiredMajors") as string).map((s: string) => s as Major),
            requiredMinors: JSON.parse(data.get("requiredMinors") as string).map((s: string) => s as Minor),
            requiredGPA: Number(data.get("requiredGPA") as string),
            deadline: new Date(data.get("deadline") as string),
            other: data.get("other") as string
        };

        console.log("CREATED SCHOLARSHIP");

        updateScholarship(db, scholarship); 

        console.log("UPDATED DATABASE");

        return {
            success: true
        };
    }
};

// import {updateScholarship} from '$lib/util.ts'
import type {Major, Minor, Scholarship} from "$lib/types.js";

import type {Actions} from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({cookies, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;

        const scholarship: Scholarship = {
            id: data.get("id") as string, // Not in form, should be uniquely generated
            name: data.get("name") as string,
            amount: Number(data.get("amount") as string),
            donorID: data.get("donorID") as string, // needs to be loaded from user data
            numAvailable: Number(data.get("numAvailable") as string),
            requiredMajors: [data.get("requiredMajors") as Major],
            requiredMinors: [data.get("requiredMinors") as Minor],
            requiredGPA: Number(data.get("requiredGPA") as string),
            deadline: new Date(data.get("deadline") as string),
            other: data.get("other") as string
        };

        console.log(scholarship)

        // updateScholarship(db, scholarship); // utils function

        return {
            success: true
        };
    }
};

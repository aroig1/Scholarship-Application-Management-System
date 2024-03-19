// import {saveScholarship} from '$lib/util.ts'
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
            donorID: data.get("donorID") as string,
            numAvailable: Number(data.get("numAvailable") as string),
            requiredMajors: JSON.parse(data.get("requiredMajors") as string).map((s: string) => s as Major),
            requiredMinors: JSON.parse(data.get("requiredMinors") as string).map((s: string) => s as Minor),
            requiredGPA: Number(data.get("requiredGPA") as string),
            deadline: new Date(data.get("deadline") as string),
            other: data.get("other") as string
        };

        console.log(scholarship);

        //saveScholarship(db, scholarship) // utils function

        return {
            success: true
        };
    }
};

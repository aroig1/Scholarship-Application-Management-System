import {saveScholarship, loadUser} from "$lib/util";
import {v4 as uuidv4} from "uuid";
import type {Major, Minor, Scholarship} from "$lib/types.js";

import type {Actions} from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({cookies, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;

        console.log(data);

        const scholarship: Scholarship = {
            id: uuidv4(),
            name: data.get("name") as string,
            amount: Number(data.get("amount") as string),
            donorID: "TEMP DONOR ID", // needs to be loaded from user data (DORIAN'S COOKIES)
            numAvailable: Number(data.get("numAvailable") as string),
            requiredMajors: JSON.parse(
                data.get("requiredMajors") as string
            ).map((s: string) => s as Major),
            requiredMinors: JSON.parse(
                data.get("requiredMinors") as string
            ).map((s: string) => s as Minor),
            requiredGPA: Number(data.get("requiredGPA") as string),
            deadline: new Date(data.get("deadline") as string),
            other: data.get("other") as string
        };

        await saveScholarship(db, scholarship);

        return {
            success: true
        };
    }
};

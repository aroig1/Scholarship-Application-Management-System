import {saveApplication} from '$lib/util'
import { v4 as uuidv4 } from 'uuid';
import type {Application} from "$lib/types.js";

import type {Actions} from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({cookies, request, platform}) => {
        const data = await request.formData();
        const db = platform?.env.DB;

        const application: Application = {
            id: uuidv4(),
            applicant: "TEMP USER ID", // not in form, loaded in from user data (DORIAN's COOKIES)
            scholarship: "TEMP SCHOLARSHIP ID", // not in form, loaded in somehow, changes based on dynamically loaded page
            statement: data.get("statement") as string
        };

        console.log(application)

        saveApplication(db, application); 

        return {
            success: true
        };
    }
};
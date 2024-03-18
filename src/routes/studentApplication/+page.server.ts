import {saveApplication} from '$lib/util.ts'
import type { Application } from '$lib/types.js'

import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({cookies, request, platform} ) => {
		const data = await request.formData();
        const db = platform?.env.DB;

        const application : Application = {
            applicant: data.get('applicant') as string,
            scholarship: data.get('scholarship') as string,
            statement: data.get('statement') as string
        }

        saveApplication(db, application) // utils function
	}
};
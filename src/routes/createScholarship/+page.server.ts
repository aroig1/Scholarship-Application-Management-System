import {saveScholarship} from '$lib/util.ts'
import type {Scholarship} from '$lib/types.js'

import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ cookies, request, platform }) => {
		const data = await request.formData();
        /** @type {import('$lib/types').Scholarship} */
        const db = platform?.env.DB;

        const scholarship : Scholarship = {
            id: data.get('id') as string,
            name: data.get('name') as string,
            amount: data.get('amount'),
            donorID: data.get('donorID') as string,
            numAvailable: data.get('numAvailable'),
            requiredMajors: data.get('requiredMajors'),
            requiredMinors: data.get('requiredMinors'),
            requiredGPA: data.get('requiredGPA'),
            deadline: data.get('deadline'),
            other: data.get('other') as string
        }

        saveScholarship(db, scholarship) // utils function
	}
};
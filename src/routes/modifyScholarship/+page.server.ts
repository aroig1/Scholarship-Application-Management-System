import {updateScholarship} from '$lib/util.ts'
import type { Scholarship } from '$lib/types.js';

import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ cookies, request, platform }) => {
		const data = await request.formData();
        const db = platform?.env.DB;

        const scholarship : Scholarship = {
            id: data.get('id') as string,
            name: data.get('name') as string,
            amount: data.get('amount'), // number type
            donorID: data.get('donorID') as string,
            numAvailable: data.get('numAvailable'), // number type
            requiredMajors: data.get('requiredMajors'),
            requiredMinors: data.get('requiredMinors'),
            requiredGPA: data.get('requiredGPA'),
            deadline: data.get('deadline'),
            other: data.get('other') as string
        }

        updateScholarship(db, scholarship) // utils function
	}
};
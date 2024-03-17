export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
        /** @type {import('$lib/types').Scholarship} */
		let scholarship;
        const db = platform.env.DB;

        scholarship.id = data.get('id');
        scholarship.name = data.get('name');
        scholarship.donorID = data.get('donorID');
        scholarship.numAvailable = data.get('numAvailable');
        scholarship.requiredMajors = data.get('requiredMajors');
        scholarship.requiredMinors = data.get('requiredMinors');
        scholarship.requiredGPA = data.get('requiredGPA');
        scholarship.deadline = data.get('deadline');
        scholarship.other = data.get('other');

        saveScholarship(db, scholarship) // utils function
	}
};
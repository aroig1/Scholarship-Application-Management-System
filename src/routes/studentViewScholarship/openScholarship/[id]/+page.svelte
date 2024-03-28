<script>
    /**@type {import('./$types').PageData} */
    /** @type {import('$lib/types').Scholarship} */
    export let data;
    // @ts-ignore
    const scholarship = data.scholarship;
</script>

<a href="/">Home</a>

<section>
    <h1>Scholarship Information</h1>
    <div class="container">
        <div>
            <h3>Name: {scholarship.name}</h3>
            <h3>Total Amount: ${scholarship.amount}</h3>
            <h3>Required GPA: {scholarship.requiredGPA}</h3>
            <h3>Required Majors: {scholarship.requiredMajors}</h3>
            <h3>Required Minors: {scholarship.requiredMinors}</h3>
            <h3>Deadline: {scholarship.deadline}</h3>
            <a
                href="/studentViewScholarship/studentApplication/{scholarship.id}">
                <button>Apply</button>
            </a>
        </div>
    </div>
</section>

<style>
    .container {
        display: block;
        flex-wrap: nowrap;
        border: 1px solid #ccc;
        padding: 10px;
    }
    button {
        margin-top: 10px;
    }
</style>

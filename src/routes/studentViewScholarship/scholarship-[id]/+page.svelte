<script>
    import {dateToString} from "$lib/util";

    export let data;
    const scholarship = data.scholarship;
</script>

<section>
    <a href="/studentViewScholarship">
        <h3>Back</h3>
    </a>
    <h1>Scholarship Information</h1>
    <div class="container">
        <div>
            <h3>Name: {scholarship.name}</h3>
            <h3>Total Amount: ${scholarship.amount}</h3>
            <h3>Required GPA: {scholarship.requiredGPA}</h3>
            <h3>Required Majors: {scholarship.requiredMajors}</h3>
            <h3>Required Minors: {scholarship.requiredMinors}</h3>
            <h3>Deadline: {dateToString(scholarship.deadline)}</h3>
            <h3>Description</h3>
            <p>{scholarship.description}</p>
            <a href="/studentViewScholarship/application-{scholarship.id}">
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

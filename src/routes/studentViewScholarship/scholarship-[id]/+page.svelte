<script>
    import {dateToString} from "$lib/util";

    export let data;
    const scholarship = data.scholarship;
</script>

<section>
    <h1>Scholarship Information</h1>
    <div class="container">
        <div>
            <h3>Name: {scholarship.name}</h3>
            <h3>Total Amount: ${scholarship.amount}</h3>
            <h3>Required GPA: {scholarship.requiredGPA}</h3>
            <h3>Required Majors: {scholarship.requiredMajors}</h3>
            <h3>Required Minors: {scholarship.requiredMinors}</h3>
            <h3>Deadline: {dateToString(scholarship.deadline)}</h3>
            <h3>Description:</h3>
            <p>{scholarship.description}</p>
            <a href="/studentViewScholarship/application-{scholarship.id}">
                <button>Apply</button>
            </a>
        </div>
    </div>
</section>

<style>
    h1 {
        text-align: center;
        font-size: 40px;
        margin: 25px;
    }
    .container {
        border: 1px solid #ccc;
        padding: 35px;
        margin: 0 20%;
        background-color: white;
        border-radius: 50px;
    }
    h3 {
        margin: 10px 0;
    }
    p {
        margin: 10px 0;
    }
    a {
        display: flex;
        justify-content: center;
        text-decoration: none;
    }
    button {
        margin-top: 10px;
        padding: 15px 30px;
        border-radius: 25px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }
    button:hover {
        background-color: rgb(55, 141, 189);
        cursor: pointer;
    }
</style>

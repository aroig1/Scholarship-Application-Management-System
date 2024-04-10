<script>
    export let data;
    const scholarship = data.scholarship;
</script>

<section>
    <a href="/studentViewScholarship/scholarship-{scholarship.id}">
        <h3>Back</h3>
    </a>
    <h1>{scholarship.name}</h1>
    <h1>Student Application</h1>
    <form method="POST">
        <div>
            <h2>Personal Statement</h2>
            <h3>
                Enter your personal statement / essay for the scholarship donor.
            </h3>
            <input
                name="statement"
                class="statement"
                type="text"
                placeholder="Personal Statement"
                maxlength="10000" />
        </div>
        <button>Submit Application</button>
    </form>
</section>

<style>
    section {
        margin: 0 auto;
        width: 90%;
        max-width: 700px;
        /* Styling for MultiSelect */
        --sms-options-max-height: 200px;
    }
    h1 {
        width: 100%;
        text-align: center;
    }
    h3 {
        padding: 0;
        margin: 0;
    }
    div {
        padding: 0;
        margin: 20px;
    }
    .statement {
        width: 100%;
        height: 100px;
    }
</style>

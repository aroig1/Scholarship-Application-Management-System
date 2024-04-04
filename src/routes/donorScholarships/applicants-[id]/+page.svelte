<script>
    export let data;
    const applicants = data.applicants;
</script>

<section>
    <a href="/donorScholarships">
        <h3>Back</h3>
    </a>
    <h1>Applications</h1>
    {#each applicants as applicant}
        <div class="container">
            <div>
                <h3>Name: {applicant.firstName} {applicant.lastName}</h3>
                <h3>GPA: {applicant.GPA}</h3>
                <h3>Year: {applicant.year}</h3>
                <h3>Majors: {applicant.majors}</h3>
                <a
                    href="/donorScholarships/applicant-{applicant.user}-{applicant.scholarship}">
                    <button>Review Applicant</button>
                </a>
            </div>
            <div class="big-box" id="description-box"></div>
        </div>
    {/each}
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

    .big-box {
        display: none;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        margin-top: 10px;
    }
</style>

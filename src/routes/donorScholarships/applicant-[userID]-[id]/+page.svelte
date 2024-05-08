<script>
    // @ts-nocheck

    export let data;
    const applicant = data.applicant;
</script>

<section>
    <h1>{applicant.firstName} {applicant.lastName}</h1>
    <div class="container">
        <h3>Application status: {applicant.status}</h3>
        <h3>GPA: {applicant.GPA}</h3>
        <h3>Year: {applicant.year}</h3>
        <h3>Majors:</h3>
        {#each applicant.majors as major}
            <li>{major}</li>
        {/each}
        <h3>Minors:</h3>
        {#each applicant.minors as minor}
            <li>{minor}</li>
        {/each}
        <h3>Work Experience</h3>
        {#each applicant.workExperience as work}
            <p>{work}</p>
        {/each}
        <h3>Statement</h3>
        <p>{applicant.statement}</p>
        <div class="buttons">
            <form method="POST">
                <button class="suggest">Suggest This Applicant</button>
            </form>
            <a href="/donorScholarships/applicants-{applicant.scholarship}">
                <button>Back</button>
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

    li {
        margin: 5px 0;
    }

    p {
        margin: 5px 0;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }
    .suggest {
        padding: 15px 30px;
    }
    button {
        padding: 10px 25px;
        margin: 10px 0;
        border-radius: 20px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }
    button:hover {
        background-color: rgb(55, 141, 189);
        cursor: pointer;
    }
</style>

<script>
    export let data;
    const applicant = data.applicant[0];
</script>

<section>
    <a href="/adminViewDonors/allApps-{applicant.scholarship}">
        <h3>Back</h3>
    </a>
    <h3>Application status: {applicant.status}</h3>
    <h2>{applicant.firstName} {applicant.lastName}</h2>
    <p>Year: {applicant.year}</p>
    <p>Majors: {applicant.majors}</p>
    <p>Minors: {applicant.minors}</p>
    <p>GPA: {applicant.GPA}</p>
    <h3>Work Experience</h3>
    <p>{applicant.workExperience}</p>
    <h3>Statement</h3>
    <p>{applicant.statement}</p>
    <form method="POST" action="?/award">
        <button
            >Award the Scholarship to {applicant.firstName}
            {applicant.lastName}</button>
    </form>
    <form method="POST" action="?/reject">
        <button>Reject {applicant.firstName} {applicant.lastName}</button>
    </form>
</section>

<style>
    button {
        padding: 3px;
        margin: 5px;
    }
</style>

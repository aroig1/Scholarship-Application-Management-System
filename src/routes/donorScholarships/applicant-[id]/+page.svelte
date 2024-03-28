<script>
    export let data;
    const applicant = data.applicant[0];
</script>

<section>
    <h2>{applicant.firstName} {applicant.lastName}</h2>
    <p>Majors: {applicant.majors}</p>
    <p>Minors: {applicant.minors}</p>
    <p>GPA: {applicant.GPA}</p>
    <h3>Work Experience</h3>
    <p>{applicant.workExperience}</p>
    <h3>Statement</h3>
    <p>{applicant.statement}</p>
</section>
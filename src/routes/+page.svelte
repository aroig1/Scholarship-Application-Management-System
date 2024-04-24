<script>
    export let data;

    /**
     * @type {string}
     */
    let userType;
    if (data.user.type == 0) {
        userType = "Applicant";
    } else if (data.user.type == 1) {
        userType = "Administrator";
    } else {
        userType = "Donor";
    }
</script>

<h1>Welcome to UASAMS {data.user.firstName} {data.user.lastName}</h1>
<h3>({userType})</h3>
<h3>Temporary home for navigating</h3>
<li>
    <a href="/createScholarship">Shortcut Create Scholarship</a>
</li>
<li>
    <a href="/donorScholarships/modify-6edf1e4c-2178-40a2-8825-7faadbb9f072"
        >Shortcut Modify Scholarship</a>
</li>
<li>
    <a
        href="/studentViewScholarship/application-6edf1e4c-2178-40a2-8825-7faadbb9f072"
        >Shortcut Student Application</a>
</li>
<li>
    <a href="/applicantInfo">Applicant Info</a>
</li>
<li>
    <a href="/modifyApplicantInfo">Modify Applicant Info</a>
</li>
<li>
    <a href="/donorScholarships">Donor Scholarships</a>
</li>
<li>
    <a href="/studentViewScholarship">Student Scholarships</a>
</li>
<li>
    <a href="/loginPage">Login Page</a>
</li>
<li>
    <a href="/logoutPage">SIGN OUT</a>
</li>

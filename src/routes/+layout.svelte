<header>
    <h2>
        <a href="/">The University of Arizona</a>
    </h2>
    <nav>
        <li>
            <a href="/studentViewScholarship">Student Scholarships</a>
        </li>
        <li>
            <a href="/donorScholarships">Donor Scholarships</a>
        </li>
        <li>
            <a href="/adminViewDonors">View Donors</a>
        </li>
        <li>
            <a href="/applicantInfo">Applicant Information</a>
        </li>
        <li>
            <a href="/modifyApplicantInfo">Modify Applicant Info</a>
        </li>
        <li>
            <a href="/modifyUser">Modify User</a>
        </li>
        <li>
            <a href="/loginPage">Login Page</a>
        </li>
        <li>
            <a href="/logoutPage">SIGN OUT</a>
        </li>
        <li>
            <a href="/ReportEngine/UserReportPage">REPORTS</a>
        </li>
        <li>
            <a href="/FindUsers">ADMIN--UpdateUsers</a>
        </li>
    </nav>
</header>

<slot />

<style>
    * {
        padding: 0;
        margin: 0;
    }

    header {
        width: 100%;
        color: white;
        background-color: darkred;
    }

    h2 {
        padding: 10px;
    }

    nav {
        display: flex;
        justify-content: space-evenly;
    }

    li {
        list-style: none;
        padding: 5px 15px;
    }

    a {
        color: white;
        text-decoration: none;
    }

    li:hover {
        background-color: rgb(55, 54, 54);
    }
</style>

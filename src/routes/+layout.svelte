<script lang="ts">
    export let data;
</script>

<header>
    {#if data.user_type == data.types.Applicant && data.applicantInfo > 0}
        <h3>The University of Arizona</h3>
        <div class="aboveNav">
            <div class="left">
                <a href="/">
                    <img
                        src="/homeicon.png"
                        alt="home button"
                        class="home_icon" />
                </a>
                <img src="/favicon.png" alt="U of A logo" class="uofa_logo" />
                <h1>UASAMS</h1>
            </div>
            <div class="right">
                <h3 class="name">{data.user_name}</h3>
                <img
                    src="/settingsicon.png"
                    alt="settings button"
                    class="settings_icon" />
            </div>
        </div>
        <nav>
            <li>
                <a href="/studentViewScholarship">Student Scholarships</a>
            </li>
            <li>
                <a href="/viewMyApplications">View My Applications</a>
            </li>
            <li>
                <a href="/modifyApplicantInfo">Modify Applicant Info</a>
            </li>
            <li>
                <a href="/modifyUser">Modify User</a>
            </li>
            <li>
                <a href="/logoutPage">SIGN OUT</a>
            </li>
        </nav>
    {:else if data.user_type == data.types.Donor}
        <h3>The University of Arizona</h3>
        <div class="aboveNav">
            <div class="left">
                <a href="/">
                    <img
                        src="/homeicon.png"
                        alt="home button"
                        class="home_icon" />
                </a>
                <img src="/favicon.png" alt="U of A logo" class="uofa_logo" />
                <h1>UASAMS</h1>
            </div>
            <div class="right">
                <h3 class="name">{data.user_name}</h3>
                <img
                    src="/settingsicon.png"
                    alt="settings button"
                    class="settings_icon" />
            </div>
        </div>
        <nav>
            <li>
                <a href="/donorScholarships">Donor Scholarships</a>
            </li>
            <li>
                <a href="/modifyUser">Modify User</a>
            </li>
            <li>
                <a href="/logoutPage">SIGN OUT</a>
            </li>
        </nav>
    {:else if data.user_type == data.types.Administrator}
        <h3>The University of Arizona</h3>
        <div class="aboveNav">
            <div class="left">
                <a href="/">
                    <img
                        src="/homeicon.png"
                        alt="home button"
                        class="home_icon" />
                </a>
                <img src="/favicon.png" alt="U of A logo" class="uofa_logo" />
                <h1>UASAMS</h1>
            </div>
            <div class="right">
                <h3 class="name">{data.user_name}</h3>
                <img
                    src="/settingsicon.png"
                    alt="settings button"
                    class="settings_icon" />
            </div>
        </div>
        <nav>
            <li>
                <a href="/adminViewDonors">View Donors</a>
            </li>
            <li>
                <a href="/modifyUser">Modify User</a>
            </li>
            <li>
                <a href="/FindUsers">ADMIN--UpdateUsers</a>
            </li>
            <li>
                <a href="/ReportEngine/UserReportPage">REPORTS</a>
            </li>
            <li>
                <a href="/logoutPage">SIGN OUT</a>
            </li>
        </nav>
    {:else}
        <h3>The University of Arizona</h3>
    {/if}
</header>

<slot />

<style>
    :global(*) {
        padding: 0;
        margin: 0;
    }

    header {
        width: 100%;
    }

    h3 {
        padding: 5px;
        text-align: center;
        color: white;
        background-color: darkred;
    }

    .aboveNav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 8%;
        border-bottom-style: groove;
        border-bottom-width: 1.5px;
    }

    .left {
        display: flex;
        align-items: center;
    }

    .home_icon {
        height: 25px;
        margin: 0 10px;
        padding: 5px;
        border-radius: 50%;
        border-style: groove;
        border-color: white;
    }

    .home_icon:hover {
        border-style: groove;
        border-color: grey;
    }

    .uofa_logo {
        height: 60px;
        margin: 0 10px;
    }

    h1 {
        margin: 0 10px;
        color: rgb(12, 35, 75);
    }

    .right {
        display: flex;
        align-items: center;
    }

    .settings_icon {
        height: 35px;
        margin: 0 10px;
    }

    .name {
        font-size: 15px;
        margin: 0 10px;
        background-color: white;
        color: rgb(12, 35, 75);
    }

    nav {
        display: flex;
        justify-content: space-around;
        padding: 10px 100px;
        box-shadow: 0px 2px 10px #aaaaaa;
    }

    li {
        list-style: none;
        padding: 5px 15px;
    }

    a {
        color: rgb(12, 35, 75);
        text-decoration: none;
    }

    li a:hover {
        color: rgb(55, 141, 189);
        text-decoration: underline;
    }
</style>

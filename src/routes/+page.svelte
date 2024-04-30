<script>
    export let data;
</script>

<section>
    <div class="main_picture">
        <h1>Welcome to the UASAMS</h1>
    </div>

    <div class="intro">
        <h3>
            Welcome to the University of Arizona Scholarship Application
            Management System (UASAMS) {data.user.firstName}
            {data.user.lastName}!
        </h3>
        {#if data.user.type == 0}
            <p>
                Are you a student with aspirations to further your education but
                in need of financial support? Look no further! UASAMS is here to
                simplify your scholarship application journey. As an applicant,
                this platform offers you a streamlined and user-friendly
                experience to explore and apply for various scholarships
                available through the University of Arizona.
            </p>
            <p>With UASAMS, you can:</p>
            <li>
                Easily create an account to get started on your scholarship
                application journey.
            </li>
            <li>
                Access a comprehensive list of scholarships tailored to your
                academic interests and qualifications.
            </li>
            <li>
                Submit your scholarship applications conveniently through our
                intuitive interface.
            </li>
            <li>
                Keep track of your submitted applications and make any necessary
                updates or modifications.
            </li>
            <li>
                Receive notifications and updates on the status of your
                applications.
            </li>
            <li>
                Explore scholarship opportunities that match your academic
                achievements, extracurricular activities, and personal
                background.
            </li>
            <p>
                At UASAMS, we understand the importance of access to education
                and are dedicated to supporting your academic endeavors. Join us
                in your pursuit of excellence and unlock opportunities for your
                future today!
            </p>
        {:else if data.user.type == 1}
            <p>
                Are you tasked with managing scholarship programs and
                facilitating the selection process for deserving students?
                UASAMS is your comprehensive solution for efficiently overseeing
                scholarship administration and ensuring that opportunities are
                accessible to all qualified applicants. As an administrator
                user, you have the tools and resources at your fingertips to
                streamline operations and empower students on their educational
                journey.
            </p>
            <p>Here's how UASAMS empowers you as an administrator:</p>
            <li>
                Seamlessly navigate through the system with an intuitive
                interface designed specifically for administrators.
            </li>
            <li>
                Stay organized and informed with access to comprehensive
                dashboards and reporting tools.
            </li>
            <li>
                Coordinate scholarship programs effortlessly by setting key
                deadlines, defining eligibility criteria, and managing
                application submissions.
            </li>
            <li>
                Facilitate a fair and transparent selection process by engaging
                with reviewers, forming selection committees, and evaluating
                applicants based on predefined criteria.
            </li>
            <li>
                Communicate effectively with donors, stakeholders, and
                scholarship recipients to provide updates and gather feedback.
            </li>
            <p>
                At UASAMS, we understand the importance of efficient scholarship
                administration in fostering academic success. Join us in our
                commitment to promoting diversity, equity, and inclusion in
                scholarship programs and empowering students to pursue their
                educational aspirations.
            </p>
        {:else}
            <p>
                Are you passionate about supporting the educational pursuits of
                aspiring students? UASAMS provides a centralized platform for
                donors like you to make a meaningful impact through scholarship
                contributions. As a donor user, you play a crucial role in
                empowering students to achieve their academic and career goals.
            </p>
            <p>Here's how UASAMS empowers you as a donor:</p>
            <li>
                Easily create an account to explore opportunities to sponsor
                scholarships and support students' educational journeys.
            </li>
            <li>
                Gain access to a diverse pool of talented and deserving students
                seeking financial assistance.
            </li>
            <li>
                Define eligibility criteria and application requirements for
                your scholarship contributions.
            </li>
            <li>
                Stay informed about the impact of your donations through
                comprehensive reports and updates on scholarship recipients.
            </li>
            <li>
                Engage with scholarship administrators, review applicants, and
                contribute to the selection process.
            </li>
            <li>
                Foster a culture of giving back and making a difference in the
                lives of students pursuing higher education.
            </li>
            <p>
                At UASAMS, we believe in the transformative power of education
                and the generosity of donors like you. Join us in our mission to
                provide students with the resources they need to excel
                academically and realize their full potential.
            </p>
        {/if}
    </div>
</section>

<style>
    .main_picture {
        height: 300px;
        background-image: url("/homepicture.png");
        background-size: 100%;
        background-position: bottom;
        align-content: center;
    }

    h1 {
        color: white;
        text-align: center;
        margin: 0 30%;
        font-size: 50px;
        background-color: rgba(169, 169, 169, 0.5);
        border-radius: 25px;
        padding: 10px;
    }

    .intro {
        margin: 0 15%;
        padding: 25px 0;
        background-color: white;
    }

    h3 {
        margin: 10px 0;
    }

    p {
        margin: 10px 0;
    }

    li {
        margin: 2px 0;
    }
</style>

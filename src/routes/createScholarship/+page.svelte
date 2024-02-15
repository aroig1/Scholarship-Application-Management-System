<a href="/">Home</a>
<section>
    <h1>Create New Scholarship</h1>
    <div>
        <h3>Enter scholarship name</h3>
        <input type="text" placeholder="super special scholarship" />
    </div>
    <div>
        <h3>Enter scholarship amount</h3>
        <input type="number" placeholder="1000" />
    </div>
    <div>
        <h3>Enter scholarship donor/sponsor full name</h3>
        <input type="text" placeholder="first name" />
        <input type="text" placeholder="last name" />
    </div>
    <div>
        <h3>Enter donor phone number</h3>
        <input type="text" placeholder="(999) 999-9999" />
    </div>
    <div>
        <h3>Enter donor email address</h3>
        <input type="email" placeholder="netID@arizona.edu" />
    </div>
    <div>
        <h3>Enter number of scholarships available</h3>
        <input type="number" placeholder="3" />
    </div>
    <div>
        <h3>Enter required majors (optional)</h3>
        <input
            class="major_minor"
            type="text"
            placeholder="software engineering, aerospace engineering" />
    </div>
    <div>
        <h3>Enter required minor (optional)</h3>
        <input
            class="major_minor"
            type="text"
            placeholder="sports management, entrepreneurship" />
    </div>
    <div>
        <h3>Enter minimum required GPA (optional)</h3>
        <input type="number" placeholder="3.0" />
    </div>
    <div>
        <h3>Enter application deadline</h3>
        <input type="date" />
    </div>
    <div>
        <h3>Enter any additional scholarship requirements (optional)</h3>
        <input
            class="other"
            type="text"
            placeholder="ex: Must be black if applying during february" />
    </div>
    <button>Create Scholarship</button>
</section>

<style>
    section {
        margin: 0 auto;
        width: 90%;
        max-width: 700px;
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
    button {
        /* figure out how to center */
        margin: 0 35%;
        padding: 10px;
        width: 150px;
    }
    .other {
        width: 100%;
        height: 50px;
    }
    .major_minor {
        width: 50%;
    }
</style>

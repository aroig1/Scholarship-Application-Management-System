<script>
    import {MultiSelect} from "svelte-multiselect";

    let Pronouns = [
        "He/Him",
        "She/Her",
        "They/Them",
        "Ze/Zir/Hir",
        "Xe/Xem/Xyrs"
    ];
    let pronounsSelected = [""];

    let majors = [
        "Aerospace Engineering",
        "Architectural Engineering",
        "Biomedical Engineering",
        "Biosystems Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Computer Science and Engineering",
        "Electrical and Computer Engineering",
        "Engineering Management",
        "Environmental Engineering",
        "Industrial Engineering",
        "Materials Science and Engineering",
        "Mechanical Engineering",
        "Mining Engineering",
        "Optical Sciences and Engineering",
        "Software Engineering",
        "Systems Engineering"
    ];
    let majorsSelected = [""];

    let minors = [
        "Aerospace Engineering",
        "Biosystems Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical and Computer Engineering",
        "Engineering Management",
        "Environmental Engineering",
        "Industrial Engineering",
        "Materials Science and Engineering",
        "Mechanical Engineering",
        "Mining Engineering",
        "Optical Sciences and Engineering",
        "Software Engineering",
        "Sustainable Mineral Resources",
        "Systems Engineering"
    ];
    let minorsSelected = [""];

    let years = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];
    let yearsSelected = [""];

    let ethnicity = [
        "Caucasian",
        "Hispanic",
        "Black",
        "European",
        "Asian",
        "Indian",
        "Nativce American",
        "Arabic/Middle Eastern",
        "Other"
    ];
    let ethnicitySelected = [""];
</script>

<section>
    <h1>Student Application</h1>
    <form method="POST">
        <div>
            <h3>Full Name</h3>
            <input
                type="text"
                placeholder="First Name(required)"
                maxlength="20" />
            <input
                type="text"
                placeholder="Middle Name(optional)"
                maxlength="20" />
            <input
                type="text"
                placeholder="Last Name(required)"
                maxlength="20" />
        </div>
        <div>
            <h3>Preferred Pronouns</h3>
            <select name="pronouns">
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
                <option value="Ze/Zir/Hir">Ze/Zir/Hir</option>
                <option value="Xe/Xem/Xyrs">Xe/Xem/Xyrs</option>
            </select>
        </div>
        <div>
            <h3>Student ID</h3>
            <input type="text" placeholder="Student ID" maxlength="20" />
        </div>
        <div>
            <h3>Select Majors</h3>
            <MultiSelect
                name="majors"
                bind:value={majorsSelected}
                options={majors}
                placeholder="Select Majors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Select Minors</h3>
            <MultiSelect
                name="minors"
                bind:value={minorsSelected}
                options={minors}
                placeholder="Select minors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Cumulative GPA</h3>
            <input name="GPA" type="number" placeholder="3.0" step="0.01" min="0" />
        </div>
        <div>
            <h3>Current Year</h3>
            <MultiSelect
                name="year"
                bind:value={yearsSelected}
                options={years}
                placeholder="Select Current Year"
                closeDropdownOnSelect={true}>
            </MultiSelect>
        </div>
        <div>
            <h3>Ethnicity</h3>
            <MultiSelect
                name="ethnicity"
                bind:value={ethnicitySelected}
                options={ethnicity}
                placeholder="Select Ethnicity"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Personal Statement</h3>
            <input
                name="statement"
                type="text"
                placeholder="Personal Statement"
                maxlength="5000" />
        </div>
        <div>
            <h3>Work Experience</h3>
            <input name="workExperience" type="text" placeholder="Work Experience" maxlength="1000" />
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
</style>

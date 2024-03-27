<script>
    import {MultiSelect} from "svelte-multiselect";

    /** @type {import('../$types').PageData} */
    export let data;
    /** @type {import('$lib/types').Scholarship} */
    // @ts-ignore
    const scholarship = data.scholarship;

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

    let areaClicked = {
        name: false,
        amount: false,
        donor: false,
        phone: false,
        email: false,
        numAvailable: false,
        major: false,
        minor: false,
        gpa: false,
        deadline: false,
        other: false
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section>
    <h1>Modify Scholarship</h1>

    <form class="info-container" method="POST" action="?/name">
        <div on:click={() => (areaClicked.name = true)} class="preview">
            <h3>Scholarship Name:</h3>
            <h4>{scholarship.name}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.name}
            <input
                name="name"
                value={scholarship.name}
                type="text"
                placeholder="Enter scholarship name here"
                maxlength="25" />
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.name = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/amount">
        <div on:click={() => (areaClicked.amount = true)} class="preview">
            <h3>Scholarship Amount:</h3>
            <h4>{scholarship.amount}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.amount}
            <input
                name="amount"
                value={scholarship.amount}
                type="number"
                placeholder="Enter scholarship amount here"
                min="0" />
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.amount = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/numAvailable">
        <div on:click={() => (areaClicked.numAvailable = true)} class="preview">
            <h3>Number of Scholarships Available:</h3>
            <h4>{scholarship.numAvailable}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.numAvailable}
            <input
                name="numAvailable"
                value={scholarship.numAvailable}
                type="number"
                placeholder="Enter number of scholarships available here"
                min="0" />
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.numAvailable = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/requiredMajors">
        <div on:click={() => (areaClicked.major = true)} class="preview">
            <h3>Required Majors:</h3>
            <h4>{scholarship.requiredMajors}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.major}
            <MultiSelect
                name="requiredMajors"
                value={scholarship.requiredMajors}
                options={majors}
                placeholder="Pick required majors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.major = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/requiredMinors">
        <div on:click={() => (areaClicked.minor = true)} class="preview">
            <h3>Required Minors:</h3>
            <h4>{scholarship.requiredMinors}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.minor}
            <MultiSelect
                name="requiredMinors"
                value={scholarship.requiredMinors}
                options={minors}
                placeholder="Pick required majors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.minor = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/requiredGPA">
        <div on:click={() => (areaClicked.gpa = true)} class="preview">
            <h3>Required GPA:</h3>
            <h4>{scholarship.requiredGPA}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.gpa}
            <input
                name="requiredGPA"
                value={scholarship.requiredGPA}
                type="number"
                placeholder="Enter minimum required GPA here"
                min="0" />
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.gpa = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/deadline">
        <div on:click={() => (areaClicked.deadline = true)} class="preview">
            <h3>Deadline:</h3>
            <h4>{scholarship.deadline}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.deadline}
            <input name="deadline" value={scholarship.deadline} type="date" />
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.deadline = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/other">
        <div on:click={() => (areaClicked.other = true)} class="preview">
            <h3>Other Scholarship Requirements:</h3>
            <h4>{scholarship.other}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.other}
            <input
                name="other"
                value={scholarship.other}
                type="text"
                placeholder="Enter any other scholarship requirements here" />
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.other = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>
</section>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    section {
        margin: 0 auto;
        width: 90%;
        max-width: 700px;
        --sms-options-max-height: 200px;
        /* Styling for MultiSelect */
        --sms-options-max-height: 200px;
        --sms-bg: white;
    }
    h1 {
        width: 100%;
        text-align: center;
    }
    .info-container {
        background-color: lightgray;
        border-radius: 50px;
        padding: 20px;
        margin: 25px;
    }
    .preview {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: lightgray;
    }
    img {
        width: 50px;
        margin-left: auto;
    }
    h4 {
        color: dimgrey;
        margin-left: 10px;
    }
    .buttons {
        display: flex;
        justify-content: space-evenly;
    }
    .buttons button {
        width: 100px;
        height: 30px;
    }
    input {
        width: 100%;
        margin: 10px 0;
        padding: 10px;
    }
</style>

<script>
    import {MultiSelect} from "svelte-multiselect";
    import {dateToString} from "$lib/util";

    /** @type {import('./$types').PageData} */
    export let data;
    /** @type {import('$lib/types').Scholarship} */
    // @ts-ignore
    const scholarship = data.scholarship;

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
        other: false,
        description: false,
        archived: false
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
                options={data.majors}
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
                options={data.minors}
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
                step="0.01"
                min="0"
                max="4" />
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
            <h4>{dateToString(scholarship.deadline)}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.deadline}
            <input
                name="deadline"
                value={scholarship.deadline.toISOString().slice(0, 10)}
                type="date" />
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
            <textarea
                name="other"
                value={scholarship.other}
                placeholder="Enter any other scholarship requirements here"
            ></textarea>
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.other = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/description">
        <div on:click={() => (areaClicked.description = true)} class="preview">
            <h3>Scholarship Description</h3>
            <h4>{scholarship.description}</h4>
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.description}
            <textarea
                name="description"
                value={scholarship.description}
                placeholder="Enter any other scholarship requirements here"
            ></textarea>
            <div class="buttons">
                <button>Confirm</button>
                <button on:click={() => (areaClicked.description = false)}
                    >Cancel</button>
            </div>
        {/if}
    </form>

    <form class="info-container" method="POST" action="?/archived">
        <div on:click={() => (areaClicked.archived = true)} class="preview">
            <h3>Scholarship Archived Status</h3>
            {#if scholarship.archived}
                <h4>Archived</h4>
            {:else}
                <h4>Not Archived</h4>
            {/if}
            <img class="down-arrow" src="/down_arrow.webp" alt="down arrow" />
        </div>
        {#if areaClicked.archived}
            <input
                class="hidden"
                name="archived"
                value={scholarship.archived} />
            <div class="buttons">
                {#if scholarship.archived}
                    <button>Unarchive</button>
                {:else}
                    <button>Archive</button>
                {/if}
                <button on:click={() => (areaClicked.archived = false)}
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
        font-size: 40px;
        margin: 40px;
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
        padding: 10px 25px;
        border-radius: 20px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }

    button:hover {
        background-color: rgb(55, 141, 189);
        cursor: pointer;
    }
    input {
        width: 100%;
        margin: 10px 0;
        padding: 10px;
    }
    textarea {
        width: 100%;
        margin: 10px 0;
        padding: 10px;
        height: 100px;
    }
    .hidden {
        visibility: hidden;
    }
</style>

<script>
    import {MultiSelect} from "svelte-multiselect";
``
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
        other: false
    };
</script>

<a href="/">Home</a>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section>
    <h1>Modify Scholarship</h1>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.name = !areaClicked.name)}
            class="preview">
            <h3>Scholarship Name:</h3>
            <h4>XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.name}
            <div class="input">
                <input
                    type="text"
                    placeholder="Enter scholarship name here"
                    maxlength="25" />
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() => (areaClicked.name = !areaClicked.name)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.amount = !areaClicked.amount)}
            class="preview">
            <h3>Scholarship Amount:</h3>
            <h4>XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.amount}
            <div class="input">
                <input
                    type="number"
                    placeholder="Enter scholarship amount here"
                    min="0" />
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() =>
                            (areaClicked.amount = !areaClicked.amount)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.donor = !areaClicked.donor)}
            class="preview">
            <h3>Scholarship Donor:</h3>
            <h4>XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.donor}
            <div class="input">
                <input
                    type="text"
                    placeholder="Enter scholarship donor name here"
                    maxlength="25" />
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() =>
                            (areaClicked.donor = !areaClicked.donor)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.phone = !areaClicked.phone)}
            class="preview">
            <h3>Donor Phone Number:</h3>
            <h4>XXX-XXX-XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.phone}
            <div class="input">
                <input
                    type="text"
                    placeholder="Enter scholarship donor's phone number here"
                    maxlength="20" />
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() =>
                            (areaClicked.phone = !areaClicked.phone)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.email = !areaClicked.email)}
            class="preview">
            <h3>Donor Email Address:</h3>
            <h4>XXXX@arizona.edu</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.email}
            <div class="input">
                <input
                    type="text"
                    placeholder="Enter scholarship donor's email here"
                    maxlength="25" />
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() =>
                            (areaClicked.email = !areaClicked.email)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() =>
                (areaClicked.numAvailable = !areaClicked.numAvailable)}
            class="preview">
            <h3>Number of Scholarships Available:</h3>
            <h4>XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.numAvailable}
            <div class="input">
                <input
                    type="number"
                    placeholder="Enter number of scholarships available here"
                    min="0" />
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() =>
                            (areaClicked.numAvailable =
                                !areaClicked.numAvailable)}>Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.major = !areaClicked.major)}
            class="preview">
            <h3>Required Majors:</h3>
            <h4>XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.major}
            <div class="input">
                <MultiSelect
                    bind:value={majorsSelected}
                    options={majors}
                    placeholder="Pick required majors"
                    closeDropdownOnSelect={false}>
                </MultiSelect>
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() =>
                            (areaClicked.major = !areaClicked.major)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.minor = !areaClicked.minor)}
            class="preview">
            <h3>Required Minors:</h3>
            <h4>XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.minor}
            <div class="input">
                <MultiSelect
                    bind:value={minorsSelected}
                    options={minors}
                    placeholder="Pick required majors"
                    closeDropdownOnSelect={false}>
                </MultiSelect>
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() =>
                            (areaClicked.minor = !areaClicked.minor)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.gpa = !areaClicked.gpa)}
            class="preview">
            <h3>Required GPA:</h3>
            <h4>XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.gpa}
            <div class="input">
                <input
                    type="number"
                    placeholder="Enter minimum required GPA here"
                    min="0" />
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() => (areaClicked.gpa = !areaClicked.gpa)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>

    <div class="info-container">
        <div
            on:click={() => (areaClicked.other = !areaClicked.other)}
            class="preview">
            <h3>Other Scholarship Requirements:</h3>
            <h4>XXXX</h4>
            <img class="down-arrow" src="/down_arrow.png" alt="down arrow" />
        </div>
        {#if areaClicked.other}
            <div class="input">
                <input
                    type="text"
                    placeholder="Enter any other scholarship requirements here" />
                <div>
                    <button>Confirm</button>
                    <button
                        on:click={() =>
                            (areaClicked.other = !areaClicked.other)}
                        >Cancel</button>
                </div>
            </div>
        {/if}
    </div>
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
    .input {
        background-color: white;
        border-radius: 10px;
        padding: 20px;
    }
    .input div {
        display: flex;
        justify-content: space-evenly;
    }
    .input button {
        width: 100px;
        height: 30px;
    }
    input {
        width: 100%;
        margin: 10px 0;
        padding: 10px;
    }
</style>

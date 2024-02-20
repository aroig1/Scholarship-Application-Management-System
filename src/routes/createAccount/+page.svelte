<script>
    let secQuestions = [
        "What high school did you go to?",
        "What was the name of your first pet?",
        "What is your father's middle name?",
        "What was your first car?"
    ];

    let secQuestion1 = "Choose a question";
    let secQuestion2 = "Choose a question";
</script>

<a href="/">Home</a>
<section>
    <h1>Create Account</h1>
    <div>
        <h3>Username</h3>
        <input
            class="username"
            type="text"
            placeholder="netID"
            maxlength="15" />
    </div>
    <div>
        <h3>Password</h3>
        <input
            class="password"
            type="text"
            placeholder="must include number and special character"
            maxlength="20" />
    </div>
    <div>
        <h3>Security Question 1</h3>
        <select bind:value={secQuestion1} class="question_answer">
            {#each secQuestions as question}
                <option value={question}>
                    {question}
                </option>
            {/each}
        </select>
        <input class="question_answer" type="text" placeholder="answer" />
    </div>
    <div>
        <h3>Security Question 2</h3>
        <select bind:value={secQuestion2} class="question_answer">
            {#each secQuestions as question}
                <option value={question}>
                    {question}
                </option>
            {/each}
        </select>
        <input class="question_answer" type="text" placeholder="answer" />
    </div>
    <div>
        <h3>Full Name</h3>
        <input type="text" placeholder="first name" maxlength="15" />
        <input type="text" placeholder="last name" maxlength="15" />
    </div>
    <div>
        <h3>Net ID (if applicable)</h3>
        <input type="text" placeholder="netID" maxlength="15" />
    </div>
    <div>
        <h3>Phone Number</h3>
        <input type="text" placeholder="(999) 999-9999" maxlength="20" />
    </div>
    <div>
        <h3>Email address</h3>
        <input type="emai" placeholder="netID@arizona.edu" maxlength="25" />
    </div>
    <button>Create Account</button>
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
        margin: 0 auto;
        padding: 10px;
        width: 150px;
    }

    .username,
    .password {
        width: 50%;
    }
    .question_answer {
        width: 100%;
        margin: 5px 0;
    }
</style>

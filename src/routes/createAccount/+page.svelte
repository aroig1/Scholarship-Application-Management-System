<script>
    import {
        useForm,
        HintGroup,
        Hint,
        validators,
        email,
        required,
        maxLength
    } from "svelte-use-form";

    export let form;
    const form2 = useForm();

    let secQuestions = [
        "What high school did you go to?",
        "What was the name of your first pet?",
        "What is your father's middle name?",
        "What was your first car?"
    ];

    let secQuestion1 = "Choose a question";
    let secQuestion2 = "Choose a question";
</script>

<form use:form2 method="POST">
    <div class="info-container">
        <h1>Create Account</h1>
        <div class="center">
            <h3>Username</h3>
            <input
                class="username"
                type="text"
                placeholder="netID"
                maxlength="31"
                name="username"
                required
                autocomplete="off"
                use:validators={[required, maxLength(32)]} />
            <Hint for="username" on="required">This is a mandatory field</Hint>
        </div>
        <div class="center">
            <h3>Password</h3>
            <input
                class="password"
                type="password"
                placeholder="must include number and special character"
                maxlength="255"
                name="password"
                use:validators={[required, maxLength(255)]} />
            <Hint for="password" on="required">This is a mandatory field</Hint>
        </div>
        <div class="center">
            <h3>Full Name</h3>
            <input
                type="text"
                placeholder="first name"
                maxlength="15"
                name="firstName"
                use:validators={[required, maxLength(30)]} />
            <Hint for="firstName" on="required">This is a mandatory field</Hint>
            <input
                type="text"
                placeholder="last name"
                maxlength="15"
                name="lastName"
                use:validators={[required, maxLength(30)]} />
            <Hint for="lastName" on="required">This is a mandatory field</Hint>
        </div>
        <div class="center">
            <h3>Phone Number</h3>
            <input
                type="text"
                placeholder="(999) 999-9999"
                maxlength="20"
                name="phoneNumber"
                use:validators={[required, maxLength(30)]} />
            <Hint for="phoneNumber" on="required"
                >This is a mandatory field</Hint>
        </div>
        <div class="center">
            <h3>Email address</h3>
            <input
                type="email"
                placeholder="netID@arizona.edu"
                maxlength="25"
                name="email"
                use:validators={[required, email, maxLength(30)]} />
            <HintGroup for="email">
                <Hint on="required">This is a mandatory field</Hint>
                <Hint on="email" hideWhenRequired>Email is not valid</Hint>
            </HintGroup>
        </div>
        <div class="center">
            <h3>User Type</h3>
            <select
                name="userType"
                use:validators={[required]}
                class="userType">
                <option value="">Select User Type</option>
                <option value="0">Applicant</option>
                <option value="1">Admin</option>
                <option value="2">Donor</option>
            </select>
            <Hint for="userType" on="required">This is a mandatory field</Hint>
        </div>
        <div class="center">
            <h3>Security Question 1</h3>
            <select
                bind:value={secQuestion1}
                class="question_answer"
                use:validators={[required]}>
                {#each secQuestions as question}
                    <option value={question}>
                        {question}
                    </option>
                {/each}
            </select>
            <Hint for="question_answer" on="required"
                >This is a mandatory field</Hint>
            <input
                class="question_answer"
                type="text"
                placeholder="answer"
                name="seqQ1"
                use:validators={[required, maxLength(30)]} />
            <Hint for="seqQ1" on="required">This is a mandatory field</Hint>
        </div>
        <div class="center">
            <h3>Security Question 2</h3>
            <select
                bind:value={secQuestion2}
                class="question_answer"
                use:validators={[required]}>
                {#each secQuestions as question}
                    <option value={question}>
                        {question}
                    </option>
                {/each}
            </select>
            <Hint for="question_answer" on="required"
                >This is a mandatory field</Hint>
            <input
                class="question_answer"
                type="text"
                placeholder="answer"
                name="seqQ2"
                use:validators={[required, maxLength(30)]} />
            <Hint for="seqQ2" on="required">This is a mandatory field</Hint>
        </div>
        <div class="center">
            <button disabled={!$form2.valid}>Create Account</button>
        </div>
        <div class="center">
            {#if form?.error}<pre class="error">{form?.message}</pre>{/if}
        </div>
    </div>
</form>

<style>
    :global(.touched:invalid) {
        border-color: red;
        outline-color: red;
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

    .info-container {
        background-color: lightgray;
        border: 50px;
        padding: 20px;
        margin: 25px auto;
        width: 600px;
        height: 700px;
        flex-direction: column;
        text-align: center;
    }
    .center {
        flex-direction: column;
        text-align: center;
        padding: 2px;
    }
</style>

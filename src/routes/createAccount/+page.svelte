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

<form class="block" use:form2 method="POST">
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
            type="text"
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

    div {
        padding: 0;
        margin: 20px;
    }
    button {
        margin-top: 10px;
        padding: 10px 25px;
        border-radius: 25px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }

    button:hover {
        background-color: rgb(55, 141, 189);
        cursor: pointer;
    }

    .username,
    .password {
        width: 50%;
    }

    .info-container {
        background-color: lightgray;
        border: 50px;
        padding: 20px;
        margin: 25px;
        width: 600px;
        height: 1000px;
        flex-direction: column;
        text-align: center;
    }
    .center {
        flex-direction: column;
        text-align: center;
        padding: 2px;
    }

    body {
    margin: 0;
    padding: 0;
    background-color: #000;
    }

    .block {
        position: relative;
        margin: 50;
        margin: 25px 25%;
        padding: 35px;
        /* width: 500px;
        height: 250px; */
        background-color: white;
        border-radius: 50px;
    }

    .block:before, .block:after {
        content: '';
        position: absolute;
        left: -2px;
        top: -2px;
        background: linear-gradient(45deg, #d8bfd8, #ffb6c1, #9370db, #ff1493, #add8e6, #00008b, #0000cd);
        background-size: 400%;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        z-index: -1;
        animation: steam 20s linear infinite;
        border-radius: 50px;
    }

    @keyframes steam {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 400% 0;
    }
    100% {
        background-position: 0 0;
    }
    }

    .block:after {
    filter: blur(50px);
    }
</style>

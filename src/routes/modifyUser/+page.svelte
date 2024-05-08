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

    /** @type {import('./$types').PageData} */
    export let data;
    const user = data.user;
</script>

<section>
    <h1>Modify Profile</h1>
    <form use:form2 method="POST" class="container">
        <div class="center">
            <h3>Full Name</h3>
            <input
                type="text"
                value={user.firstName}
                placeholder="first name"
                maxlength="15"
                name="firstName"
                use:validators={[required, maxLength(30)]} />
            <Hint for="firstName" on="required">This is a mandatory field</Hint>
            <input
                type="text"
                value={user.lastName}
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
                value={user.phone}
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
                value={user.email}
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
            <button disabled={!$form2.valid}>Save</button>
        </div>
        <div class="center">
            {#if form?.error}<pre class="error">{form?.message}</pre>{/if}
        </div>
    </form>
</section>

<style>
    :global(.touched:invalid) {
        border-color: red;
        outline-color: red;
    }
    h1 {
        width: 100%;
        text-align: center;
        font-size: 40px;
        margin-top: 30px;
    }
    h3 {
        padding: 0;
        margin: 0;
    }
    div {
        padding: 0;
        margin: 20px;
    }

    .container {
        border: 1px solid #ccc;
        padding: 35px;
        margin: 25px 25%;
        background-color: white;
        border-radius: 50px;
    }

    .center {
        flex-direction: column;
        text-align: center;
        padding: 2px;
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
</style>

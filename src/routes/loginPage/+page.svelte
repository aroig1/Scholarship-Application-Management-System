<script>
    import {
        useForm,
        validators,
        HintGroup,
        Hint,
        email,
        required,
        maxLength
    } from "svelte-use-form";

    const form = useForm();
</script>

<a href="/">Home</a>

<form use:form>
    <div class="info-container">
        <h1>Login</h1>

        <div class="center">
            <input
                type="email"
                name="email"
                maxLength="30"
                use:validators={[required, email, maxLength(30)]} />
            <HintGroup for="email">
                <Hint on="required">This is a mandatory field</Hint>
                <Hint on="maxLength">Must be less than 30 chars</Hint>
                <Hint on="email" hideWhenRequired>Email is not valid</Hint>
            </HintGroup>
        </div>

        <div class="center">
            <input
                type="password"
                name="password"
                maxLength="30"
                use:validators={[required, maxLength(30)]} />
            <Hint for="password" on="required">This is a mandatory field</Hint>
        </div>

        <div class="center">
            <button disabled={!$form.valid}>Login</button>
        </div>

        <div class="center">
            <a href="/createAccount"><button>Create Account</button></a>
        </div>
    </div>
</form>

<style>
    :global(.touched:invalid) {
        border-color: red;
        outline-color: red;
    }

    * {
        padding: 0px;
        margin: 0px;
    }

    .info-container {
        background-color: lightgray;
        border: 50px;
        padding: 20px;
        margin: 25px;
        width: 400px;
        height: 200px;
        flex-direction: column;
        text-align: center;
    }

    .center {
        flex-direction: column;
        text-align: center;
        padding: 2px;
    }
</style>

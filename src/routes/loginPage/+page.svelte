<script>
    import {
        validators,
        required,
        maxLength,
        useForm,
        Hint
    } from "svelte-use-form";

    export let form;
    const form2 = useForm();
</script>

<form use:form2 method="post" action="?/login">
    <div class="info-container">
        <h1>Login</h1>

        <div class="center">
            <input
                class="username"
                type="text"
                maxLength="31"
                name="username"
                required
                autocomplete="off"
                use:validators={[required, maxLength(31)]} />
            <Hint for="username" on="required">This is a mandatory field</Hint>
        </div>

        <div class="center">
            <input
                type="password"
                name="password"
                maxLength="255"
                use:validators={[required, maxLength(255)]} />
            <Hint for="password" on="required">This is a mandatory field</Hint>
        </div>

        <div class="center">
            <button disabled={!$form2.valid}>Login</button>
        </div>

        <div class="center">
            <a href="/createAccount"><button>Create Account</button></a>
        </div>
        {#if form?.error}
            <div class="center">
                <pre class="error">{form?.message}</pre>
            </div>
        {/if}
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
        margin: 10% auto;
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

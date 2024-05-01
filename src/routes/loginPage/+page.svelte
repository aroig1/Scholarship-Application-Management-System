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

<body>
<form class="login" use:form2 method="post" action="?/login">
    <!-- <div class="info-container"> -->
        <h1>Login</h1>

        <!-- <div class="center"> -->
            <input
                class="username"
                type="text"
                placeholder="Username"
                maxLength="31"
                name="username"
                required
                autocomplete="off"
                use:validators={[required, maxLength(31)]} />
            <Hint for="username" on="required">This is a mandatory field</Hint>
        <!-- </div> -->

        <!-- <div class="center"> -->
            <input
                type="password"
                placeholder="password"
                name="password"
                maxLength="255"
                use:validators={[required, maxLength(255)]} />
            <Hint for="password" on="required">This is a mandatory field</Hint>
        <!-- </div> -->

        <!-- <div class="center"> -->
            <button disabled={!$form2.valid}>Login</button>
        <!-- </div> -->

        <!-- <div class="center"> -->
            <a href="/createAccount"><button>Sign Up</button></a>
        <!-- </div> -->
        {#if form?.error}
            <!-- <div class="center"> -->
                <pre class="error">{form?.message}</pre>
            <!-- </div> -->
        {/if}
    <!-- </div> -->
</form>
</body>

<style>
    :global(.touched:invalid) {
        border-color: red;
        outline-color: red;
    }

    .login {
        overflow: hidden;
        background-color: white;
        padding: 60px 30px 50px 30px;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 500px;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        -webkit-transition: -webkit-transform 300ms, box-shadow 300ms;
        -moz-transition: -moz-transform 300ms, box-shadow 300ms;
        transition: transform 300ms, box-shadow 300ms;
        box-shadow: 5px 10px 10px rgba(2, 128, 144, 0.2);
    }
    .login::before, .login::after {
        content: "";
        position: absolute;
        width: 600px;
        height: 600px;
        border-top-left-radius: 40%;
        border-top-right-radius: 45%;
        border-bottom-left-radius: 35%;
        border-bottom-right-radius: 40%;
        z-index: -1;
    }
    .login::before {
        left: 40%;
        bottom: -130%;
        background-color: rgba(69, 105, 144, 0.15);
        -webkit-animation: wawes 6s infinite linear;
        -moz-animation: wawes 6s infinite linear;
        animation: wawes 6s infinite linear;
    }
    .login::after {
        left: 35%;
        bottom: -125%;
        background-color: rgba(2, 128, 144, 0.2);
        -webkit-animation: wawes 7s infinite;
        -moz-animation: wawes 7s infinite;
        animation: wawes 7s infinite;
    }
    .login > input {
        font-family: "Asap", sans-serif;
        display: block;
        border-radius: 5px;
        font-size: 16px;
        background: white;
        width: 100%;
        border: 0;
        padding: 10px 10px;
        margin: 15px -10px;
    }
    .login > button, a button {
        font-family: "Asap", sans-serif;
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        text-transform: uppercase;
        width: 80px;
        border: 0;
        padding: 10px 0;
        margin-right: 25px;
        margin-top: 10px;
        margin-left: -5px;
        border-radius: 5px;
        background-color: #f45b69;
        -webkit-transition: background-color 300ms;
        -moz-transition: background-color 300ms;
        transition: background-color 300ms;
    }
    .login > button:hover, a button {
        background-color: #f24353;
    }

    @-webkit-keyframes wawes {
        from {
            -webkit-transform: rotate(0);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
        }
        @-moz-keyframes wawes {
        from {
            -moz-transform: rotate(0);
        }
        to {
            -moz-transform: rotate(360deg);
        }
        }
        @keyframes wawes {
        from {
            -webkit-transform: rotate(0);
            -moz-transform: rotate(0);
            -ms-transform: rotate(0);
            -o-transform: rotate(0);
            transform: rotate(0);
        }
        to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>

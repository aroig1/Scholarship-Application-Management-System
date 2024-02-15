<a href="/">Home</a>
<section>
    <h1>Create Account</h1>
    <div>
        <h3>Username</h3>
        <input class="username" type="text" placeholder="netID" />
    </div>
    <div>
        <h3>Password</h3>
        <input
            class="password"
            type="text"
            placeholder="must include number and special character" />
    </div>
    <div>
        <h3>Security Question 1</h3>
        <input class="question_answer" type="text" placeholder="question" />
        <input class="question_answer" type="text" placeholder="answer" />
    </div>
    <div>
        <h3>Security Question 2</h3>
        <input class="question_answer" type="text" placeholder="question" />
        <input class="question_answer" type="text" placeholder="answer" />
    </div>
    <div>
        <h3>Full Name</h3>
        <input type="text" placeholder="first name" />
        <input type="text" placeholder="last name" />
    </div>
    <div>
        <h3>Net ID (if applicable)</h3>
        <input type="text" placeholder="netID" />
    </div>
    <div>
        <h3>Phone Number</h3>
        <input type="text" placeholder="(999) 999-9999" />
    </div>
    <div>
        <h3>Email address</h3>
        <input type="emai" placeholder="netID@arizona.edu" />
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

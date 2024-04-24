<script>
    export let data;

    /**
     * @type {string}
     */
    let userType;
    if (data.user.type == 0) {
        userType = "Applicant";
    } else if (data.user.type == 1) {
        userType = "Administrator";
    } else {
        userType = "Donor";
    }
</script>

<h1>Welcome to UASAMS {data.user.firstName} {data.user.lastName}</h1>
<h3>({userType})</h3>

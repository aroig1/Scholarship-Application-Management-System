import type {D1Database} from "@cloudflare/workers-types";
import type {
    User,
    Scholarship,
    Application,
    ApplicantInfo,
    UserID,
    Password,
    ApplicationID,
    ScholarshipID
} from "$lib/types";

// INTEGER, FLOAT, VARCHAR, TEXT, DATE

async function checkUserTableExists(db: D1Database) {
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY, 
        username VARCHAR, 
        hash VARCHAR, 
        salt VARCHAR, 
        firstName VARCHAR, 
        lastName VARCHAR, 
        netID VARCHAR, 
        phone VARCHAR, 
        email VARCHAR, 
        type VARCHAR 
    );`);
}

async function checkApplicantInfoTableExists(db: D1Database) {
    await db.exec(`CREATE TABLE IF NOT EXISTS applicationInfo (
        user VARCHAR PRIMARY KEY, 
        majors VARCHAR, 
        minors VARCHAR, 
        GPA FLOAT, 
        year VARCHAR, 
        ethnicity VARCHAR, 
        prefferedPronouns VARCHAR, 
        workExperience TEXT
    );`);
}

async function checkScholarshipTableExists(db: D1Database) {
    await db.exec(`CREATE TABLE IF NOT EXISTS scholarships (
        id VARCHAR PRIMARY KEY, 
        name VARCHAR, 
        amount INTEGER, 
        donorID VARCHAR, 
        numAvailable INTEGER, 
        requiredMajors VARCHAR, 
        requiredMinors VARCHAR, 
        requiredGPA FLOAT, 
        deadline DATE, 
        other TEXT
    );`);
}

async function checkApplicationTableExists(db: D1Database) {
    await db.exec(`CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR PRIMARY KEY,
        applicant VARCHAR, 
        scholarship VARCHAR, 
        statement TEXT
    );`);
}

export async function saveUser(db: D1Database, user: User) {
    await checkUserTableExists(db);
    // password, id, and type have special types
    db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(
            user.id,
            user.username,
            user.password.hash,
            user.password.salt,
            user.firstName,
            user.lastName,
            user.netID,
            user.phone,
            user.email,
            user.type
        )
        .run();
}

export async function loadUser(
    db: D1Database,
    username: string
): Promise<User> {
    await checkUserTableExists(db);
    const result = await db
        .prepare("SELECT * FROM users WHERE username = ?")
        .bind(username)
        .all();

    const user: User = result.results as unknown as User;

    if ("hash" in result.results && "salt" in result.results) {
        user.password = {
            hash: result.results.hash as string,
            salt: result.results.salt as string
        };
    }

    return user;
}

export async function updateUser(db: D1Database, user: User) {
    await checkUserTableExists(db);
    db.prepare(
        "UPDATE users SET id = ?, username = ?, hash = ?, salt = ?, firstName = ?, lastName = ?, netID = ?, phone = ?, email = ?, type = ? WHERE id = ?"
    )
        .bind(
            user.id,
            user.username,
            user.password.hash,
            user.password.salt,
            user.firstName,
            user.lastName,
            user.netID,
            user.phone,
            user.email,
            user.type,
            user.id
        )
        .run();
}

export async function saveApplicantInfo(
    db: D1Database,
    applicant: ApplicantInfo
) {
    await checkApplicantInfoTableExists(db);
    db.prepare("INSERT INTO applicantInfo VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(
            applicant.user,
            applicant.majors,
            applicant.minors,
            applicant.GPA,
            applicant.year,
            applicant.ethnicity,
            applicant.preferredPronouns,
            applicant.workExperience
        )
        .run();
}

export async function loadApplicantInfo(db: D1Database, user: UserID) {
    await checkApplicantInfoTableExists(db);
    const result = await db
        .prepare("SELECT * FROM applicantInfo WHERE user = ?")
        .bind(user)
        .all();

    const applicantInfo: ApplicantInfo =
        result.results as unknown as ApplicantInfo;

    return applicantInfo;
}

export async function updateApplicantInfo(
    db: D1Database,
    applicant: ApplicantInfo
) {
    await checkApplicantInfoTableExists(db);
    db.prepare(
        "UPDATE applicantInfo SET user = ?, majors = ?, minors = ?, GPA = ?, year = ?, ethnicity = ?, prefferedPronouns = ?, workExperience = ? WHERE user = ?"
    )
        .bind(
            applicant.user,
            applicant.majors,
            applicant.minors,
            applicant.GPA,
            applicant.year,
            applicant.ethnicity,
            applicant.preferredPronouns,
            applicant.workExperience,
            applicant.user
        )
        .run();
}

export async function saveScholarship(
    db: D1Database,
    scholarship: Scholarship
) {
    await checkScholarshipTableExists(db);
    // id, donorID, major, minor, date have special types
    db.prepare("INSERT INTO sholarships VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(
            scholarship.id,
            scholarship.name,
            scholarship.amount,
            scholarship.donorID,
            scholarship.numAvailable,
            scholarship.requiredMajors,
            scholarship.requiredMinors,
            scholarship.requiredGPA,
            scholarship.deadline,
            scholarship.other
        )
        .run();
}

export async function loadScholarship(db: D1Database, name: string) {
    await checkScholarshipTableExists(db);
    const result = await db
        .prepare('SELECT * FROM scholarships WHERE name LIKE "?%"')
        .bind(name)
        .all();

    const scholarship: Scholarship = result.results as unknown as Scholarship;

    return scholarship;
}

export async function updateScholarship(
    db: D1Database,
    scholarship: Scholarship
) {
    await checkScholarshipTableExists(db);
    db.prepare(
        "UPDATE scholarships SET id = ?, name = ?, amount = ?, donorID = ?, numAvailable = ?, requiredMajors = ?, requiredMinors = ?, requiredGPA = ?, deadline = ?, other = ? WHERE id = ?"
    )
        .bind(
            scholarship.id,
            scholarship.name,
            scholarship.amount,
            scholarship.donorID,
            scholarship.numAvailable,
            scholarship.requiredMajors,
            scholarship.requiredMinors,
            scholarship.requiredGPA,
            scholarship.deadline,
            scholarship.other,
            scholarship.id
        )
        .run();
}

export async function saveApplication(
    db: D1Database,
    application: Application
) {
    await checkApplicationTableExists(db);
    db.prepare("INSERT INTO applications VALUES (?, ?, ?, ?)")
        .bind(
            application.id,
            application.applicant,
            application.scholarship,
            application.statement
        )
        .run();
}

export async function loadApplication(
    db: D1Database,
    applicant: UserID,
    scholarship: ScholarshipID
) {
    await checkApplicationTableExists(db);
    const result = await db
        .prepare(
            "SELECT * FROM applications WHERE applicant = ? AND scholarship = ?"
        )
        .bind(applicant, scholarship)
        .all();

    const application: Application = result.results as unknown as Application;

    return application;
}

export async function updateApplication(
    db: D1Database,
    application: Application
) {
    await checkApplicationTableExists(db);
    db.prepare(
        "UPDATE applications SET id = ?, applicant = ?, scholarship = ?, statement = ? WHERE id = ?"
    ).bind(
        application.id,
        application.applicant,
        application.scholarship,
        application.statement,
        application.id
    );
}

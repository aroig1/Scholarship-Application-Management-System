import type {D1Database} from "@cloudflare/workers-types";
import type {
    User,
    Scholarship,
    Application,
    ApplicantInfo,
    UserID,
    ScholarshipID
} from "$lib/types";

// INTEGER, FLOAT, VARCHAR, TEXT, DATE
export async function dropSession(db: D1Database) {
    await db.prepare(`DROP TABLE IF EXISTS session;`).run();
}

export async function checkSessionTableExists(db: D1Database) {
    await db
        .prepare(
            `CREATE TABLE IF NOT EXISTS session (
        id VARCHAR(255) PRIMARY KEY,
        user_Id VARCHAR(255),
        expires_at VARCHAR(255),
        fresh BOOLEAN
    );`
        )
        .run();
}

export async function dropUsers(db: D1Database) {
    await db.prepare(`DROP TABLE IF EXISTS users;`).run();
}

export async function checkUserTableExists(db: D1Database) {
    await db
        .prepare(
            `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255),
        hash VARCHAR(255),
        salt VARCHAR(255),
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        phone VARCHAR(255),
        email VARCHAR(255),
        type VARCHAR(255)
    );`
        )
        .run();
}

async function checkApplicantInfoTableExists(db: D1Database) {
    await db
        .prepare(
            `CREATE TABLE IF NOT EXISTS applicationInfo (
        user VARCHAR PRIMARY KEY, 
        majors VARCHAR, 
        minors VARCHAR, 
        GPA FLOAT, 
        year VARCHAR, 
        ethnicity VARCHAR, 
        prefferedPronouns VARCHAR, 
        workExperience TEXT,
        netID VARCHAR(255)
    );`
        )
        .run();
}

async function checkScholarshipTableExists(db: D1Database) {
    await db
        .prepare(
            `CREATE TABLE IF NOT EXISTS scholarships (
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
    );`
        )
        .run();
}

async function checkApplicationTableExists(db: D1Database) {
    await db
        .prepare(
            `CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR PRIMARY KEY,
        applicant VARCHAR, 
        scholarship VARCHAR, 
        statement TEXT
    );`
        )
        .run();
}

export async function saveUser(db: D1Database, user: User) {
    await checkUserTableExists(db);
    // password, id, and type have special types
    db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(
            user.id,
            user.username,
            user.password.hash,
            user.password.salt,
            user.firstName,
            user.lastName,
            user.phone,
            user.email,
            user.type
        )
        .run();
}

export async function loadUser(
    db: D1Database,
    username: string
): Promise<User | null> {
    await checkUserTableExists(db);
    const result = await db
        .prepare("SELECT * FROM users WHERE username = ?")
        .bind(username)
        .all();

    // const user: User = result.results as unknown as User;
    if (result.results.length > 0) {
        const user: User = result.results[0] as unknown as User;

        if ("hash" in result.results[0] && "salt" in result.results[0]) {
            user.password = {
                hash: result.results[0].hash as string,
                salt: result.results[0].salt as string
            };
        }
        return user;
    }
    return null;
}

export async function updateUser(db: D1Database, user: User) {
    await checkUserTableExists(db);
    db.prepare(
        "UPDATE users SET id = ?, username = ?, hash = ?, salt = ?, firstName = ?, lastName = ?, phone = ?, email = ?, type = ? WHERE id = ?"
    )
        .bind(
            user.id,
            user.username,
            user.password.hash,
            user.password.salt,
            user.firstName,
            user.lastName,
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
    db.prepare("INSERT INTO applicantInfo VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(
            applicant.user,
            applicant.majors,
            applicant.minors,
            applicant.GPA,
            applicant.year,
            applicant.ethnicity,
            applicant.preferredPronouns,
            applicant.workExperience,
            applicant.netID
        )
        .run();
}

export async function loadApplicantInfo(
    db: D1Database,
    user: UserID
): Promise<ApplicantInfo> {
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
        "UPDATE applicantInfo SET user = ?, majors = ?, minors = ?, GPA = ?, year = ?, ethnicity = ?, prefferedPronouns = ?, workExperience = ?, netID = ? WHERE user = ?"
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
            applicant.netID
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

export async function loadScholarship(
    db: D1Database,
    name: string
): Promise<Scholarship> {
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
): Promise<Application> {
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

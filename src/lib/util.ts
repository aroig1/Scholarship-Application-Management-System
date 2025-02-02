import type {D1Database} from "@cloudflare/workers-types";
import type {
    User,
    Scholarship,
    Application,
    ApplicantInfo,
    FullApplication,
    UserID,
    ScholarshipID,
    Major,
    Minor
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

export async function checkApplicantInfoTableExists(db: D1Database) {
    await db
        .prepare(
            `CREATE TABLE IF NOT EXISTS applicantInfo (
        user VARCHAR PRIMARY KEY,
        majors VARCHAR,
        minors VARCHAR,
        GPA FLOAT,
        year VARCHAR,
        ethnicity VARCHAR,
        preferredPronouns VARCHAR,
        workExperience TEXT,
        netID VARCHAR(255),
        studentID VARCHAR(255)
    );`
        )
        .run();
}

export async function checkScholarshipTableExists(db: D1Database) {
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
        deadline VARCHAR,
        other TEXT,
        description TEXT,
        archived BOOLEAN
    );`
        )
        .run();
}

export async function checkApplicationTableExists(db: D1Database) {
    await db
        .prepare(
            `CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR PRIMARY KEY,
        applicant VARCHAR,
        scholarship VARCHAR,
        statement TEXT,
        status VARCHAR
    );`
        )
        .run();
}

export async function saveUser(db: D1Database, user: User) {
    await checkUserTableExists(db);
    // password, id, and type have special types
    db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);")
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

export async function loadUser_by_id(
    db: D1Database,
    id: string
): Promise<User | null> {
    await checkUserTableExists(db);
    const result = await db
        .prepare("SELECT * FROM users WHERE id = ? LIMIT 1;")
        .bind(id)
        .all();

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

export async function loadUser_by_username(
    db: D1Database,
    username: string
): Promise<User | null> {
    await checkUserTableExists(db);
    const result = await db
        .prepare("SELECT * FROM users WHERE username = ? LIMIT 1;")
        .bind(username)
        .all();

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
        "UPDATE users SET firstName = ?, lastName = ?, phone = ?, email = ? WHERE id = ?;"
    )
        .bind(user.firstName, user.lastName, user.phone, user.email, user.id)
        .run();
}

export async function adminUpdateUser(db: D1Database, user: User) {
    await checkUserTableExists(db);
    db.prepare(
        "UPDATE users SET firstName = ?, lastName = ?, phone = ?, email = ?, type = ? WHERE id = ?;"
    )
        .bind(
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
    db.prepare(
        "INSERT INTO applicantInfo VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    )
        .bind(
            applicant.user,
            JSON.stringify(applicant.majors),
            JSON.stringify(applicant.minors),
            applicant.GPA,
            applicant.year,
            applicant.ethnicity,
            applicant.preferredPronouns,
            JSON.stringify(applicant.workExperience),
            applicant.netID,
            applicant.studentID
        )
        .run();
}

export async function loadApplicantInfo(
    db: D1Database,
    user: UserID
): Promise<ApplicantInfo | null> {
    await checkApplicantInfoTableExists(db);
    const result = await db
        .prepare("SELECT * FROM applicantInfo WHERE user = ? LIMIT 1;")
        .bind(user)
        .all();

    if (result.results.length > 0) {
        const applicantInfo: ApplicantInfo = result
            .results[0] as unknown as ApplicantInfo;

        if ("majors" in result.results[0]) {
            applicantInfo.majors = JSON.parse(
                result.results[0].majors as string
            ).map((s: string) => s as Major);
        }
        if ("minors" in result.results[0]) {
            applicantInfo.minors = JSON.parse(
                result.results[0].minors as string
            ).map((s: string) => s as Minor);
        }

        if ("workExperience" in result.results[0]) {
            applicantInfo.workExperience = JSON.parse(
                result.results[0].workExperience as string
            ).map((s: string) => s as string);
        }

        return applicantInfo;
    }
    return null;
}

export async function updateApplicantInfo(
    db: D1Database,
    applicant: ApplicantInfo
) {
    await checkApplicantInfoTableExists(db);
    db.prepare(
        "UPDATE applicantInfo SET user = ?, majors = ?, minors = ?, GPA = ?, year = ?, ethnicity = ?, preferredPronouns = ?, workExperience = ?, netID = ?, studentID = ? WHERE user = ?;"
    )
        .bind(
            applicant.user,
            JSON.stringify(applicant.majors),
            JSON.stringify(applicant.minors),
            applicant.GPA,
            applicant.year,
            applicant.ethnicity,
            applicant.preferredPronouns,
            JSON.stringify(applicant.workExperience),
            applicant.netID,
            applicant.studentID,
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
    db.prepare(
        "INSERT INTO scholarships VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    )
        .bind(
            scholarship.id,
            scholarship.name,
            scholarship.amount,
            scholarship.donorID,
            scholarship.numAvailable,
            JSON.stringify(scholarship.requiredMajors),
            JSON.stringify(scholarship.requiredMinors),
            scholarship.requiredGPA,
            scholarship.deadline.toISOString().slice(0, 10),
            scholarship.other,
            scholarship.description,
            scholarship.archived
        )
        .run();
}

export async function loadScholarship(
    db: D1Database,
    id: ScholarshipID
): Promise<Scholarship | null> {
    await checkScholarshipTableExists(db);
    const result = await db
        .prepare("SELECT * FROM scholarships WHERE id == ? LIMIT 1;")
        .bind(id)
        .all();

    if (result.results.length > 0) {
        const scholarship: Scholarship = result
            .results[0] as unknown as Scholarship;

        if ("requiredMajors" in result.results[0]) {
            scholarship.requiredMajors = JSON.parse(
                result.results[0].requiredMajors as string
            ).map((s: string) => s as Major);
        }

        if ("requiredMinors" in result.results[0]) {
            scholarship.requiredMinors = JSON.parse(
                result.results[0].requiredMinors as string
            ).map((s: string) => s as Major);
        }

        if ("deadline" in result.results[0]) {
            scholarship.deadline = new Date(
                result.results[0].deadline as string
            );
        }

        return scholarship;
    }
    return null;
}

export async function loadScholarships(
    db: D1Database,
    donor: UserID | undefined = undefined
): Promise<Scholarship[]> {
    await checkScholarshipTableExists(db);
    let result;
    if (donor) {
        result = await db
            .prepare("SELECT * FROM scholarships WHERE donorID = ?;")
            .bind(donor)
            .all();
    } else {
        result = await db.prepare("SELECT * FROM scholarships;").all();
    }

    let output = [];

    for (const s of result.results) {
        const scholarship: Scholarship = s as unknown as Scholarship;

        if ("requiredMajors" in s) {
            scholarship.requiredMajors = JSON.parse(
                s.requiredMajors as string
            ).map((m: string) => m as Major);
        }

        if ("requiredMinors" in s) {
            scholarship.requiredMinors = JSON.parse(
                s.requiredMinors as string
            ).map((m: string) => m as Major);
        }

        if ("deadline" in s) {
            scholarship.deadline = new Date(s.deadline as string);
        }
        output.push(scholarship);
    }

    return output;
}

export async function updateScholarship(
    db: D1Database,
    scholarship: Scholarship
) {
    await checkScholarshipTableExists(db);
    db.prepare(
        "UPDATE scholarships SET id = ?, name = ?, amount = ?, donorID = ?, numAvailable = ?, requiredMajors = ?, requiredMinors = ?, requiredGPA = ?, deadline = ?, other = ?, description = ?, archived = ? WHERE id = ?;"
    )
        .bind(
            scholarship.id,
            scholarship.name,
            scholarship.amount,
            scholarship.donorID,
            scholarship.numAvailable,
            JSON.stringify(scholarship.requiredMajors),
            JSON.stringify(scholarship.requiredMinors),
            scholarship.requiredGPA,
            scholarship.deadline.toISOString().slice(0, 10),
            scholarship.other,
            scholarship.description,
            scholarship.archived,
            scholarship.id
        )
        .run();
}

export async function saveApplication(
    db: D1Database,
    application: Application
) {
    await checkApplicationTableExists(db);
    db.prepare("INSERT INTO applications VALUES (?, ?, ?, ?, ?);")
        .bind(
            application.id,
            application.applicant,
            application.scholarship,
            application.statement,
            application.status
        )
        .run();
}

export async function loadApplication(
    db: D1Database,
    applicant: UserID,
    scholarship: ScholarshipID
): Promise<Application | null> {
    await checkApplicationTableExists(db);
    const result = await db
        .prepare(
            "SELECT * FROM applications WHERE applicant = ? AND scholarship = ?;"
        )
        .bind(applicant, scholarship)
        .all();

    if (result.results.length > 0) {
        const application: Application = result
            .results[0] as unknown as Application;

        return application;
    }
    return null;
}

export async function loadApplications(
    db: D1Database,
    scholarship: ScholarshipID
): Promise<FullApplication[]> {
    await checkApplicationTableExists(db);
    await checkUserTableExists(db);
    await checkApplicantInfoTableExists(db);

    const result = await db
        .prepare(
            `
        SELECT applications.*,
        users.firstName,
        users.lastName,
        applicantInfo.*
        FROM applications
        JOIN applicantInfo ON applications.applicant = applicantInfo.user
        JOIN users ON applications.applicant = users.id
        WHERE applications.scholarship = ?;
    `
        )
        .bind(scholarship)
        .all();

    const output: FullApplication[] = [];

    for (const a of result.results) {
        const application: FullApplication = a as unknown as FullApplication;
        console.log;
        if ("majors" in a) {
            application.majors = JSON.parse(a.majors as string).map(
                (s: string) => s as Major
            );
        }
        if ("minors" in a) {
            application.minors = JSON.parse(a.minors as string).map(
                (s: string) => s as Minor
            );
        }

        if ("workExperience" in result.results[0]) {
            application.workExperience = JSON.parse(
                a.workExperience as string
            ).map((s: string) => s as string);
        }
        output.push(application);
    }
    return output;
}

export async function updateApplication(
    db: D1Database,
    application: Application
) {
    await checkApplicationTableExists(db);
    db.prepare(
        "UPDATE applications SET id = ?, applicant = ?, scholarship = ?, statement = ?, status = ? WHERE id = ?;"
    )
        .bind(
            application.id,
            application.applicant,
            application.scholarship,
            application.statement,
            application.status,
            application.id
        )
        .run();
}

export function dateToString(d: Date): string {
    return (
        d.getUTCMonth() + 1 + "/" + d.getUTCDate() + "/" + d.getUTCFullYear()
    );
}

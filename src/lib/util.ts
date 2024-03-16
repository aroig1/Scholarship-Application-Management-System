import type { D1Database } from "@cloudflare/workers-types";
import type { User, Scholarship, Application, ApplicantInfo, UserID } from "$lib/types";

export function saveUser(db: D1Database, user: User) {
    // password, id, and type have special types
    db.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .bind(user.id, user.username, user.password.hash, user.password.salt, user.firstName, 
            user.lastName, user.netID, user.phone, user.email, user.type)
        .run()
}
  
export async function loadUser(db: D1Database, username: string) {
    const result = await db.prepare('SELECT * FROM users WHERE id = ?').bind(username).all();

    return new Response(JSON.stringify(result.results));
}

export function updateUser(db: D1Database, user: User) {
    db.prepare('UPDATE users SET id = ?, username = ?, hash = ?, salt = ?, firstName = ?, lastName = ?, netID = ?, phone = ?, email = ?, type = ? WHERE id = ?')
        .bind(user.id, user.username, user.password.hash, user.password.salt, user.firstName, 
            user.lastName, user.netID, user.phone, user.email, user.type, user.id)
        .run()
}

export function saveApplicantInfo(db: D1Database, applicant: ApplicantInfo) {
    db.prepare('INSERT INTO applicantInfo VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .bind(applicant.user, applicant.majors, applicant.minors, applicant.GPA,  applicant.year, 
            applicant.ethnicity, applicant.preferredPronouns, applicant.workExperience)
        .run()
}

export async function loadApplicantInfo(db: D1Database, id: UserID) {
    const result = await db.prepare('SELECT * FROM applicantInfo WHERE id = ?').bind(id).all();

    return new Response(JSON.stringify(result.results));
}

export function updateApplicationInfo(db: D1Database, applicant: ApplicantInfo) {
    db.prepare('UPDATE applicantInfo SET user = ?, majors = ?, minors = ?, GPA = ?, year = ?, ethnicity = ?, prefferedPronouns = ?, workExperience = ? WHERE user = ?')
        .bind(applicant.user, applicant.majors, applicant.minors, applicant.GPA,  applicant.year, 
            applicant.ethnicity, applicant.preferredPronouns, applicant.workExperience, applicant.user)
        .run()
}

export function saveScholarship(db: D1Database, scholarship: Scholarship) {
    // id, donorID, major, minor, date have special types
    db.prepare('INSERT INTO sholarships VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .bind(scholarship.id, scholarship.name, scholarship.amount, scholarship.donorID, scholarship.numAvailable,
             scholarship.requiredMajors, scholarship.requiredMinors, scholarship.requiredGPA, scholarship.deadline, scholarship.other)
        .run()
}

export async function loadScholarship(db: D1Database, name: string) {
    const result = await db.prepare('SELECT * FROM scholarships WHERE name LIKE "?%"').bind(name).all();

    return new Response(JSON.stringify(result.results));
}

export function updateScholarship(db: D1Database, scholarship: Scholarship) {
    db.prepare('UPDATE scholarships SET id = ?, name = ?, amount = ?, donorID = ?, numAvailable = ?, requiredMajors = ?, requiredMinors = ?, requiredGPA = ?, deadline = ?, other = ? WHERE id = ?')
        .bind(scholarship.id, scholarship.name, scholarship.amount, scholarship.donorID, scholarship.numAvailable,
            scholarship.requiredMajors, scholarship.requiredMinors, scholarship.requiredGPA, scholarship.deadline, scholarship.other, scholarship.id)
        .run()
}

export function saveApplication(db: D1Database, application: Application) {
    db.prepare('INSERT INTO applications VALUES (?, ?, ?)')
        .bind(application.applicant, application.scholarship, application.statement)
        .run()
}

export async function loadApplication(db: D1Database) {
    const result = await db.prepare('SELECT * FROM applications').all();

    return new Response(JSON.stringify(result.results));
}

// WILL UPDATE ALL APPLICATIONS UNDER APPLICANT, should probably add another identifier for each application
export function updateApplication(db: D1Database, application: Application) {
    db.prepare('UPDATE applications SET applicant = ?, scholarship = ?, statement = ? WHERE applicant = ?')
        .bind(application.applicant, application.scholarship, application.statement)
}
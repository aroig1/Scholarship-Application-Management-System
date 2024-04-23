import type {D1Database} from "@cloudflare/workers-types";
import {error} from "@sveltejs/kit";
import * as XLSX from "xlsx";

async function getAwarded(db: D1Database) {
    const errors = [];
    try {
        //SELECT users.firstName, users.lastName, applications.* FROM users JOIN applicantInfo ON users.id = applicantInfo.user;
        const stmt = db.prepare(
            // `SELECT users.firstName, users.lastName, users.email, applicantInfo.netID, applicantInfo.majors, applicantInfo.GPA, applicantInfo.ethnicity
            //                     FROM users JOIN applicantInfo ON users.id = applicantInfo.user;`
            `SELECT users.firstName, users.lastName, users.email, applicantInfo.majors, applicantInfo.GPA, applicantInfo.ethnicity, applicantInfo.netID, scholarships.amount, scholarships.name
            FROM applications
            JOIN applicantInfo ON applications.applicant = applicantInfo.user
            JOIN users ON applications.applicant = users.id
            JOIN scholarships ON applications.scholarship = scholarships.id
            WHERE applications.status = 'awarded';`
        );
        const {results} = await stmt.all();
        const rows = results.map((student) => ({
            ScholarshipName: student.name,
            Amount: student.amount,
            name: student.firstName + " " + student.lastName,
            email: student.email,
            NetID: student.netID,
            Major: student.majors,
            CumulativeGPA: student.GPA,
            Ethnicity: student.ethnicity
        }));
        const awarded = XLSX.utils.json_to_sheet(rows, {dense: true});
        const awardedWB = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(awardedWB, awarded, "Awarded Report");
        const data = XLSX.writeXLSX(awardedWB, {
            type: "base64",
            compression: true
        });
        return data;
    } catch (error: any) {
        errors.push(error.message);
    }
    if (errors.length > 0) {
        throw new Error(errors.join("\n"));
    }
}
export async function GET(event) {
    if (!event.platform?.env.DB) {
        let message = "DB IS NULL";
        return error(422, {
            message
        });
    }
    return new Response(await getAwarded(event.platform?.env.DB));
}

import type {D1Database} from "@cloudflare/workers-types";
import {error} from "@sveltejs/kit";
import * as XLSX from "xlsx";

async function getScholarshipApplicants(db: D1Database, id: string) {
    const errors = [];
    try {
        const stmt = db
            .prepare(
                `SELECT users.firstName, users.lastName, applicantInfo.*, applications.*
            FROM users JOIN applicantInfo ON users.id = applicantInfo.user
            JOIN applications ON users.id = applications.applicant
            WHERE applications.scholarship = ?;`
            )
            .bind(id);
        const {results} = await stmt.all();
        const rows = results.map((student) => ({
            name: student.firstName + " " + student.lastName,
            preferredPronouns: student.preferredPronouns,
            StudentID: student.studentID,
            Major: student.majors,
            Minor: student.minors,
            CumulativeGPA: student.GPA,
            CurrentYear: student.year,
            Ethnicity: student.ethnicity,
            WorkExperience: student.workExperience
        }));
        const scholarshipApplicantSheet = XLSX.utils.json_to_sheet(rows, {
            dense: true
        });
        const scholarshipApplicantWB = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            scholarshipApplicantWB,
            scholarshipApplicantSheet,
            "Scholarship Applicants"
        );
        const data = XLSX.writeXLSX(scholarshipApplicantWB, {
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
    return new Response(
        await getScholarshipApplicants(event.platform?.env.DB, event.params.id)
    );
}

import type {D1Database} from "@cloudflare/workers-types";
import {error} from "@sveltejs/kit";
import * as XLSX from "xlsx";

async function getActiveScholarships(db: D1Database) {
    const errors = [];
    try {
        const stmt = db.prepare(
            `SELECT scholarships.*, users.* FROM scholarships JOIN users ON users.id = scholarships.donorID;`
        );
        const {results} = await stmt.all();
        const rows = results.map((scholarship) => ({
            name: scholarship.name,
            amount: scholarship.amount,
            donor_name: scholarship.firstName + " " + scholarship.lastName,
            donor_phone: scholarship.phone,
            donor_email: scholarship.email,
            major: scholarship.requiredMajors,
            minor: scholarship.requiredMinors,
            cumalativeGPA: scholarship.requiredGPA,
            deadline: scholarship.deadline,
            other: scholarship.other
        }));
        const scholarshipSheet = XLSX.utils.json_to_sheet(rows, {dense: true});
        const scholarshipWB = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            scholarshipWB,
            scholarshipSheet,
            "scholarship Demographic"
        );
        const data = XLSX.writeXLSX(scholarshipWB, {
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
    return new Response(await getActiveScholarships(event.platform?.env.DB));
}

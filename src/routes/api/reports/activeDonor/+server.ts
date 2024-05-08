import type {D1Database} from "@cloudflare/workers-types";
import {error} from "@sveltejs/kit";
import * as XLSX from "xlsx";

async function getDonors(db: D1Database) {
    const errors = [];
    try {
        const stmt = db.prepare(
            `SELECT users.firstName, users.lastName, users.phone, users.email, scholarships.name, scholarships.amount, scholarships.numAvailable, scholarships.requiredMajors, scholarships.requiredMinors, scholarships.requiredGPA, scholarships.deadline FROM users JOIN scholarships ON users.id = scholarships.donorID;`
        );
        const {results} = await stmt.all();
        const rows = results.map((donors) => ({
            Name: donors.firstName + " " + donors.lastName,
            PhoneNumber: donors.phone,
            Email: donors.email,
            ScholarshipName: donors.name,
            ScholarshipAmount: donors.amount,
            AmountAvailable: donors.numAvailable,
            RequiredMajor: donors.requiredMajors,
            RequiredMinor: donors.requiredMinors,
            RequiredGPA: donors.requiredGPA,
            Deadline: donors.deadline
        }));
        const donorsSheet = XLSX.utils.json_to_sheet(rows, {dense: true});
        const donorsWB = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(donorsWB, donorsSheet, "Active Donors");
        const data = XLSX.writeXLSX(donorsWB, {
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
    return new Response(await getDonors(event.platform?.env.DB));
}

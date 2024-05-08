// @ts-nocheck

import {dev} from "$app/environment";

export function getMatchingEngineBaseURL(): string {
    if (dev) {
        return "http://localhost:8787";
    } else {
        return "https://matching-engine.jath03.workers.dev";
    }
}

export async function rankApplicants(
    scholarship: Scholarship,
    applicants: ApplicantInfo[]
) {
    let data = {
        scholarship: structuredClone(scholarship),
        applicants: structuredClone(applicants)
    };
    data.scholarship.deadline = data.scholarship.deadline
        .toISOString()
        .slice(0, 10);
    const result = await (
        await fetch(getMatchingEngineBaseURL() + "/rank/applicants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    ).json();
    for (let i = 0; i < applicants.length; i++) {
        if (applicants[i].applicant == result[i].user) {
            applicants[i]["score"] = result[i].score;
        }
    }
    return applicants;
}

export async function rankScholarships(
    applicant: ApplicantInfo,
    scholarships: Scholarship[]
) {
    let data = {
        applicant: structuredClone(applicant),
        scholarships: structuredClone(scholarships)
    };
    for (let i = 0; i < data.scholarships.length; i++) {
        data.scholarships[i].deadline = data.scholarships[i].deadline
            .toISOString()
            .slice(0, 10);
    }
    const result = await (
        await fetch(getMatchingEngineBaseURL() + "/rank/scholarships", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    ).json();
    for (let i = 0; i < scholarships.length; i++) {
        if (scholarships[i].id == result[i].scholarship) {
            scholarships[i]["score"] = result[i].score;
        }
    }
    return scholarships;
}

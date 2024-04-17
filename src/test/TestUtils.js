import {initializeLucia} from "$lib/server/auth";
import {generateId} from "lucia";

import("$lib/types");
//variables
export var users_array = require("./JSON_files/TestUsers.json");
var applications_array = require("./JSON_files/TestApplication.json");
var applicantInfo_array = require("./JSON_files/TestApplicantInfo.json");
var scholarships_array = require("./JSON_files/TestScholarships.json");

const {Miniflare} = require("miniflare");

const mf = new Miniflare({
    d1Databases: {
        DB: "test"
    },
    modules: true,
    script: ""
});

export const db = mf.getD1Database("DB");

export const mockEventLogin = {
    request: {
        formData: async () => {
            let data = new FormData();
            data.append("username", "goldenVoyager80");
            data.append("password", "FrancePeugeot6&Blue");
            return data;
        }
    },
    platform: {
        env: {
            DB: db
        }
    },
    locals: {
        //@ts-ignore
        lucia: initializeLucia(db)
    },
    cookies: {
        set: () => {}
    }
};

export const mockEventCreateAccount = {
    request: {
        formData: async () => {
            let data = new FormData();
            data.append("id", generateId(20));
            data.append("username", "goldenVoyagerCOPYFORTEST");
            data.append("password", "FrancePeugeot6&Blue");
            data.append("userType", "Applicant");
            data.append("firstName", "OliverTEST");
            data.append("lastName", "SmithTEST");
            data.append("phoneNumber", "1234567890");
            data.append("email", "oliver.goldenVoyager80@website.net");
            return data;
        }
    },
    platform: {
        env: {
            DB: db
        }
    },
    locals: {
        //@ts-ignore
        lucia: initializeLucia(db)
    },
    cookies: {
        set: () => {}
    }
};

/**
 * Drops a table from the database.
 * @param {string} tableName - The name of the table to drop.
 */
export async function dropTable(tableName) {
    if (typeof tableName !== "string") {
        throw new Error("tableName must be a string");
    }

    const sql = `DROP TABLE IF EXISTS ${tableName}`;
    (await db).prepare(sql).run();
}

/**
 * Creates a table table from the database. You can specify the coloumns and the type.
 * EXAMPLE USAGE:
 * createTable('users', { name: 'id', type: 'VARCHAR(255)' }, { name: 'UserName', type: 'VARCHAR(255)' }, { name: 'email', type: 'VARCHAR(255)' });
 * @param {string} tableName - The name of the table to drop.
 * @param {Array<{ name: string, type: string }>} columnName - The name of the table to drop.
 */
export async function createTable(tableName, ...columnName) {
    try {
        if (typeof tableName !== "string") {
            throw new Error("tableName must be a string");
        }

        if (!Array.isArray(columnName) || columnName.length === 0) {
            throw new Error("columns must be a non-empty array of objects");
        }

        columnName.forEach((columnName) => {
            if (
                typeof columnName !== "object" ||
                !columnName.name ||
                !columnName.type
            ) {
                throw new Error(
                    'Each column must be an object with "name" and "type" properties'
                );
            }
        });

        const sqlColumns = columnName
            .map((columnName) => `${columnName.name} ${columnName.type}`)
            .join(", ");

        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${sqlColumns.slice(0, -1)}));`;

        await (await db).prepare(sql).run();
    } catch (error) {
        console.error("Error:", error);
    }
}

/**
 * clean up test cleans up testing tables from the database.
 *
 */
export async function cleanUpTest() {
    const results = await (await db).prepare("PRAGMA table_list").all();

    const tableNames = results.results.map((table) => table.name);

    const tablesToExclude = ["_cf_KV", "sqlite_schema", "sqlite_temp_schema"];

    const tablesToDrop = tableNames.filter((tableName) => {
        return (
            typeof tableName === "string" &&
            !tablesToExclude.includes(tableName)
        );
    });

    for (const tableName of tablesToDrop) {
        try {
            if (typeof tableName === "string") {
                await dropTable(tableName);
            }
        } catch (error) {
            console.error(`Error dropping table '${tableName}':`, error);
        }
    }
}

/**
 * add user to the database.
 * @typedef {import('$lib/types').User} User
 * @param {User} user - the user you want to add
 */
export async function addUser(user) {
    (await db)
        .prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
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

/**
 * add Scholarship to the database.
 * @typedef {import('$lib/types').Scholarship} Scholarship
 * @param {Scholarship} scholarship - the user you want to add
 */
export async function addScholarship(scholarship) {
    (await db)
        .prepare(
            "INSERT INTO scholarships VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
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
            scholarship.other
        )
        .run();
}

/**
 * add ApplicantInfo to the database.
 * @typedef {import('$lib/types').ApplicantInfo} ApplicantInfo
 * @param {ApplicantInfo} applicantInfo - the user you want to add
 */
export async function addApplicantInfo(applicantInfo) {
    (await db)
        .prepare("INSERT INTO applicantInfo VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(
            applicantInfo.user,
            applicantInfo.majors,
            applicantInfo.minors,
            applicantInfo.GPA,
            applicantInfo.year,
            applicantInfo.ethnicity,
            applicantInfo.preferredPronouns,
            applicantInfo.workExperience,
            applicantInfo.netID
        )
        .run();
}

/**
 * add ApplicantInfo to the database.
 * @typedef {import('$lib/types').Application} Application
 * @param {Application} application - the user you want to add
 */
export async function addApplication(application) {
    (await db)
        .prepare("INSERT INTO applications VALUES (?, ?, ?, ?, ?)")
        .bind(
            application.id,
            application.applicant,
            application.scholarship,
            application.statement,
            application.status
        )
        .run();
}

export async function setUpTestEnv() {
    try {
        await createTable(
            "users",
            {name: "id", type: "VARCHAR(255) PRIMARY KEY"},
            {name: "username", type: "VARCHAR(255)"},
            {name: "hash", type: "VARCHAR(255)"},
            {name: "salt", type: "VARCHAR(255)"},
            {name: "firstName", type: "VARCHAR(255)"},
            {name: "lastName", type: "VARCHAR(255)"},
            {name: "phone", type: "VARCHAR(255)"},
            {name: "email", type: "VARCHAR(255)"},
            {name: "type", type: "VARCHAR(255)"}
        );

        await createTable(
            "session",
            {name: "id", type: "VARCHAR(255) PRIMARY KEY"},
            {name: "user_Id", type: "VARCHAR(255)"},
            {name: "fresh", type: "BOOLEAN"},
            {name: "expires_at", type: "VARCHAR(255)"}
        );

        await createTable(
            "applicantInfo",
            {name: "user", type: "VARCHAR(255) PRIMARY KEY"},
            {name: "majors", type: "VARCHAR(255)"},
            {name: "minors", type: "VARCHAR(255)"},
            {name: "GPA", type: "FLOAT"},
            {name: "year", type: "VARCHAR(255)"},
            {name: "ethnicity", type: "VARCHAR(255)"},
            {name: "prefferedPronouns", type: "VARCHAR(255)"},
            {name: "workExperience", type: "TEXT"},
            {name: "netID", type: "VARCHAR(255)"}
        );

        await createTable(
            "scholarships",
            {name: "id", type: "VARCHAR(255) PRIMARY KEY"},
            {name: "name", type: "VARCHAR(255)"},
            {name: "amount", type: "INTEGER"},
            {name: "donorId", type: "VARCHAR(255)"},
            {name: "numAvailable", type: "INTEGER"},
            {name: "requiredMajors", type: "VARCHAR(255)"},
            {name: "requiredMinors", type: "VARCHAR(255)"},
            {name: "requiredGPA", type: "FLOAT"},
            {name: "deadline", type: "DATE"},
            {name: "other", type: "VARCHAR(65535)"}
        );

        await createTable(
            "applications",
            {name: "id", type: "VARCHAR(255) PRIMARY KEY"},
            {name: "applicant", type: "VARCHAR(255)"},
            {name: "scholarship", type: "VARCHAR(255)"},
            {name: "statement", type: "VARCHAR(65535)"},
            {name: "status", type: "VARCHAR(255)"}
        );

        for (const user of users_array) {
            const test_user = {
                id: user.id,
                username: user.username,
                password: {
                    hash: user.password,
                    salt: user.salt
                },
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                type: user.type
            };
            //console.log(test_user);
            //@ts-ignore
            await addUser(test_user);
        }

        for (const applicantInfo of applicantInfo_array) {
            const test_applicantInfo = {
                user: applicantInfo.user,
                majors: applicantInfo.majors,
                minors: applicantInfo.minors,
                GPA: applicantInfo.GPA,
                year: applicantInfo.year,
                ethnicity: applicantInfo.ethnicity,
                preferredPronouns: applicantInfo.preferredPronouns,
                workExperience: applicantInfo.workExperience,
                netID: applicantInfo.netID
            };
            //@ts-ignore
            await addApplicantInfo(test_applicantInfo);
        }

        for (const scholarship of scholarships_array) {
            const test_scholarship = {
                id: scholarship.id,
                name: scholarship.name,
                amount: scholarship.amount,
                donorID: scholarship.donorID,
                numAvailable: scholarship.numAvailable,
                requiredMajors: scholarship.requiredMajors,
                requiredMinors: scholarship.requiredMinors,
                requiredGPA: scholarship.requiredGPA,
                deadline: scholarship.deadline,
                other: scholarship.other
            };
            //console.log(test_scholarship)
            //@ts-ignore
            await addScholarship(test_scholarship);
        }

        for (const application of applications_array) {
            const test_application = {
                id: application.id,
                applicant: application.applicant,
                scholarship: application.scholarship,
                statement: application.statement,
                status: application.status
            };

            await addApplication(test_application);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

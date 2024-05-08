import {Lucia} from "lucia";
import {D1Adapter} from "@lucia-auth/adapter-sqlite";
import {dev} from "$app/environment";
import type {UserID, UserType} from "$lib/types";
import type {D1Database} from "@cloudflare/workers-types";

// This function initializes a new instance of Lucia framework for authentication.
// It takes a D1Database instance as a parameter and returns a Lucia instance configured with the provided adapter.
export function initializeLucia(D1: D1Database) {
    //TODO MAKE A FIX FOR WHY THE D1Database TYPE IS NOT BEING SEEN PROPERLY

    // An adapter acts as a bridge between Lucia framework and a specific data storage system.
    // Here, we use the D1Adapter class from "@lucia-auth/adapter-sqlite" package, which is designed to work with SQLite databases.
    // The adapter is responsible for handling database operations related to user authentication and session management.
    const adapter = new D1Adapter(D1, {
        user: "users", // Specify the table name for user data.
        session: "session" // Specify the table name for session data.
    });
    return new Lucia(adapter, {
        sessionCookie: {
            attributes: {
                // set to `true` when using HTTPS
                secure: !dev
            }
        },
        getUserAttributes: (attributes) => {
            return {
                // attributes has the type of DatabaseUserAttributes
                id: attributes.id,
                username: attributes.username,
                firstName: attributes.firstName,
                lastName: attributes.lastName,
                netID: attributes.netID,
                phone: attributes.phone,
                email: attributes.email,
                type: attributes.type
            };
        }
    });
}

// Extend the Register interface of Lucia framework to include a property Auth.
// This allows TypeScript to infer the return type of initializeLucia function when used as Auth.
//export type Auth = ReturnType<typeof initializeLucia>;
declare module "lucia" {
    interface Register {
        Auth: ReturnType<typeof initializeLucia>;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

//MORE ATTRIBUTES CAN BE ADDED AS NEEDED
interface DatabaseUserAttributes {
    id: UserID;
    username: string;
    firstName: string;
    lastName: string;
    netID: string;
    phone: string;
    email: string;
    type: UserType;
}

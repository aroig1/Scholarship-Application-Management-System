import type {RequestHandler, json} from "@sveltejs/kit";

export async function GET({platform}) {
    // double check this, in production of course this should be set
    if (!platform) {
        return new Response("No platform found", {
            status: 500,
            statusText: "No platform found"
        });
    }

    const db = platform.env.DB;
    try {
        // make sure you have a users table created in your database
        let result = await db.prepare("SELECT * FROM Customers").run();
        // console.log("results: " + );

        return new Response(JSON.stringify(result.results));
    } catch (e) {
        console.log(e);
        await db.exec(`DROP TABLE IF EXISTS Customers;
            CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
            INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');
        `);
        return new Response("Error", {status: 500, statusText: "Error"});
    }
}

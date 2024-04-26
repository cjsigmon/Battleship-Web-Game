import { db } from "./db.mjs";


export async function setupDB() {
    console.log('called setup db')

// Use the db object to run table creation commands and otherwise initialize your database setup here.
await db.run(`
        CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY,
        initials TEXT(3) NOT NULL,
        score INTEGER
        );
        `);



const rows = await db.all(`
        SELECT * FROM scores
        ORDER BY score DESC
`);

return rows;
}



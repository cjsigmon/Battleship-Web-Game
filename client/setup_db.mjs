import {db} from './db.mjs';




// Use the db object to run table creation commands and otherwise initialize your database setup here.
await db.run(`
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY,
        initials TEXT (3) NOT NULL,
        score INTEGER
    )
`);







await db.run(`
        INSERT INTO scores VALUES
        (1, 'CJS', 70)
`);

const rows = await db.all('SELECT * FROM scores');

// Print the retrieved data
console.log('Scores:');
console.table(rows);



db.close();


import express from 'express';
import bodyParser from 'body-parser';
import { db } from './db.mjs';

export function runAPI() {
    const app = express();
    const port = 7777;
    app.use(bodyParser.json());

    app.get('/scores', async (req, res) => {
        const rows = await db.all(`
            SELECT * FROM scores
            ORDER BY score DESC
        `);
        res.json(rows);
    });

    app.post('/scores', async (req, res) => {

        
        await db.run(`
            INSERT INTO scores (initials, score) VALUES
            ('${(req.body.initials)}', ${(req.body.score)})
        `);
        res.json(req.body)

    })

    app.get('/', (req, res) => {
        // Replace with your code
        res.json('HELLO THERE LITTLE ONE');
    });


    
    
    app.listen(port, () => {
        console.log('Running...');
    });
}


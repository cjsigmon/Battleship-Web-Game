import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors middleware

import { db } from './db.mjs';

export function runAPI() {
    const app = express();
    const port = 7777;
    app.use(bodyParser.json());
    app.use(cors());

    app.get('/scores', async (req, res) => {
        const rows = await db.all(`
            SELECT * FROM scores
            ORDER BY score DESC
        `);
        res.json(rows);
    });

    app.post('/scores', async (req, res) => {
        const initials = req.body.initials;
        const score = req.body.score;
      
        if (!initials || !score) {
          return res.status(400).json({ error: 'Initials and score are required.' });
        }
      
        try {
          await db.run(`
            INSERT INTO scores (initials, score) VALUES (?, ?)
          `, [initials, score]);
          
          res.json({ success: true });
        } catch (err) {
          console.error('Error inserting into database:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      

    app.get('/', (req, res) => {
        // Replace with your code
        res.json('HELLO THERE LITTLE ONE');
    });


    
    
    app.listen(port, () => {
        console.log('Running...');
    });
}


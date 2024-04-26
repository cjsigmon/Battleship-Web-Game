import express from 'express';
import bodyParser from 'body-parser';

export function runAPI() {
    const app = express();
    const port = 7777;
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        // Replace with your code
        res.json('HELLO THERE LITTLE ONE');
    });
    
    
    app.listen(port, () => {
        console.log('Running...');
    });
}


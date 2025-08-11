const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const clientConfig = {
    user: process.env.PGUSER || 'test',
    host: process.env.PGHOST || 'postgres',
    database: process.env.PGDATABASE || 'employees',
    password: process.env.PGPASSWORD || 'test',
    port: parseInt(process.env.PGPORT) || 5432,
};

app.get('/api/employees', async (req, res) => {
    try {
        const client = new Client(clientConfig);
        await client.connect();
        const result = await client.query('SELECT * FROM employees');
        const employees = result.rows.map(row => ({
            id: row.id,
            name: row.data?.name || 'No name',
            role: row.data?.role || 'No role',
            image: row.data?.image || ''
        }));
        await client.end();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/employees', async (req, res) => {
    try {
        const body = req.body;
        const client = new Client(clientConfig);
        await client.connect();
        const result = await client.query(
            'INSERT INTO employees (data) VALUES ($1) RETURNING id, data',
            [JSON.stringify(body)]
        );
        await client.end();
        const saved = {
            id: result.rows[0].id,
            ...result.rows[0].data
        };
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

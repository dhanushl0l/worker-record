import { NextResponse } from 'next/server';
import { Client } from 'pg';

const clientConfig = {
    user: 'test',
    host: '127.0.0.1',
    database: 'employees',
    password: 'test',
    port: 5432,
};
// to do reead from config

type Employee = {
    id: number;
    name: string;
    role: string;
    image: string | null;
};

export async function GET() {
    try {
        const client = new Client(clientConfig);
        await client.connect();

        const result = await client.query('SELECT * FROM employees');

        const employees: Employee[] = result.rows.map(row => ({
            id: row.id,
            name: row.data?.name || 'No name',
            role: row.data?.role || 'No role',
            image: row.data?.image || '' // plain base64, no prefix
        }));

        employees.forEach(emp => {
            console.log(`Employee ID: ${emp.id}, Name: ${emp.name}`);
        });

        await client.end();

        return NextResponse.json(employees);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


// inside POST /api/employees
export async function POST(req: Request) {
    try {
        const body = await req.json(); // { id, name, role, image }
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

        return NextResponse.json(saved); // <-- send back the saved Employee object
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

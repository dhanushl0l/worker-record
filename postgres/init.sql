-- Create employees table with a JSON column
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    data JSONB
);


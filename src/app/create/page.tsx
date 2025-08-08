'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEmployees } from '../context/EmployeeContext';
import '../styles/home.css';

export default function CreatePage() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();
    const { addEmployee } = useEmployees();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !role || !image) return;

        const newEmp = {
            id: Date.now(),
            name,
            role,
            image // keep it as File, let context convert it to base64
        };

        await addEmployee(newEmp);
        router.push('/');
    };


    return (
        <div className="home-wrapper">
            <div className="glass-box">
                <h1 className="title">Add Employee</h1>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                    <input
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        placeholder="Role"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImage(e.target.files?.[0] || null)}
                        required
                    />
                    <button type="submit" className="button">Add</button>
                </form>
            </div>
        </div>
    );
}

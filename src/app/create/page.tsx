'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/home.css';

export default function CreatePage() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !role || !image) return;

        // Convert image to base64
        const base64Image = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(image);
        });

        const newEmp = {
            name,
            role,
            image: base64Image
        };

        try {
            const res = await fetch('http://localhost:3001/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEmp)
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            router.push('/');
        } catch (err) {
            console.error('Failed to save employee:', err);
        }
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

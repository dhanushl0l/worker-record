'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '../styles/home.css';

export default function ListPage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('http://backend:3001/api/employees')
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
            })
            .catch(err => {
                console.error('Error fetching employees:', err);
            });
    }, []);

    return (
        <div className="list-wrapper">
            <div className="list-box">
                <h1 className="title">Employee List</h1>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {employees.map((emp: any) => {
                        const imageSrc = emp.image?.startsWith('data:')
                            ? emp.image
                            : `data:image/jpeg;base64,${emp.image || ''}`;

                        return (
                            <li key={emp.id} className="employee">
                                {emp.image && (
                                    <Image
                                        src={imageSrc}
                                        alt={emp.name}
                                        width={40}
                                        height={40}
                                    />
                                )}
                                <div className="info">
                                    <div className="name">{emp.name}</div>
                                    <div className="role">{emp.role}</div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

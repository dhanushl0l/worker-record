'use client';
import { useEmployees } from '../context/EmployeeContext';
import Image from 'next/image';
import '../styles/home.css';

export default function ListPage() {
    const { employees } = useEmployees();

    return (
        <div className="list-wrapper">
            <div className="list-box">
                <h1 className="title">Employee List</h1>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {employees.map(emp => {
                        const imageSrc = `data:image/jpeg;base64,${emp.image}`;
                        return (
                            <li key={emp.id} className="employee">
                                <Image
                                    src={imageSrc}
                                    alt={emp.name}
                                    width={40}
                                    height={40}
                                />
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

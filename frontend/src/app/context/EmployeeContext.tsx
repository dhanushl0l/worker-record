'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Employee = {
    id: number;
    name: string;
    role: string;
    image: string;
};

type user_Employee = {
    id: number;
    name: string;
    role: string;
    image: File;
};

type EmployeeContextType = {
    employees: Employee[];
    addEmployee: (emp: user_Employee) => void;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        fetch('http://worker.dhanu.cloud:3001/api/employees')
            .then(res => res.json())
            .then(data => {
                setEmployees(Array.isArray(data) ? data : data.employees || []);
            });
    }, []);

    async function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const addEmployee = async (emp: user_Employee) => {
        let imageBase64: string | null = null;

        if (emp.image instanceof File) {
            imageBase64 = await fileToBase64(emp.image);
        } else if (typeof emp.image === 'string') {
            imageBase64 = emp.image;
        }

        const res = await fetch('http://worker.dhanu.cloud:3001/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...emp,
                image: imageBase64
            })
        });

        if (!res.ok) {
            console.error("Failed to add employee");
            return;
        }

        const saved: Employee = await res.json();
        setEmployees(prev => [...prev, saved]);
    };



    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (!context) throw new Error('useEmployees must be used within EmployeeProvider');
    return context;
}

'use client';

import { useRouter } from 'next/navigation';
import './styles/home.css'; // CSS moved here or to layout.tsx

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-wrapper">
      <div className="glass-box">
        <h1 className="title">Welcome</h1>
        <div className="button-group">
          <button className="button" onClick={() => router.push('/create')}>Create</button>
          <button className="button" onClick={() => router.push('/list')}>List</button>
        </div>
      </div>
    </div>
  );
}

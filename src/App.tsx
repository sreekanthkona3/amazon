import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  age: number;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${BASE_URL}/api/users`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [BASE_URL]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users</h1>
      <h1>Latest</h1>
      {users.map((u) => (
        <p key={u.id}>
          {u.name} - {u.age}
        </p>
      ))}
    </div>
  );
}

export default App;

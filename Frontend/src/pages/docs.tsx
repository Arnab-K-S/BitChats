import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const BASE_URL = "https://reqres.in/api/users/";

export default function DocsPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => setUsers(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Docs</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="flex items-center gap-4">
                <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-10 h-10 rounded-full" />
                <div>
                  <p>{user.first_name} {user.last_name}</p>
                  <p>{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </DefaultLayout>
  );
}

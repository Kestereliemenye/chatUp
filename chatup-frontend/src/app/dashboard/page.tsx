"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch("http://localhost:7000/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);

        if (!res.ok) {
          throw new Error("User not authenticated");
        }
        const data = await res.json();
        setUser(data); //assuming data contains user info
      } catch (err) {
        console.error(err);
        router.push("/login"); // Redirect to login if the user is not authenticated
      }
    };
    fetchUser();
  }, [router]);

  if (!user) return <div>Loading...</div>; //show loading till data is fetched
  return (
    <div>
      <h1>Welcome , {user.name}</h1>
    </div>
  );
}

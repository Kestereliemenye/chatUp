"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./profile.module.css";

export default function Profile() {
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
          router.push("/login");
          throw new Error("User not authenticated");
        }
          const data = await res.json();
          console.log(data);
          
        setUser(data); //assuming data contains user info
      } catch (err) {
        console.error(err);
        router.push("/login"); // Redirect to login if the user is not authenticated
      }
    };
    fetchUser();
  }, [router]);
  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <div className={styles.leftItem}>
          <div>
            <Image
              src="/profile-picD.png"
              alt="profile pic"
              width={250}
              height={250}
            />
          </div>
          <div>
            {user && <h1>{user.name}</h1>}
            {user && <p>{user.username}</p>}
            <p>Bio</p>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightItem}>
          <button>Edit Profile</button>
          <button>Share Profile</button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./profile.module.css";

export default function Profile() {
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [initialBio, setInitialBio] = useState("");
  const [initialUsername, setInitialUsername] = useState("");
  const [loading, setloading] = useState(false); //load state
  const router = useRouter();

  // to handle the editable bio
  const handleEdit = async () => {
    setloading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "http://localhost:7000/api/auth/user/update/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bio: bio,
            username: user.username,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      alert("Bio updated successfully");
    } catch (err) {
      console.error("Failed to save bio:", err);
    } finally {
      setloading(false);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      setloading(true);
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
        setBio(data.bio || "");
        setInitialBio(data.bio || ""); //store the initial bio
        setInitialUsername(data.username || ""); //store the initial username
      } catch (err) {
        console.error(err);
        router.push("/login"); // Redirect to login if the user is not authenticated
      } finally {
        setloading(false);
      }
    };
    fetchUser();
  }, [router]);

  //handle cancel
  const handleCancel = () => {
    setBio(initialBio);
    setUser((prev) => ({ ...prev, username: initialUsername }));
    setIsEditing(false);
  };

  return (
    <div className={styles.top}>
      {loading && (
        <div className={styles.fullScreenLoader}>
          <div className={styles.loader}></div>
        </div>
      )}
      <div className={styles.left}>
        <div className={styles.leftItem}>
          <div>
            <Image
              src="/profile-picD.png"
              alt="profile pic"
              width={250}
              height={250}
              priority
            />
          </div>
          <div>
            {user && <h1>{user.name}</h1>}
            <div className={styles.userNameNdBio}>
              {user && (
                <>
                  {isEditing ? (
                    <label htmlFor="username">Username</label>
                  ) : null}
                  <input
                    type="text"
                    value={user.username || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, username: e.target.value }))
                    }
                    className={isEditing ? styles.editing : ""}
                  ></input>
                </>
              )}
              {isEditing ? <label htmlFor="">Bio</label> : null}
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={isEditing ? styles.editing : ""}
                disabled={!isEditing}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightItem}>
          {isEditing ? (
            <>
              <button onClick={handleEdit}>save</button>
              <button onClick={handleCancel}>cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
          <button>Share Profile</button>
        </div>
      </div>
    </div>
  );
}

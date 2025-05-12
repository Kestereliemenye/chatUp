import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/loading.png" alt="Logo" width={80} height={80} />
      </div>
      <div className={styles.link}>
        <div className={styles.links}>
          <a href="#">
            <Image src="/profile.png" alt="Logo" width={50} height={50} />
          </a>{" "}
          <a href="#">
            <Image src="/chats.png" alt="Logo" width={50} height={50} />
          </a>{" "}
          <a href="#">
            <Image src="/chats.png" alt="Logo" width={50} height={50} />
          </a>{" "}
          <a href="/profile">
            <Image src="/user.png" alt="Logo" width={50} height={50} />
          </a>
        </div>
      </div>
    </nav>
  );
}

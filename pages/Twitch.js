import Head from "next/head";
import styles from "../styles/Home.module.css";
//import axios from "axios";
import { useEffect, useState } from "react";
import { useAPI } from "./components/UserContextProvider";

export default function Twitch() {
  const [access_token, setAccess_token] = useState("");
  const { user } = useAPI();
  useEffect(() => {
    if (typeof window != "undefined") {
      if (window.location.hash) {
        let fragments = window.location.hash.substring(1);
        let params = fragments.split("&");
        let accessToken = params[0].split("=")[1];
        window.localStorage.setItem("token", accessToken);
      }
      setAccess_token(window.localStorage.getItem("token"));
    }
  }, []);

  function callRedirect() {
    if (typeof window != "undefined") {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Filadex - {user[0]?.display_name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Redirecting...</h1>
          <br />
          {callRedirect()}
        </main>

        <footer className={styles.footer}>
          <a
            href="https://flyken.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright - Flyken 2020
          </a>
        </footer>
      </div>
    </>
  );
}

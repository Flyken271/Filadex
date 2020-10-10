import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Form, Button } from 'reactstrap'
import { useState } from 'react'

export default function Home() {
  const [link, setLink] = useState('');
  let uid = Math.random().toString(36).substr(2, 9);

  const handleLinks = (e) => {
    e.preventDefault();
    try {
      axios.post("https://api.wepost.xyz/links", {
        content: link,
        uid: uid,
      }).then((e) => {
        console.log("Link sent!")
        document.getElementById("copy").innerHTML = "Copy: " + window.location.href + uid;
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Filadex - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Filadex!</a>
        </h1>

        <p className={styles.description}>
          Get started by shortening links.
        </p>

        <div className={styles.grid}>
          <Form>
            <label>Link:</label>
            <br />
            <input className={styles.linkForm} type="text" onChange={(e) => setLink(e.target.value)} placeholder="https://www.example.com" />
            <br />
            <br />
            <Button color="success" onClick={(e) => handleLinks(e)}>Shorten</Button>
            <br />
            <br />
            <h4 id="copy"></h4>
          </Form>
        </div>
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
  )
}

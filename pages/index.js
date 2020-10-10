import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Form, Button } from 'reactstrap'
import { useState } from 'react'

export default function Home() {
  const [link, setLink] = useState('');
  let uid = Math.random().toString(36).substr(2, 9);
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  const handleLinks = (e) => {
    e.preventDefault();
    if(link != null && validURL(link)){
      try {
        axios.post("https://api.wepost.xyz/links", {
          content: link,
          uid: uid,
        }).then((e) => {
          console.log("Link sent!")
          document.getElementById("copy").innerHTML = "Copy: " + window.location.href + uid;
        })
        document.getElementById("linkInput").value = "";
      } catch (error) {
        console.log(error)
      }
    }else{
      alert("Must be a valid URL!");
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
            <input id="linkInput" onInput={(e) => setLink(e.target.value)} className={styles.linkForm} type="text" placeholder="https://www.example.com" />
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

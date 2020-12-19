import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Form, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useAPI } from "./components/UserContextProvider";

export default function Home() {
  const [link, setLink] = useState("");
  const [file, setFile] = useState("");
  const { user } = useAPI();

  //let uid = Math.random().toString(36).substr(2, 4);
  let uid = nanoid(5);
  axios.get("https://api.wepost.xyz/links").then((res) => {
    res.data.map((entry, index) => {
      if (entry.uid == uid) {
        uid = nanoid(5);
      }
    });
  });

  axios.get("https://api.wepost.xyz/file-uploads").then((res) => {
    res.data.map((entry, index) => {
      if (entry.uid == uid) {
        uid = nanoid(5);
      }
    });
  });
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const handleLinks = (e) => {
    e.preventDefault();
    if (link != null && validURL(link)) {
      try {
        axios
          .post("https://api.wepost.xyz/links", {
            content: link,
            uid: uid,
            twitch: user?.display_name,
          })
          .then((e) => {
            console.log("Link sent!");
            document.getElementById("copy").innerHTML =
              "Copy: " + window.location.href + uid;
          });
        document.getElementById("linkInput").value = "";
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Must be a valid URL!");
    }
  };
  const handleFile = (e) => {
    e.preventDefault();
    if (file != null) {
      try {
        axios
          .post("https://api.wepost.xyz/file-uploads", {
            uid: uid,
            twitch: user?.display_name,
          })
          .then((response) => {
            const formData = new FormData();
            formData.append("files", file);
            //formData.append('uid', uid);
            formData.append("ref", response.data.id); // optional, you need it if you want to link the image to an entry
            formData.append("field", "content");

            axios
              .post("https://api.wepost.xyz/upload", formData)
              .then((e) => {
                axios.put(
                  "https://api.wepost.xyz/file-uploads/" + response.data.id,
                  {
                    content: e.data[0],
                    view: 0,
                  }
                );
                if (typeof window != "undefined") {
                  window.location.href = window.location.href + uid;
                }
              })
              .catch((error) => {
                console.log(error.response);
              });
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Must be a valid File!");
    }
  };

  return (
    <>
      {user?.id ? (
        <Link href={"/u/" + user?.login}>
          <img className={styles.profile} src={user?.profile_image_url} />
        </Link>
      ) : (
        <div></div>
      )}
      <Button className={styles.backButton} color="info" href="/entries">
        Entries
      </Button>
      <div className={styles.container}>
        <Head>
          <title>Filadex - Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a>Filadex!</a>
          </h1>

          {user?.id ? (
            <>
              <p className={styles.description}>
                Get started by shortening links.
              </p>
              <div className={styles.cardd}>
                <Form>
                  <label>Link</label>
                  <br />
                  <input
                    style={{ borderRadius: "5px" }}
                    id="linkInput"
                    onInput={(e) => setLink(e.target.value)}
                    className={styles.linkForm}
                    type="text"
                    placeholder=" https://www.example.com"
                  />
                  <br />
                  <br />
                  <Button color="success" onClick={(e) => handleLinks(e)}>
                    Shorten
                  </Button>
                  <br />
                  <br />
                  <h4 id="copy"></h4>
                </Form>

                <Form>
                  <label>Image</label>
                  <br />
                  <Button
                    id="fileInputButton"
                    onClick={() => {
                      return false;
                    }}
                    color="info"
                  >
                    <label
                      id="fileInputLabel"
                      className={styles.fileLabel}
                      htmlFor="fileInput"
                    >
                      Select File
                    </label>
                  </Button>

                  <input
                    onChange={(e) => {
                      if (typeof document != "undefined") {
                        document.getElementById("fileInputLabel").innerHTML =
                          e.target.files[0].name;
                      }
                    }}
                    className={styles.fileUpload}
                    id="fileInput"
                    accept="image/*"
                    onInput={(e) => setFile(e.target.files[0])}
                    type="file"
                  />
                  <br />
                  <br />
                  <Button color="warning" onClick={(e) => handleFile(e)}>
                    Upload
                  </Button>
                  <br />
                  <br />
                </Form>
              </div>
            </>
          ) : (
            <>
              <p className={styles.description}>
                Please log in with{" "}
                <a
                  className={styles.twitchLogin}
                  href="https://id.twitch.tv/oauth2/authorize?client_id=egh17kaqbk80czrnfmpt73shn5t81p&redirect_uri=http://flyken.xyz/Twitch&response_type=token&scope=openid"
                >
                  Twitch
                </a>
              </p>
            </>
          )}
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

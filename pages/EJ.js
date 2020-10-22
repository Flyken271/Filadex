import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
const TWITCH_CLIENT_ID = "egh17kaqbk80czrnfmpt73shn5t81p";

export default function EJ() {
  let cursor = "eyJiIjpudWxsLCJhIjp7IkN1cnNvciI6Ik1UQXdNQT09In19";
  if (typeof window != "undefined") {
    const access_token = window.localStorage.getItem("token");
    useEffect(() => {
      if (access_token) {
        axios
          .get(
            "https://api.twitch.tv/helix/clips?broadcaster_id=26374918&first=100&after=" +
              cursor,
            {
              headers: {
                "Client-ID": TWITCH_CLIENT_ID,
                Accept: "application/vnd.twitchtv.v5+json",
                Authorization: "Bearer " + access_token,
              },
            }
          )
          .then((res) => {
            //console.log(res.data);
            res.data.data.map((entry, index) => {
              /*axios
                .post("https://api.wepost.xyz/clips", {
                  broadcaster_id: entry.broadcaster_id,
                  broadcaster_name: entry.broadcaster_name,
                  createdAt: entry.created_at,
                  creator_id: entry.creator_id,
                  creator_name: entry.creator_name,
                  embed_url: entry.embed_url,
                  game_id: entry.game_id,
                  clip_id: entry.id,
                  language: entry.language,
                  thumbnail_url: entry.thumbnail_url,
                  clip_title: entry.title,
                  url: entry.url,
                  views: entry.view_count,
                })
                .then(() => {
                  if (typeof document != "undefined") {
                    document.getElementById("cursor").innerHTML =
                      res.data.pagination.cursor;
                    cursor = res.data.pagination.cursor;
                    console.log(cursor);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
                */
            });

            res.data.data
              .map((entry, index) => {
                /* axios
                              .post("https://api.wepost.xyz/videos", {
                                createdAt: entry.created_at,
                                description: entry.description,
                                duration: entry.duration,
                                video_id: entry.id,
                                language: entry.language,
                                published_at: entry.published_at,
                                thumbnail_url: entry.thumbnail_url,
                                videoTitle: entry.title,
                                type: entry.type,
                                url: entry.url,
                                user_id: entry.user_id,
                                user_name: entry.user_name,
                                view_count: entry.view_count,
                                viewable: entry.viewable,
                              })
                              .catch((error) => {
                                console.log(error);
                              });*/
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }, []);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Filadex - EJ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 id="cursor"></h1>
      </main>

      <footer className={styles.footer}>
        <a href="https://flyken.org" target="_blank" rel="noopener noreferrer">
          Copyright - Flyken 2020
        </a>
      </footer>
    </div>
  );
}

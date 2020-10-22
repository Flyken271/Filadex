import Head from "next/head";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import {
  Button,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useState } from "react";

const Clips = ({}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [clips, setClips] = useState([]);

  let pageSize = 50;
  Axios.get("https://api.wepost.xyz/clips?_limit=-1").then((res) => {
    setClips(res.data);
  });
  let pagesCount = Math.ceil(clips.length / pageSize);

  const handleClick = (e, index) => {
    e.preventDefault();

    setCurrentPage(index);
  };
  return (
    <>
      <Button
        className={styles.backButton}
        color="danger"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </Button>

      <div className={styles.container}>
        <Head>
          <title>Filadex - clips</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
        </Head>
        <main className={styles.grid}>
          {clips
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((clip, index) => {
              return (
                <a key={index} href={clip.url}>
                  <div className={styles.carddd}>
                    <h3 className={styles.videoTitle}>{clip.clip_title}</h3>
                    <br />
                    <img
                      className={styles.clipThumbnail}
                      src={clip.thumbnail_url}
                    ></img>
                    <br />
                    <Badge color="warning">Views: {clip.views}</Badge>
                    <br />
                    <Badge color="info">{clip.creator_name}</Badge>
                    <br />
                    <Badge color="danger">{clip.createdAt.split("T")[0]}</Badge>
                  </div>
                </a>
              );
            })}
        </main>

        <footer className={styles.footer}>
          <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={(e) => handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
            </PaginationItem>

            {[...Array(pagesCount)].map((page, i) => (
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={currentPage >= pagesCount - 1}>
              <PaginationLink
                onClick={(e) => handleClick(e, currentPage + 1)}
                next
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </footer>
      </div>
    </>
  );
};

export default Clips;

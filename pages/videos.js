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

const Videos = ({}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [videos, setVideos] = useState([]);

  let pageSize = 50;
  Axios.get("https://api.wepost.xyz/videos?_limit=-1").then((res) => {
    setVideos(res.data);
  });
  let pagesCount = Math.ceil(videos.length / pageSize);

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
          <title>Filadex - Videos</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
        </Head>
        <main className={styles.grid}>
          {videos
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((video, index) => {
              return (
                <a href={video.url}>
                  <div key={index} className={styles.carddd}>
                    <h3 className={styles.videoTitle}>{video.videoTitle}</h3>
                    <br />
                    <img src={video.thumbnail_url}></img>
                    <br />
                    <Badge color="warning">Views: {video.view_count}</Badge>
                    <br />
                    <Badge color="info">{video.type}</Badge>
                    <br />
                    <Badge color="danger">
                      {video.createdAt.split("T")[0]}
                    </Badge>
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

export default Videos;

import Head from "next/head";
import styles from "../styles/Home.module.css";
import VideoPlayer from "./components/VideoPlayer";

export default function Home() {
  const videoplayeroptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: "https://98.237.41.63:8050/hls/flyken/index.m3u8",
        type: "application/x-mpegurl",
      },
    ],
  };

  return (
    <div className={styles.player}>
      <Head>
        <title>Filadex - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VideoPlayer {...videoplayeroptions} />
    </div>
  );
}

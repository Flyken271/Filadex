import Head from "next/head";
import styles from "../styles/Home.module.css";
import Axios from 'axios';

const Page = ({ uid, links, uploads }) => {

  const timingTimer=(link)=>{
    setInterval(()=>{
      var timeleft = 5;
      var downloadTimer = setInterval(function(){
        if(timeleft <= -1){
          clearInterval(downloadTimer);
          if(typeof window != "undefined"){
            window.location.href = link.content
          } 
        }
      if(typeof document != "undefined"){
        document.getElementById("timer").innerHTML = timeleft;
        }
          timeleft -= 1;
        }, 1000);
      }, 1000)
    }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Filadex - {uid}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.grid}>
            {links.map((link, index) => {
              return uid == link.uid ? (
                  <div key={index}>
                  {timingTimer(link)}
                  <h1>Redirecting...</h1>
                  <br />
                  <h4 id="timer"></h4>
                  <br />
                  <h6>Want your ad here? <a href="mailto:jaredcollins99@gmail.com">contact me</a></h6>
                  </div>
              ) : (
                <div key={index}></div>
              );
            })}

            {uploads.map((upload, index) => {
              return uid == upload.uid ? (
                  <div key={index}>
                  <img style={{maxHeight: "720px"}, {maxWidth: "1280px"}} src={"https://api.wepost.xyz" + upload.content.url} />
                  </div>
              ) : (
                <div key={index}></div>
              );
            })}
        </main>

        <footer className={styles.footer}>
          <a
            href="https://flyken.xyz"
          >
            Homepage
          </a>
        </footer>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { uid } }) {
  const response = await Axios.get(
    "https://api.wepost.xyz/links"
  );
  const files = await Axios.get("https://api.wepost.xyz/file-uploads");
  var uploads = files.data;
  var links = response.data;
  return {
    props: {
      uid,
      links,
      uploads
    },
  };
}

export default Page;

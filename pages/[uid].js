import Head from "next/head";
import styles from "../styles/Home.module.css";
import Axios from 'axios';

const Page = ({ uid, links }) => {

    const handleRedirect = (link) => {
        if(typeof window != "undefined"){
            setTimeout(()=>{window.location.href = link.content }, 5000);
        }
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
                  <div>
                  {handleRedirect(link)}
                  <h1>Redirecting to {link.content}...</h1>
                  <br />
                  <h4>Please wait for approx. 5 seconds.</h4>
                  <br />
                  <h6>Want your ad here? <a href="mailto:jaredcollins99@gmail.com">contact me</a></h6>
                  </div>
              ) : (
                <></>
              );
            })}
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
};

export async function getServerSideProps({ params: { uid } }) {
  const response = await Axios.get(
    "https://api.wepost.xyz/links"
  );
  var links = response.data;
  return {
    props: {
      uid,
      links,
    },
  };
}

export default Page;

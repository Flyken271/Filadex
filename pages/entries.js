import Head from "next/head";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import { Table } from "reactstrap";

const Entries = ({ links, uploads }) => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Filadex - Entries</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.grid}>
          <div className={styles.card}>
            <h1>Links</h1>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => {
                  return (
                    <tr>
                      <th scope="row">{index}</th>
                      <td>{"https://flyken.xyz/" + link.uid}</td>
                      <td>N/A</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className={styles.card}>
            <h1>Images</h1>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => {
                  return (
                    <tr>
                      <th scope="row">{index}</th>
                      <td>{"https://flyken.xyz/" + upload.uid}</td>
                      <td>{upload.view}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </main>

        <footer className={styles.footer}>
          <a href="https://flyken.xyz">Homepage</a>
        </footer>
      </div>
    </>
  );
};

export async function getServerSideProps({}) {
  const response = await Axios.get("https://api.wepost.xyz/links");
  const files = await Axios.get("https://api.wepost.xyz/file-uploads");
  var uploads = files.data;
  var links = response.data;
  return {
    props: {
      links,
      uploads,
    },
  };
}

export default Entries;

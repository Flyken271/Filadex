import Head from "next/head";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import { useRouter } from "next/router";
import { Table, Button } from "reactstrap";

const Entries = ({ links, uploads }) => {
  const router = useRouter();
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
          <title>Filadex - Entries</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.grid}>
          <div className={styles.card}>
            <h1>Links</h1>
            <Table className={styles.table1} bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  {links ? <th>Destination</th> : <th>Views</th>}
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => {
                  return (
                    <tr key={index}>
                      <th className={styles.table} scope="row">
                        {index}
                      </th>
                      <td className={styles.table}>
                        <a href={"https://flyken.xyz/" + link.uid}>
                          {"https://flyken.xyz/" + link.uid}
                        </a>
                      </td>
                      <td className={styles.destLink}>{link.content}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className={styles.card}>
            <h1>Images</h1>
            <Table className={styles.table1} bordered hover>
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
                      <th className={styles.table} scope="row">
                        {index}
                      </th>
                      <td className={styles.table}>
                        <a href={"https://flyken.xyz/" + upload.uid}>
                          {"https://flyken.xyz/" + upload.uid}
                        </a>
                      </td>
                      <td className={styles.table}>{upload.view}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </main>
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

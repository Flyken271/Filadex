import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import { useRouter } from "next/router";
import { useAPI } from "./components/UserContextProvider";
import { Table, Button } from "reactstrap";


const Page = ({ username, links, uploads }) => {
  const router = useRouter();
  const { user } = useAPI();

  return (
    <>
    {user?.id ? (
        <Link href={"/u/" + user?.login}>
          <img className={styles.profile} src={user?.profile_image_url} />
        </Link>
      ) : (
        <div></div>
      )}
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
          <title>Filadex - {user?.display_name}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
        </Head>

        <h1>{username[1]}</h1>
        <main className={styles.grid}>
          
          <div className={styles.card}>
            <h1>Links</h1>
            <Table className={styles.table1} bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  {links ? <th>Destination</th> : <th>Views</th>}
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => {
                  if(link.twitch == username[1]){
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
                          <td className={styles.TableTwitch}>{link.twitch}</td>
                        </tr>
                      );
                  }
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
                  <th>Preview</th>
                  <th>Views</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => {
                  if(upload.twitch == username[1]){
                    return (
                        <tr key={index}>
                          <th className={styles.table} scope="row">
                            {index}
                          </th>
                          <td className={styles.table}>
                            <a href={"https://flyken.xyz/" + upload.uid}>
                              {"https://flyken.xyz/" + upload.uid}
                            </a>
                          </td>
                          <td
                            onMouseEnter={() => {
                              document.getElementById(
                                "uploadImage" + index
                              ).style.width = "300px";
                              document.getElementById(
                                "uploadImage" + index
                              ).style.height = "300px";
                              document.getElementById(
                                "uploadImage" + index
                              ).style.transition = "all 1s";
                              document.getElementById(
                                "uploadImage" + index
                              ).style.zIndex = "2";
                              document.getElementById(
                                "uploadImage" + index
                              ).style.position = "absolute";
                            }}
                            onMouseLeave={() => {
                              document.getElementById(
                                "uploadImage" + index
                              ).style.width = "30px";
                              document.getElementById(
                                "uploadImage" + index
                              ).style.height = "30px";
                              document.getElementById(
                                "uploadImage" + index
                              ).style.transition = "all 1s";
                              document.getElementById(
                                "uploadImage" + index
                              ).style.zIndex = "0";
                              document.getElementById(
                                "uploadImage" + index
                              ).style.position = "absolute";
                            }}
                          >
                            <img
                              className={styles.previewImage}
                              id={"uploadImage" + index}
                              width="30px"
                              height="30px"
                              src={"https://api.wepost.xyz" + upload.content.url}
                            />
                          </td>
                          <td className={styles.table}>{upload.view}</td>
                          <td  className={styles.TableTwitch}>{upload.twitch}</td>
                        </tr>
                      );
                  }
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

export async function getServerSideProps({ params: { username } }) {
  const response = await Axios.get("https://api.wepost.xyz/links");
  const files = await Axios.get("https://api.wepost.xyz/file-uploads");
  var uploads = files.data;
  var links = response.data;
  return {
    props: {
      username,
      links,
      uploads,
    },
  };
}

export default Page;

import Head from "next/head";
import { observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";

import Layout from "../../components/layout";
import styles from "./bookPage.module.css";
import { initializeStore } from "../../stores/RootStore";

const Book = observer(({ store }) => {
  return (
    <Layout>
      <Head>
        <title>{store.bookStore.title}</title>
      </Head>
      <h1>Book</h1>
      <div className={styles["book-page__title"]}>{store.bookStore.title}</div>
      <div className={styles["book-page__cover"]}>
        <img src={store.bookStore.cover} />
      </div>
    </Layout>
  );
});

export async function getServerSideProps({ params }) {
  const store = initializeStore();

  await store.bookStore.loadBook(params.uuid);

  return { props: { initialState: getSnapshot(store) } };
}

export default Book;

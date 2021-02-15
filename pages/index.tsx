import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout";
import BookItem from "../components/bookItem";
import { initializeStore } from "../stores/RootStore";
import { observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import { values } from "mobx";

const Library = observer(({ store }) => {
  return (
    <Layout>
      <h1>LIbrary</h1>
      {values(store.libraryStore.books).map((book) => (
        <BookItem book={book} />
      ))}
    </Layout>
  );
});

export async function getServerSideProps() {
  const store = initializeStore();

  await store.libraryStore.loadBooks();

  return { props: { initialState: getSnapshot(store) } };
}
export default Library;

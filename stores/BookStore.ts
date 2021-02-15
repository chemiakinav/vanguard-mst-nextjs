import { types, flow } from "mobx-state-tree";

export const initialBookState = { title: "", cover: "" };

export const BookStore = types
  .model("BookStore", {
    isLoading: true,
    title: types.string,
    cover: types.string,
  })
  .actions((self) => {
    function markLoading(loading) {
      self.isLoading = loading;
    }

    const loadBook = flow(function* loadBook(bookId: string) {
      try {
        const json = yield fetch(
          `https://openlibrary.org/books/${bookId}.json`
        ).then((response) => response.json());
        self.title = json.title;
        self.cover = `https://covers.openlibrary.org/b/id/${json.covers[0]}-M.jpg`;
        markLoading(false);
      } catch (err) {
        console.error("Failed to load books ", err);
      }
    });

    return {
      markLoading,
      loadBook,
    };
  });

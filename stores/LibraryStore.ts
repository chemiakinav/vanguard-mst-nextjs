import { types, flow } from "mobx-state-tree";

export const BookItem = types.model("BookItem", {
  url: types.string,
  full_url: types.string,
  type: types.string,
  title: types.identifier,
  last_update: types.maybeNull(types.string),
  work_count: types.number,
  edition_count: types.number,
  ebook_count: types.number,
  picture: types.frozen({
    url: types.string,
  }),
});

export const initialLibraryState = { isLoading: false, books: {} };
// test
export const LibraryStore = types
  .model("LibraryStore", {
    isLoading: true,
    books: types.optional(types.map(BookItem), {}),
  })
  .actions((self) => {
    function markLoading(loading) {
      self.isLoading = loading;
    }

    function updateBooks(json) {
      json.forEach((bookJson) => {
        self.books.put(bookJson);
      });
    }

    const loadBooks = flow(function* loadBooks() {
      try {
        const json = yield fetch(
          "http://openlibrary.org/people/george08/lists/OL97L/seeds.json"
        ).then((res) => res.json());
        updateBooks(json.entries);
        markLoading(false);
      } catch (err) {
        console.error("Failed to load books ", err);
      }
    });

    return {
      updateBooks,
      loadBooks,
    };
  });

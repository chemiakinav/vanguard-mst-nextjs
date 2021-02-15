export default function BookItem({ book }) {
  return (
    <div className="book-container">
      <a href={book.url} className="book-container__title">
        {book.title}
      </a>
      <div className="book-container__cover">
        <img src={book.picture.url} height={100} />
      </div>
    </div>
  );
}

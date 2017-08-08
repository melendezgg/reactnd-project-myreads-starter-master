import React from 'react'
import MoveToShelfButton from './MoveToShelfButton'

// export default ({ bookId, title, authors, imageUrl, currentShelf, onMoveToShelf }) => {
export default ({ book, onMoveToShelf }) => {
  const moveBook = function (shelf) {
    onMoveToShelf(book.id, shelf)
  }

  return <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
      <MoveToShelfButton onSelectShelf={moveBook} currentShelf={book.shelf} />
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
  </div>
}
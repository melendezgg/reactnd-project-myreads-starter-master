import React from 'react'
import MoveToShelfButton from './MoveToShelfButton'

export default ({ bookId, title, authors, imageUrl, currentShelf, onMoveToShelf }) => {
  const moveBook = function (shelf) {
    onMoveToShelf(bookId, shelf)
  }

  return <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageUrl}")` }}></div>
      <MoveToShelfButton onSelectShelf={moveBook} currentShelf={currentShelf} />
    </div>
    <div className="book-title">{title}</div>
    <div className="book-authors">{authors}</div>
  </div>
}
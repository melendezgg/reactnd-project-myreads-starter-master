import React from 'react'
export default ({ onSelectShelf, currentShelf }) => {

  const moveBook = function (e) {
    onSelectShelf(e.target.options[e.target.selectedIndex].value)
  }
  debugger
  return <div className="book-shelf-changer">
    <select onChange={moveBook} value={currentShelf}>
      <option value="none" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
}


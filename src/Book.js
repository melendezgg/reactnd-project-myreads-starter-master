import React from 'react'
import MoveToShelfButton from './MoveToShelfButton'

export default ({ title, authors, imageUrl }) => <div className="book">
  <div className="book-top">
    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageUrl}")` }}></div>
    <MoveToShelfButton />
  </div>
  <div className="book-title">{title}</div>
  <div className="book-authors">{authors}</div>
</div>
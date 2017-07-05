import React from 'react'
import Book from './Book'

export default class BooksList extends React.Component {
  // state = {
  //   books: this.props.books
  // }

  render() {
    let currentlyReadingBooks = this.props.books.filter(book => book.shelf === 'currentlyReading')
    let wantToReadBooks = this.props.books.filter(book => book.shelf === 'wantToRead')
    let readBooks = this.props.books.filter(book => book.shelf === 'read')

    return <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentlyReadingBooks.map(book => <li key={book.id}><Book title={book.title} authors={book.authors.join(', ')} imageUrl={book.imageLinks.thumbnail} /></li>)}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToReadBooks.map(book => <li key={book.id}><Book title={book.title} authors={book.authors.join(', ')} imageUrl={book.imageLinks.thumbnail} /></li>)}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {readBooks.map(book => <li key={book.id}><Book title={book.title} authors={book.authors.join(', ')} imageUrl={book.imageLinks.thumbnail} /></li>)}
              </ol>
            </div>
          </div>
        </div>
      </div >
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div >
  }
}
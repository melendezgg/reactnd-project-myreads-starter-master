import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

export default class BooksList extends React.Component {
  state = {
    books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }

  getAllBooks() {
    BooksAPI
      .getAll()
      .then((data) => {
        this.setState({
          books: data,
          currentlyReadingBooks: data.filter(book => book.shelf === 'currentlyReading'),
          wantToReadBooks: data.filter(book => book.shelf === 'wantToRead'),
          readBooks: data.filter(book => book.shelf === 'read')
        })
      }
      )
  }

  componentDidMount() {
    this.getAllBooks()
  }

  moveToShelf = (bookId, shelf) => {
    BooksAPI.get(bookId)
      .then((book) => BooksAPI
        .update(book, shelf).then((books) => {
          this.getAllBooks()
        })
      )
  }

  render() {
    let currentlyReadingBooks = this.state.currentlyReadingBooks
    let wantToReadBooks = this.state.wantToReadBooks
    let readBooks = this.state.readBooks

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
                {currentlyReadingBooks.map(book => <li key={book.id}>
                  <Book bookId={book.id}
                    title={book.title}
                    authors={book.authors.join(', ')}
                    imageUrl={book.imageLinks.thumbnail}
                    currentShelf={book.shelf}
                    onMoveToShelf={this.moveToShelf} />
                </li>)}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToReadBooks.map(book => <li key={book.id}>
                  <Book bookId={book.id}
                    title={book.title}
                    authors={book.authors.join(', ')}
                    imageUrl={book.imageLinks.thumbnail}
                    currentShelf={book.shelf}
                    onMoveToShelf={this.moveToShelf} />
                </li>)}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  readBooks.map(book => <li key={book.id}>
                    <Book bookId={book.id}
                      title={book.title}
                      authors={book.authors.join(', ')}
                      imageUrl={book.imageLinks.thumbnail}
                      currentShelf={book.shelf}
                      onMoveToShelf={this.moveToShelf} />
                  </li>)}
              </ol>
            </div>
          </div>
        </div>
      </div >
      <div className="open-search">
        <Link to="/search" onClick={this.props.onClickAdd}>Add a book</Link>
      </div>
    </div >
  }
}
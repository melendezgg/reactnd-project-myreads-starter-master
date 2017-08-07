import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BooksSearch extends React.Component {
  state = {
    books: [],
    query: ''
  }

  searchBooks() {
    let query = this.state.query
    if (query.length > 0) {
      BooksAPI.search(query, 20).then(data => {
        this.setState({ books: data })
      })
    } else
      this.setState({
        books: []
      })
  }

  moveToShelf = (bookId, shelf) => {
    BooksAPI.get(bookId)
      .then((book) => BooksAPI
        .update(book, shelf).then((books) => {
          this.searchBooks()
        })
      )
  }

  searchInputChange = (e) => {
    let query = e.target.value
    this.setState({ query: query })
    this.searchBooks()
  }

  render() {
    return <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text"
            placeholder="Search by title or author"
            onChange={this.searchInputChange} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books.length > 0 &&
            this.state.books.map((book) => <li key={book.id}>
              <Book bookId={book.id}
                title={book.title}
                authors={book.authors && book.authors.join(', ')}
                imageUrl={book.imageLinks.thumbnail}
                currentShelf={book.shelf}
                onMoveToShelf={this.moveToShelf} />
            </li>
            )}
        </ol>
      </div>
    </div>
  }
}

export default BooksSearch
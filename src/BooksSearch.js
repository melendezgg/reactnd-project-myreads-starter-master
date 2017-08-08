import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BooksSearch extends React.Component {
  state = {
    search: [],
    query: ''
  }

  searchBooks = () => {
    let query = this.state.query

    if (query.length > 0) {
      BooksAPI
        .getAll()
        .then((data) => {
          let myBooks = data.map(b => b.id)
          BooksAPI.search(query, 20).then(searchBooks => {
            searchBooks.forEach(book => {
              if (myBooks.includes(book.id)) {
                book.shelf = data.filter(b => b.id === book.id)[0].shelf
              }
            })

            this.setState({ search: searchBooks })
          })
        })
    } else
      this.setState({
        search: []
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
          {this.state.search.length > 0 &&
            this.state.search.map((book) => <li key={book.id}>
              <Book book={book}
                onMoveToShelf={this.moveToShelf} />
            </li>
            )}
        </ol>
      </div>
    </div>
  }
}

export default BooksSearch
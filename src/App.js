import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { Link, Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
      books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      console.log(data);
      this.setState({books: data});
    })
  }

  render() {

      const { books } = this.state;

      const currentlyReadingBooks = books.filter((book) => book.shelf === 'currentlyReading');
      const wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead');
      const readBooks = books.filter((book) => book.shelf === 'read');

    return (
      <div className="app">
          <Route path="/search" render={() => (
              <div className="search-books">
                  <div className="search-books-bar">
                      <Link to="/" className="close-search">Close</Link>
                      <div className="search-books-input-wrapper">
                          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                          <input type="text" placeholder="Search by title or author"/>

                      </div>
                  </div>
                  <div className="search-books-results">
                      <ol className="books-grid"></ol>
                  </div>
              </div>
          )} />

          <Route exact path="/" render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>

                  <BookShelf books={currentlyReadingBooks} title="Currently Reading"/>
                  <BookShelf books={wantToReadBooks} title="Want To Read"/>
                  <BookShelf books={readBooks} title="Read"/>

                  <div className="open-search">
                      <Link to="/search" className="open-search">
                          Add a book
                      </Link>
                      {/*<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>*/}
                  </div>
              </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
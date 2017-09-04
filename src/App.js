import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import {Link, Route} from 'react-router-dom'
import './App.css'
import Book from "./Book";

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        this.getAllBooks();
    }

    // retrieves all books from api
    getAllBooks = () => {
        BooksAPI.getAll().then((data) => {
            this.setState({books: data});
        })
    };

    // update shelf info for single book
    updateBook = (book, event) => {
        const shelf = event.target.value;
        BooksAPI.update(book, shelf).then((result) => {
            this.getAllBooks();
        })
    };

    // move book from one shelf to another or delete from book shelf
    moveBookToShelf = (book, event) => {
        const shelf = event.target.value;
        BooksAPI.update(book, shelf).then((result) => {
            // not worrying about update call result
        })
    };

    // search for books using query text
    searchBooks = (event) => {
        BooksAPI.search(event.target.value, 20).then((result) => {
            // reset books array
            this.setState({books: []});
            if (result && !result.error) {
                // set books state in case of success response
                this.setState({books: result});
            }
        })
    };

    render() {

        const {books} = this.state;

        const currentlyReadingBooks = books.filter((book) => book.shelf === 'currentlyReading');
        const wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead');
        const readBooks = books.filter((book) => book.shelf === 'read');

        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link to="/" className="close-search" onClick={() => this.getAllBooks()}>Close</Link>
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author" onChange={this.searchBooks}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {books &&
                                books.map((book, index) => (
                                    <Book key={index} index={index} data={book} updateBook={this.moveBookToShelf}/>
                                ))
                                }
                            </ol>
                        </div>
                    </div>
                )}/>

                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>

                        <BookShelf books={currentlyReadingBooks} title="Currently Reading"
                                   updateBook={this.updateBook}/>
                        <BookShelf books={wantToReadBooks} title="Want To Read" updateBook={this.updateBook}/>
                        <BookShelf books={readBooks} title="Read" updateBook={this.updateBook}/>

                        <div className="open-search">
                            <Link to="/search" className="open-search" onClick={() => this.setState({books:[]})}>
                                Add a book
                            </Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp

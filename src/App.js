import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import {Link, Route} from 'react-router-dom'
import './App.css'

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

    render() {

        const {books} = this.state;

        const currentlyReadingBooks = books.filter((book) => book.shelf === 'currentlyReading');
        const wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead');
        const readBooks = books.filter((book) => book.shelf === 'read');

        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <Search booksFromShelf={books} getAllBooks={this.getAllBooks}/>
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

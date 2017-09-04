import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import Header from './Header'
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
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                book.shelf = shelf;

                // Filter out the book and append it to the end of the list
                // so it appears at the end of whatever shelf it was added to.
                this.setState(state => ({
                    books: state.books.filter(b => b.id !== book.id).concat([book])
                }))
            })
        }
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
                        <Header/>

                        <BookShelf books={currentlyReadingBooks} title="Currently Reading"
                                   updateBook={this.updateBook}/>
                        <BookShelf books={wantToReadBooks} title="Want To Read" updateBook={this.updateBook}/>
                        <BookShelf books={readBooks} title="Read" updateBook={this.updateBook}/>

                        <div className="open-search">
                            <Link to="/search" className="open-search">
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

import React, {Component} from 'react';
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import './App.css';

class Search extends Component {

    state = {
        books: []
    };

    componentWillUnmount() {
        this.setState({books: []});
        this.props.getAllBooks();
    }

    // search for books using query text
    searchBooks = (event) => {
        BooksAPI.search(event.target.value, 20).then((result) => {
            // reset books array
            this.setState({books: []});
            if (result && !result.error) {
                // set books state in case of success response
                // filter books based on book id and map shelf info to book
                const {booksFromShelf} = this.props;
                result.map(book => (
                    booksFromShelf.filter((bookFromShelf) => bookFromShelf.id === book.id)
                        .map(bookFromShelf => book.shelf = bookFromShelf.shelf)
                ));
                this.setState({books: result});
            }
        })
    };

    // move book from one shelf to another or delete from book shelf
    moveBookToShelf = (book, event) => {
        const shelf = event.target.value;
        BooksAPI.update(book, shelf).then((result) => {
            // not worrying about update call result
        })
    };

    render() {

        const {books} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
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
        )
    }
}

export default Search;
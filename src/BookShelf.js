import React, {Component} from 'react';
import './App.css';

class BookShelf extends Component {


    render() {

        const { books, title } = this.props;

        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{title}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map((book, index) => (
                                    <li key={index}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 170, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value={book.shelf}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            {book.authors.map((author, index) => (
                                                <div key={index} className="book-authors">{author}</div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;
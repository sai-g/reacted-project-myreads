import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './App.css';

class BookShelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    render() {

        const {books, title, updateBook} = this.props;

        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        {title && <h2 className="bookshelf-title">{title}</h2>}
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books && books.length > 0 ? books.map((book, index) => (
                                    <Book key={index} index={index} data={book} updateBook={updateBook}/>
                                )) :
                                <li>
                                    You do not have any books in this shelf, please click ADD button to add books to this shelf
                                </li>
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;
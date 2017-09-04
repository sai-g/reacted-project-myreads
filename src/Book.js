import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Book extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    state = {
        shelf: 'None'
    };

    componentDidMount() {
        this.setState({shelf: this.props.data.shelf ? this.props.data.shelf : 'None'})
    }

    /**
     * this method helps to move around book from search page
     * helps in selecting correct book shelf value from dropdown
     * @param book
     * @param event
     */
    updateBookShelf(book, event) {
        this.setState({shelf: event.target.value});
        this.props.updateBook(book, event)
    }

    render() {

        const {data, index} = this.props;

        return (
            <li key={index}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 170,
                            backgroundImage: 'url(' + data.imageLinks.thumbnail + ')'
                        }}/>
                        <div className="book-shelf-changer">
                            <select value={this.state.shelf} onChange={(event) => this.updateBookShelf(data, event)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{data.title}</div>
                    {data.authors && data.authors.length > 0 && data.authors.map((author, index) => (
                        <div key={index} className="book-authors">{author}</div>
                    ))}
                </div>
            </li>
        )
    }
}

export default Book;
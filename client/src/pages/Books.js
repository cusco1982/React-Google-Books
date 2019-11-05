import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import SearchResults from "../components/SearchResults"


import SearchCard from "../components/SearchCard";
// import SearchResult from "../components/SearchResult";
import SaveCard from "../components/SaveResult";
import BookItemCard from "../components/BookItemCard";
// import API from "../utils/API";


class Books extends Component {
  state = {
    results: [],
    // title: "",
    // author: "",
    // synopsis: "",
    savedBooks:[],
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
        <div>
            {window.location.pathname === "/" ?
                <div>
                    <SearchCard
                        value={this.state.bookSearch}
                        onChange={this.handleInputChange}
                        onClick={this.handleSearch}
                    />

                    <SearchResult>
                            {this.state.results.length ? (
                                this.state.results.map( (book, i) => {
                                    return (
                                        <BookItemCard
                                            key={book.id}
                                            title={book.volumeInfo.title}
                                            author={(book.volumeInfo.authors) ? (book.volumeInfo.authors[0]) : ("Anonymous")}
                                            href={book.volumeInfo.previewLink}
                                            thumbnail={(book.volumeInfo.imageLinks) ? (book.volumeInfo.imageLinks.thumbnail) : ("https://iconutopia.com/wp-content/uploads/2016/06/rocket-book.png")}
                                            description={book.volumeInfo.description}
                                            save={this.handleSave}
                                            index={i}
                                        />
                                    )
                                })
                            ) : (<h3>No Results Found.</h3>)}
                    </SearchResult>
                </div>
                :
                    <SaveCard>
                        {this.state.savedBooks.length ? (
                            this.state.savedBooks.map((book, i) => {
                                return (
                                    <BookItemCard
                                        key={book._id}
                                        title={book.title}
                                        author={book.author}
                                        href={book.link}
                                        thumbnail={(book.thumbnail) ? (book.thumbnail) : ("https://iconutopia.com/wp-content/uploads/2016/06/rocket-book.png")}
                                        description = {book.description}
                                        delete={this.handleDelete}
                                        index={i}
                                    />
                                )
                            })
                        ) : (<h3>No Saved Books</h3>)}
                    </SaveCard>
            }
        </div>
    )
}
}

export default Books;
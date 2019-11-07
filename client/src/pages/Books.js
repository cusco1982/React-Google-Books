import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import SearchResults from "../components/SearchResults"


import Form from "../components/Form";
// import SearchResult from "../components/SearchResult";
import SaveCard from "../components/SaveResult";
import BookCard from "../components/BookCard";
// import API from "../utils/API";


class Books extends Component {
  state = {
    results: [],
    // title: "",
    // author: "",
    // synopsis: "",
    savedBooks: [],
    bookSearch:""
  };

  componentDidMount() {
    API.getSavedBooks().then(res => {
      this.setState({
        savedBooks: res.data
      });
    });
  }

  handleSearch = event => {
    event.preventDefault();

    if (this.state.bookSearch) {
      API.searchBooks(this.state.bookSearch).then(res =>
        this.setState({
          results: res.data.items
        })
      ).catch(err => console.log(err));
    };
  };

  handleInputChange = event => {
    const value = event.target.value;

    this.setState({
      bookSearch: value
    });
  };

  handleSave = event => {
    const bookIndex = event.target.attributes.getNamedItem("data-index").value;
    const saveBook = this.state.results[bookIndex];
    console.log(saveBook);

    const bookData = {
      title: saveBook.volumeInfo.title,
      link: saveBook.volumeInfo.previewLink,
      thumbnail: saveBook.volumeInfo.imageLinks.thumbnail,
      author: saveBook.volumeInfo.authors[0],
      description: saveBook.volumeInfo.description,
      key: saveBook.id
    };

    API.saveBook(bookData.key, bookData)
      .then(API.getSavedBooks()
        .then(res => {
          this.setState({
            savedBooks: res.data
          })
          console.log("State", this.state.savedBooks);
          console.log("Length", this.state.savedBooks.length);
        })
      )
  };


  handleDelete = event => {
    const bookIndex = event.target.attributes.getNamedItem("data-index").value;
    const deleteBook = this.state.savedBooks[bookIndex];
    console.log(deleteBook._id);

    API.deleteBook(deleteBook._id)
      .then(window.location.reload())
  };


  render() {
    return (
      <div>
        {window.location.pathname === "/" ?
          <div>
            <Form
              value={this.state.bookSearch}
              onChange={this.handleInputChange}
              onClick={this.handleSearch}
            />

            <SearchResults>
              {this.state.results.length ? (
                this.state.results.map((book, i) => {
                  return (
                    <BookCard
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
            </SearchResults>
          </div>
          :
          <SaveCard>
            {this.state.savedBooks.length ? (
              this.state.savedBooks.map((book, i) => {
                return (
                  <BookCard
                    key={book._id}
                    title={book.title}
                    author={book.author}
                    href={book.link}
                    thumbnail={(book.thumbnail) ? (book.thumbnail) : ("https://iconutopia.com/wp-content/uploads/2016/06/rocket-book.png")}
                    description={book.description}
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
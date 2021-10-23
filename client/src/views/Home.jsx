import { Component } from 'react';
import { listBooks } from './../services/library-api';

class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    listBooks()
      .then((books) => {
        this.setState({ books });
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong loading your books');
      });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Library</h1>
        <ul>
          {this.state.books.map((book) => (
            <li key={book.title}>
              <strong>{book.title}</strong> by <em>{book.author}</em>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomeView;

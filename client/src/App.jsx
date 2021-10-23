import { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import HomeView from './views/Home';
import SignUpView from './views/SignUp';
import SignInView from './views/SignIn';
import { signOut, loadAuthenticatedUser } from './services/library-api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    loadAuthenticatedUser()
      .then((user) => {
        if (user) {
          this.setState({ user });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAuthenticationChange = (user) => {
    this.setState({ user });
  };

  handleSignOut = () => {
    signOut().then(() => {
      this.setState({ user: null });
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <Link to="/">Library</Link>
            {(this.state.user && (
              <>
                <span>Welcome {this.state.user.name}</span>
                <button onClick={this.handleSignOut}>Sign Out</button>
              </>
            )) || (
              <>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/sign-in">Sign In</Link>
              </>
            )}
          </nav>
          <Switch>
            <Route path="/" component={HomeView} exact />
            <Route
              path="/sign-up"
              render={(props) => (
                <SignUpView
                  {...props}
                  onAuthenticationChange={this.handleAuthenticationChange}
                />
              )}
              exact
            />
            <Route
              path="/sign-in"
              render={(props) => (
                <SignInView
                  {...props}
                  onAuthenticationChange={this.handleAuthenticationChange}
                />
              )}
              exact
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

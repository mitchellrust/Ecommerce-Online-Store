import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';
import UserProvider from './services/UserProvider';

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </UserProvider>
    );
  }
}
export default App;
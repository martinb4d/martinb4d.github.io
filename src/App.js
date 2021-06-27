import './styles/App.css'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/HomePage/Home'
import Footer from './components/pages/Footer/Footer'
import Poquedex from './components/pages/Poquedex/Poquedex'
import Poqatch from './components/pages/Poqatch/Poqatch';
import Poquet from './components/pages/Poquet/Poquet';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://poquemon-gql.herokuapp.com/',
  cache: new InMemoryCache()
});
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Navbar />
      <Switch>
        <Route
          path='/' exact component={Home} />
        <Route
          path='/Poquedex' exact component={Poquedex} />
        <Route
          path='/Poqatch' exact component={Poqatch} />
        <Route
          path='/Poquet' exact component={Poquet} />
      </Switch>
      <Route
        path='/' exact component={Footer} />
      </Router>
      
    </ApolloProvider>
  );
}

export default App;

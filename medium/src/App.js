import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import PeopleCount from './components/PeopleCount';

function App() {
  const client = new ApolloClient({
    uri: 'https://api.datacake.co/graphql/',
    cache: new InMemoryCache(),
    headers: {
      authorization: 'Token dc1e418843f2b9d4c77933d96da47afd1fce6575',
    },
  })
  return (
    <ApolloProvider client={client}>
    <div>
        <PeopleCount />
    </div>
    </ApolloProvider>
  );
}

export default App;

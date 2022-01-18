import './App.css';
import './css/movie-row.css';
import './css/movie-banner.css';
import './css/nav.css';
import './css/login.css'
import './css/signin.css'
import './css/profile.css'
import './css/search.css'
import Main from './components/Main';
import { Provider } from 'react-redux';
import configureStore from './redux/store'

function App() {
  return (
    <div className="app">
     <Provider store={configureStore}>
        <Main/>
      </Provider>
    </div>
  );
}

export default App;

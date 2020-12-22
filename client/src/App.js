import './App.css';

// Components
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import SearchArea from './components/SearchArea';

function App() {
  return (
    <div className="App">
		<section className="homepage-section">
			<HomePage />
		</section>
		<section className="nav-container">
			<Nav />
		</section>
		<section className="search-area-container">
			<SearchArea />
		</section>
    </div>
  );
}

export default App;

import './App.scss';

// Components
import Nav from './components/Nav/Nav';
import HomePage from './components/HomePage';
import SearchArea from './components/SearchArea/SearchArea';

function App() {
  return (
    <div className="App">
		<section className="homepage-section">
			<HomePage />
		</section>
		<section className="nav-container">
			<Nav />
		</section>
		<section className="searcharea-section">
			<SearchArea />
		</section>
    </div>
  );
}

export default App;

import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1 className="project-title">Star Wars Planet Search</h1>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;

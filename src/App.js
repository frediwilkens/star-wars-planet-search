import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>Star Wars Planet Search</h1>
      <Table />
    </Provider>
  );
}

export default App;

import './App.css';
import MainView from './components/MainView';
import NavBar from './components/NavBar';
import Options from './components/Options';

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainView />
      <Options />
    </div>
  );
}

export default App;

import './App.css';
import MainView from './components/MainView';
import NavBar from './components/NavBar';
import Options from './components/Options';
import Recents from './components/Recents';
import Footer from './components/Footer';
import WhyUs from './components/WhyUs';

function App() {
  const RECENT_POSTS_URL = "http://localhost:3030/recent-posts";
  const DERLIVERED_POSTS_URL = "http://localhost:3030/delivered-posts";

  return (
    <div className="App">
      <NavBar />
      <MainView />
      <Options />
      <WhyUs/>
      {/* <div className="seperate"></div> */}
      <Recents URL={RECENT_POSTS_URL} done={false} />
      <div className="seperate"></div>
      <Recents URL={DERLIVERED_POSTS_URL} done={true} />
      <Footer/>
    </div>
  );
}

export default App;

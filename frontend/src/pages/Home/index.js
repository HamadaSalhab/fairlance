import React from 'react'
import MainView from './Components/MainView';
import NavBar from '../../components/NavBar';
import Options from './Components/Options';
import Recents from '../../components/Recents';
import Footer from '../../components/Footer';
import WhyUs from './Components/WhyUs';
const RECENT_POSTS_URL = "http://localhost:3030/recent-posts";
const DERLIVERED_POSTS_URL = "http://localhost:3030/delivered-posts";

const Home = () => {
    return (
        <div >
            <NavBar />
            <MainView />
            <Options />
            <WhyUs />
            <Recents URL={RECENT_POSTS_URL} done={false} />
            <div className="seperate"></div>
            <Recents URL={DERLIVERED_POSTS_URL} done={true} />
            <Footer />
        </div>
    )
}

export default Home
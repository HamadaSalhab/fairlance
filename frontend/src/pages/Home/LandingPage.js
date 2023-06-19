import React from 'react'
import MainView from './MainView';
import NavBar from '../../components/NavBar';
import Options from './Options';
import Recents from '../../components/Recents';
import Footer from '../../components/Footer';
import WhyUs from './WhyUs';
const RECENT_POSTS_URL = "http://localhost:3030/recent-posts";
const DERLIVERED_POSTS_URL = "http://localhost:3030/delivered-posts";

const LandingPage = () => {
    return (
        <div className="App">
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

export default LandingPage
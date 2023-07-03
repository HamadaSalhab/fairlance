import React from 'react'
import MainView from './Components/MainView';
import NavBar from '../../components/NavBar';
import Options from './Components/Options';
import Recents from '../../components/Recents';
import Footer from '../../components/Footer';
import WhyUs from './Components/WhyUs';
const RECENT_POSTS_URL = process.env.REACT_APP_RECENT_POSTS || "http://localhost:3030/delivered-posts";

const Home = () => {
    return (
        <div >
            <NavBar />
            <MainView />
            <Options />
            <WhyUs />
            <Recents URL={RECENT_POSTS_URL} done={false} />
            <Footer />
        </div>
    )
}

export default Home
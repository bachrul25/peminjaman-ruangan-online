import React from 'react';
import './index.css';
import '../../assets/css/global.css'
import NavBar from '../../components/NavBar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import About from '../../components/About';
import Top from '../../components/Top';
import Testimonials from '../../components/Testimonials';
import Newsletter from '../../components/Newsletter';
import Partner from '../../components/Partner';
import Footer from '../../components/Footer';

function Home() {
  return (
    <div className="home">
        <NavBar />

        <Hero />

        <Features />

        <About />

        <Top />

        <Testimonials />

        <Partner />

        <Footer />
    </div>
  );
}

export default Home;
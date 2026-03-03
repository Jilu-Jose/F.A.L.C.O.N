import React, { useEffect } from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import ArchitectureSection from '../components/landing/ArchitectureSection';
import Footer from '../components/landing/Footer';

const Landing = () => {
    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <FeaturesSection />
            <ArchitectureSection />
            <Footer />
        </div>
    );
};

export default Landing;

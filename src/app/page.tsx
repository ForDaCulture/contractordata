/*
================================================================================
File: src/app/page.tsx
Description: This is the main page component for your landing page. It assembles
all the different sections.
================================================================================
*/
"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Testimonials } from "@/components/Testimonials";
import { UploadForm } from "@/components/UploadForm";
import { Footer } from "@/components/Footer";

// Data definitions moved here for clarity in a single-page app structure
const featuresData = [
    { icon: "DollarSign", title: "Identify Job Profitability", description: "Pinpoint which job types and clients are most profitable." },
    { icon: "Clock", title: "Optimize Crew Time", description: "Understand travel vs. on-site time to schedule more effectively." },
    { icon: "Wrench", title: "Track Material Trends", description: "Anticipate material needs and reduce inventory overhead." },
    { icon: "BarChart3", title: "Interactive Dashboards", description: "Explore your business performance with easy-to-understand visual reports." }
];

const testimonialsData = [
    { quote: "This analysis cut our job costs by 15%. The insights on crew travel time alone were worth it.", name: "John D.", company: "ProBuild Construction" },
    { quote: "Seeing our profit margins broken down by job type was a game-changer. We stopped taking on jobs that were secretly losing us money.", name: "Maria G.", company: "Gomez & Sons Contracting" }
];


export default function Home() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleScroll = (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
            <Navbar onScroll={handleScroll} onToggleTheme={toggleTheme} theme={theme} />
            <main>
                <HeroSection onScroll={handleScroll} />
                <Features data={featuresData} />
                <DashboardPreview />
                <Testimonials data={testimonialsData} />
                <UploadForm />
            </main>
            <Footer />
        </div>
    );
}
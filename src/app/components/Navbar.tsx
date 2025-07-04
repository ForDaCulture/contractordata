/*
================================================================================
File: src/components/Navbar.tsx
Description: The navigation bar component.
================================================================================
*/
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming shadcn setup
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Assuming shadcn setup

export const Navbar = ({ onScroll, onToggleTheme, theme }: { onScroll: (id: string) => void; onToggleTheme: () => void; theme: string; }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [{ id: '#features', label: 'Features' }, { id: '#dashboard', label: 'Dashboard' }, { id: '#testimonials', label: 'Testimonials' }];

    const handleLinkClick = (id: string) => {
        onScroll(id);
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <a onClick={() => onScroll('#home')} className="flex items-center gap-2 cursor-pointer">
                    <Wrench className="h-6 w-6 text-blue-600" />
                    <span className="font-bold text-lg text-slate-900 dark:text-white font-display">Contractor Insights</span>
                </a>
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                        <a key={link.id} onClick={() => handleLinkClick(link.id)} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer">{link.label}</a>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <Button onClick={onToggleTheme} variant="ghost" size="icon">
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Button onClick={() => onScroll('#upload')} className="hidden md:inline-flex">Get Free Analysis</Button>
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                             <div className="flex justify-between items-center mb-8">
                                <h2 className="font-bold text-lg font-display">Menu</h2>
                                <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon"><X className="h-6 w-6" /></Button>
                            </div>
                            <nav className="flex flex-col space-y-4">
                                {navLinks.map(link => (
                                    <a key={link.id} onClick={() => handleLinkClick(link.id)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white cursor-pointer">{link.label}</a>
                                ))}
                                <Button onClick={() => handleLinkClick('#upload')} className="w-full mt-4">Get Free Analysis</Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};
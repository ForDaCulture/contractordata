/*
================================================================================
File: src/components/Footer.tsx
================================================================================
*/
"use client";
export const Footer = () => (
    <footer className="py-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Contractor Data Insights. All rights reserved.
        </div>
    </footer>
);
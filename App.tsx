import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Menu, X, DollarSign, Clock, BarChart3, UploadCloud, Star, Sun, Moon, LoaderCircle } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { GoogleGenAI } from "@google/genai";

// =================================================================================
// TYPE DEFINITIONS
// =================================================================================
type Feature = {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
};
type Testimonial = {
    quote: string;
    name: string;
    company: string;
};
const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("A valid email is required."),
  file: z.instanceof(File).refine(file => file.size > 0, "A file is required."),
});
type FormValues = z.infer<typeof formSchema>;


// =================================================================================
// DATA
// =================================================================================
const featuresData: Feature[] = [
    { icon: DollarSign, title: "Identify Job Profitability", description: "Pinpoint which job types and clients are most profitable." },
    { icon: Clock, title: "Optimize Crew Time", description: "Understand travel vs. on-site time to schedule more effectively." },
    { icon: Wrench, title: "Track Material Trends", description: "Anticipate material needs and reduce inventory overhead." },
    { icon: BarChart3, title: "Interactive Dashboards", description: "Explore your business performance with easy-to-understand visual reports." }
];
const testimonialsData: Testimonial[] = [
    { quote: "This analysis cut our job costs by 15%. The insights on crew travel time alone were worth it.", name: "John D.", company: "ProBuild Construction" },
    { quote: "Seeing our profit margins broken down by job type was a game-changer. We stopped taking on jobs that were secretly losing us money.", name: "Maria G.", company: "Gomez & Sons Contracting" }
];


// =================================================================================
// UI COMPONENTS
// =================================================================================
const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
    <button className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${className}`} {...props}>{children}</button>
);
const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm ${className}`} {...props}>{children}</div>
);


// =================================================================================
// PAGE SECTIONS
// =================================================================================
const Navbar = ({ onScroll, onToggleTheme, theme }: { onScroll: (id: string) => void; onToggleTheme: () => void; theme: string; }) => {
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
                    <Button onClick={onToggleTheme} className="bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full text-slate-600 dark:text-slate-400">
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                    <Button onClick={() => onScroll('#upload')} className="hidden md:inline-flex bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">Get Free Analysis</Button>
                    <Button onClick={() => setIsMenuOpen(true)} className="md:hidden bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full text-slate-600 dark:text-slate-400"><Menu className="h-6 w-6" /></Button>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-40 bg-black/60" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-slate-950 z-50 p-6">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="font-bold text-lg font-display">Menu</h2>
                                <Button onClick={() => setIsMenuOpen(false)} className="bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full"><X className="h-6 w-6" /></Button>
                            </div>
                            <nav className="flex flex-col space-y-4">
                                {navLinks.map(link => (
                                    <a key={link.id} onClick={() => handleLinkClick(link.id)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white cursor-pointer">{link.label}</a>
                                ))}
                                <Button onClick={() => handleLinkClick('#upload')} className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 py-3">Get Free Analysis</Button>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

const HeroSection = ({ onScroll }: { onScroll: (id: string) => void }) => (
    <section id="home" className="w-full py-20 lg:py-32">
        <div className="container mx-auto text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 font-display">Turn Your Job Data Into Profit</h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10">Stop guessing. We analyze your job data to find hidden cost savings and efficiency gains, empowering you to make smarter business decisions.</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => onScroll('#upload')} className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg">Get Your Free Analysis</Button>
                    <Button onClick={() => onScroll('#features')} className="bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-3 text-lg">Learn More</Button>
                </div>
            </motion.div>
        </div>
    </section>
);

const Features = ({ data }: { data: Feature[] }) => (
    <section id="features" className="w-full py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display">Actionable Insights, Not Just Data</h2>
                <p className="max-w-2xl mx-auto mt-4 text-slate-600 dark:text-slate-400">We transform your raw spreadsheets into clear, strategic advantages.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.map((feature, index) => (
                    <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <Card className="text-center p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-blue-500/10">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4"><feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" /></div>
                            <h3 className="text-xl font-bold mb-2 font-display">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const DashboardPreview = () => (
    <section id="dashboard" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display">Your Business at a Glance</h2>
                <p className="max-w-2xl mx-auto mt-4 text-slate-600 dark:text-slate-400">Our dashboards are designed for clarity, giving you the power to make informed decisions quickly.</p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <Card className="overflow-hidden shadow-2xl">
                    <img src="https://placehold.co/1200x783/0f172a/e0e7ff/png?text=Job+Profitability+Dashboard&font=poppins" alt="Contractor Data Insights Dashboard Preview" className="w-full h-auto object-cover" />
                </Card>
            </motion.div>
        </div>
    </section>
);

const Testimonials = ({ data }: { data: Testimonial[] }) => (
    <section id="testimonials" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display">Trusted by Contractors Like You</h2>
                <p className="max-w-2xl mx-auto mt-4 text-slate-600 dark:text-slate-400">Don't just take our word for it. Here's what our clients are saying.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {data.map((testimonial, index) => (
                    <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <Card className="h-full flex flex-col p-6">
                            <div className="flex mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}</div>
                            <blockquote className="italic text-slate-700 dark:text-slate-300 flex-grow">“{testimonial.quote}”</blockquote>
                            <footer className="mt-4"><p className="font-semibold">{testimonial.name}</p><p className="text-sm text-slate-500">{testimonial.company}</p></footer>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const UploadForm = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
        mode: "onChange"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const file = watch("file");

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsSubmitting(true);
        setAnalysisResult(null);
        setErrorMessage(null);
        
        try {
            if (!process.env.API_KEY) {
                throw new Error("API key is not configured.");
            }
            const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
            
            const fileContent = await data.file.text();
            
            const prompt = `Analyze the following contractor job data from a CSV file. The data is: \n\n${fileContent}\n\nPlease provide exactly 3 key actionable insights from this data. Focus on potential cost savings, efficiency improvements, or profitability analysis. Present these insights as a clear, concise, bulleted list.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-preview-04-17',
                contents: prompt,
            });
            
            setAnalysisResult(response.text);

        } catch (error) {
            console.error("Error during analysis:", error);
            setErrorMessage("An error occurred during analysis. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="upload" className="w-full py-16 lg:py-24">
            <div className="container mx-auto px-4 flex justify-center">
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full max-w-2xl">
                    <Card className="shadow-xl">
                        <div className="p-8">
                            <div className="text-center mb-6">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4"><UploadCloud className="h-6 w-6 text-blue-600 dark:text-blue-400" /></div>
                                <h2 className="text-3xl font-bold font-display">Get Your Free Sample Analysis</h2>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">Upload your job data (.csv) and we'll send you 3 key insights. Confidential and secure.</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                        <input id="fullName" {...register("fullName")} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                        <input id="email" type="email" {...register("email")} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Job Data (CSV file)</label>
                                    <label htmlFor="file-upload" className="mt-1 flex justify-center w-full px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-md cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            <div className="flex text-sm text-slate-600 dark:text-slate-400">
                                                <p className="pl-1">
                                                    {file && file[0] ? <span className="font-semibold text-blue-600">{file[0].name}</span> : 'Click to upload a file'}
                                                </p>
                                                <input id="file-upload" type="file" accept=".csv" {...register("file")} className="sr-only" />
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-500">CSV up to 10MB</p>
                                        </div>
                                    </label>
                                    {errors.file && <p className="text-sm text-red-500 mt-1">{(errors.file as any).message}</p>}
                                </div>
                                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base" disabled={isSubmitting}>
                                    {isSubmitting ? <LoaderCircle className="animate-spin mr-2" /> : null}
                                    {isSubmitting ? 'Analyzing...' : 'Upload and Get Insights'}
                                </Button>
                            </form>
                            {errorMessage && (
                                <div className="mt-4 text-center p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md">
                                    {errorMessage}
                                </div>
                            )}
                            {analysisResult && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                                    <Card className="p-6 bg-slate-50 dark:bg-slate-800/50">
                                        <h3 className="text-2xl font-bold font-display mb-4">Your Insights ✨</h3>
                                        <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: analysisResult.replace(/\n/g, '<br />') }} />
                                    </Card>
                                </motion.div>
                            )}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="py-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Contractor Data Insights. All rights reserved.
        </div>
    </footer>
);


// =================================================================================
// MAIN APP COMPONENT
// =================================================================================
export default function App() {
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

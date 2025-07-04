/*
================================================================================
File: src/components/UploadForm.tsx
================================================================================
*/
"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("A valid email is required."),
  file: z.instanceof(FileList).refine(files => files.length > 0, "A file is required."),
});
type FormValues = z.infer<typeof formSchema>;

export const UploadForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        alert('Form submitted successfully!'); // Replace with a proper toast notification
        reset();
    };

    return (
        <section id="upload" className="w-full py-16 lg:py-24">
            <div className="container mx-auto px-4 flex justify-center">
                <Card className="shadow-xl w-full max-w-2xl">
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4"><UploadCloud className="h-6 w-6 text-blue-600 dark:text-blue-400" /></div>
                            <h2 className="text-3xl font-bold font-display">Get Your Free Sample Analysis</h2>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Upload your job data (.csv) and we'll send you 3 key insights. Confidential and secure.</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" {...register("fullName")} className="mt-1" />
                                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" {...register("email")} className="mt-1" />
                                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="file">Job Data (CSV file)</Label>
                                <Input id="file" type="file" accept=".csv" {...register("file")} className="mt-1" />
                                {errors.file && <p className="text-sm text-red-500 mt-1">{errors.file.message}</p>}
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base" disabled={isSubmitting}>
                                {isSubmitting ? <LoaderCircle className="animate-spin mr-2" /> : null}
                                {isSubmitting ? 'Analyzing...' : 'Upload and Get Insights'}
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </section>
    );
};
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Budi Santoso",
            position: "CEO, PT Logistik Nusantara",
            content: "SupplyChain Pro mengubah cara kami mengelola distribusi. Efisiensi meningkat 40% dalam 3 bulan!",
            rating: 5
        },
        {
            name: "Sari Dewi",
            position: "Operations Manager, CV Maju Express",
            content: "Interface yang user-friendly dan fitur tracking real-time sangat membantu operasional harian kami.",
            rating: 5
        },
        {
            name: "Ahmad Rahman",
            position: "Logistics Director, UD Berkah Jaya",
            content: "Dashboard analytics memberikan insight yang sangat valuable untuk decision making.",
            rating: 5
        }
    ];

    // Testimonial rotation
    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Apa Kata Klien Kami?</h2>
                <p className="text-xl text-gray-600">Dipercaya oleh perusahaan terkemuka di Indonesia</p>
            </div>
            
            <div className="relative">
                <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-0">
                    <CardContent className="p-12 text-center">
                        <div className="flex justify-center mb-6">
                            {[1,2,3,4,5].map(i => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <blockquote className="text-2xl text-gray-700 font-medium mb-8 leading-relaxed">
                            "{testimonials[currentTestimonial].content}"
                        </blockquote>
                        <div>
                            <p className="font-semibold text-gray-900 text-lg">
                            {testimonials[currentTestimonial].name}
                            </p>
                            <p className="text-gray-600">{testimonials[currentTestimonial].position}</p>
                        </div>
                    </CardContent>
                </Card>
                
                <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentTestimonial(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
        </section>
    );
};

export default TestimonialSection;
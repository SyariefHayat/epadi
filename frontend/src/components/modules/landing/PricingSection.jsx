import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const PricingSection = () => {
    const pricingPlans = [
        {
            name: "Starter",
            price: "Rp 299K",
            period: "/bulan",
            features: ["Hingga 100 pengiriman/bulan", "Basic tracking", "2 pengguna", "Email support"],
            isPopular: false
        },
        {
            name: "Professional",
            price: "Rp 699K",
            period: "/bulan",
            features: ["Hingga 1000 pengiriman/bulan", "Advanced analytics", "10 pengguna", "Priority support", "API access"],
            isPopular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            features: ["Unlimited pengiriman", "Custom integrations", "Unlimited pengguna", "24/7 dedicated support", "On-premise option"],
            isPopular: false
        }
    ];

    return (
        <section id="pricing" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Paket Harga Yang Fleksibel</h2>
                    <p className="text-xl text-gray-600">Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${
                        plan.isPopular ? 'ring-2 ring-blue-500 scale-105' : ''
                        }`}>
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                                        Paling Populer
                                    </Badge>
                                </div>
                            )}
                            <CardContent className="p-8">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-600">{plan.period}</span>
                                    </div>
                                </div>
                                
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <Button className={`w-full ${
                                    plan.isPopular 
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                                        : 'bg-gray-900 hover:bg-gray-800'
                                    }`}>
                                    {plan.name === 'Enterprise' ? 'Hubungi Sales' : 'Mulai Sekarang'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
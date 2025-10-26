import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 items-center mb-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6 lg:-ml-2 ">
                            <img src="/Group_10.png" alt="Logo EPADI" className="h-[80px] md:h-40 w-[75%] sm:w-auto" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center lg:justify-end">
                        <p className="text-green-100 mb-8 leading-relaxed text-lg max-w-2xl">
                            Solusi terdepan untuk manajemen distribusi padi yang efisien dan transparan di Indonesia. 
                            Bergabunglah dengan revolusi digital pertanian.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="group w-12 h-12 bg-green-600/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"/>
                                </svg>
                            </a>

                            <a href="#" className="group w-12 h-12 bg-green-600/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.68l7.73-8.836L1.26 2.25h6.63l4.713 6.211 5.641-6.211Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"/>
                                </svg>
                            </a>

                            <a href="#" className="group w-12 h-12 bg-green-600/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0H1.325C.594 0 0 .593 0 1.326v21.348C0 23.406.594 24 1.325 24H12.82V14.708h-3.11V11.08h3.11V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.763v2.308h3.587l-.467 3.629h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0"/>
                                </svg>
                            </a>

                            <a href="#" className="group w-12 h-12 bg-green-600/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452H16.9v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.36V9h3.414v1.561h.046c.477-.9 1.636-1.85 3.369-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM6.12 20.452H3.555V9h3.564v11.452z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-green-600/50 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-green-200 text-sm flex items-center">
                            <p className="flex items-center">
                                © 2025 EPADI. Semua hak dilindungi. Made with in Indonesia
                            </p>
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-green-200 hover:text-yellow-400 transition-colors duration-300 relative group">
                                Privacy Policy
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#" className="text-green-200 hover:text-yellow-400 transition-colors duration-300 relative group">
                                Terms of Service
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#" className="text-green-200 hover:text-yellow-400 transition-colors duration-300 relative group">
                                Sitemap
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
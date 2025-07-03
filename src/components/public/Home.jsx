import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    // Featured books for slider
    const featuredBooks = [
        {
            id: 1,
            title: "אורות הקודש",
            author: "הרב דוד כהן הנזיר",
            year: 1925,
            summary: "ספר יסוד בתורת הקבלה והרוחניות היהודית",
            coverImage: "/images/books/orot_kodesh_cover.jpg"
        },
        {
            id: 2,
            title: "הדר ישראל",
            author: "הרב דוד כהן הנזיר",
            year: 1930,
            summary: "חיבור על מעלת עם ישראל ותפקידו בעולם",
            coverImage: "/images/books/hadar_israel_cover.jpg"
        },
        {
            id: 3,
            title: "אגרות הראיה",
            author: "הרב שאר הישוב כהן",
            year: 1952,
            summary: "אוסף מכתבים המכילים הדרכה רוחנית ופרקטית",
            coverImage: "/images/books/igrot_hareaya_cover.jpg"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
    };

    const handleSearch = () => {
        // Navigate to search results (mock)
        alert(`במוקאפ: חיפוש עבור "${searchQuery}"`);
    };

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-green-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: דף הבית הציבורי - Hero banner + חיפוש מרכזי + קטגוריות
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">מכון נזר דוד</h1>
                        <nav className="flex space-x-8 space-x-reverse">
                            <Link to="/public/home" className="text-blue-600 font-medium">בית</Link>
                            <Link to="/public/books" className="text-gray-700 hover:text-blue-600">ספרים</Link>
                            <Link to="/public/manuscripts" className="text-gray-700 hover:text-blue-600">כתבי יד</Link>
                            <Link to="/public/news" className="text-gray-700 hover:text-blue-600">עיתונות</Link>
                            <Link to="/public/contact" className="text-gray-700 hover:text-blue-600">צור קשר</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Banner with Slider */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            ברוכים הבאים למכון נזר דוד
                        </h2>
                        <p className="text-xl text-gray-600">
                            משמרים ומפיצים את מורשת הרב דוד כהן הנזיר ובנו הרב שאר הישוב כהן
                        </p>
                    </div>

                    {/* Featured Books Slider */}
                    <div className="relative max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="flex items-center">
                                <button
                                    onClick={prevSlide}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 ml-4"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                <div className="flex-1 flex items-center space-x-6 space-x-reverse">
                                    {/* Mock Book Cover */}
                                    <div className="w-32 h-40 bg-gradient-to-br from-amber-100 to-amber-200 rounded shadow flex items-center justify-center">
                                        <div className="text-center text-amber-800">
                                            <div className="text-2xl mb-2">📚</div>
                                            <div className="text-xs">{featuredBooks[currentSlide].title}</div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {featuredBooks[currentSlide].title}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-2">
                                            {featuredBooks[currentSlide].author} • {featuredBooks[currentSlide].year}
                                        </p>
                                        <p className="text-gray-700 mb-4">
                                            {featuredBooks[currentSlide].summary}
                                        </p>
                                        <Link
                                            to={`/public/books/${featuredBooks[currentSlide].id}`}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-block"
                                        >
                                            קרא עוד
                                        </Link>
                                    </div>
                                </div>

                                <button
                                    onClick={nextSlide}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 mr-4"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            </div>

                            {/* Slider Dots */}
                            <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
                                {featuredBooks.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full ${
                                            index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="חפש בכתבי יד, ספרים וחומרים..."
                                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                            >
                                חפש
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">חקור את האוספים</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Books Category */}
                        <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📚</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">ספרים</h4>
                            <p className="text-gray-600 mb-4">ספרים שפורסמו ומוכנים לקריאה</p>
                            <Link
                                to="/public/books"
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-block"
                            >
                                עיין בספרים
                            </Link>
                        </div>

                        {/* Manuscripts Category */}
                        <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📜</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">כתבי יד</h4>
                            <p className="text-gray-600 mb-4">כתבי יד מקוריים ומתומללים</p>
                            <Link
                                to="/public/manuscripts"
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 inline-block"
                            >
                                גלה כתבי יד
                            </Link>
                        </div>

                        {/* News Category */}
                        <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📰</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">קטעי עיתון</h4>
                            <p className="text-gray-600 mb-4">מאמרים וכתבות מהעיתונות</p>
                            <Link
                                to="/public/news"
                                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 inline-block"
                            >
                                קרא עיתונות
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-600">© 2024 מכון נזר דוד. כל הזכויות שמורות.</p>
                        <div className="mt-4 space-x-6 space-x-reverse">
                            <Link to="/public/contact" className="text-gray-500 hover:text-gray-700">אודות</Link>
                            <Link to="/public/contact" className="text-gray-500 hover:text-gray-700">צור קשר</Link>
                            <a href="#" className="text-gray-500 hover:text-gray-700">מדיניות פרטיות</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Navigation */}
            <div className="bg-white border-t p-4 text-center">
                <Link
                    to="/public"
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    ← חזרה לתפריט האתר הציבורי
                </Link>
            </div>
        </div>
    );
};

export default Home;
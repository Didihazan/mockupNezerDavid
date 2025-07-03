import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';

const NewsList = () => {
    const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'list'

    // Mock news articles data
    const newsArticles = [
        {
            id: 1,
            title: "על הציונות הדתית ותפקידה",
            author: "הרב דוד כהן הנזיר",
            newspaper: "הפועל המזרחי",
            date: "1935-05-18",
            description: "מאמר יסוד על השקפת הציונות הדתית ותפקידה בבניין הארץ",
            excerpt: "בימים אלה, כאשר עם ישראל חוזר לארצו, עלינו לבחון את משמעות השיבה הזו..."
        },
        {
            id: 2,
            title: "החינוך היהודי בארץ ישראל",
            author: "הרב שאר הישוב כהן",
            newspaper: "דגל ירושלים",
            date: "1948-03-12",
            description: "מאמר על עקרונות החינוך היהודי במדינה המתחדשת",
            excerpt: "עם קום המדינה, חובה עלינו לבנות מערכת חינוך המבוססת על ערכי התורה..."
        },
        {
            id: 3,
            title: "על התפילה ומעלתה",
            author: "הרב דוד כהן הנזיר",
            newspaper: "המבשר",
            date: "1932-09-25",
            description: "דברים על עומק התפילה ומקומה בעבודת השם",
            excerpt: "התפילה איננה רק בקשה, אלא דרך להתקרב אל האלוהות..."
        },
        {
            id: 4,
            title: "ירושלים - לב העולם הרוחני",
            author: "הרב שאר הישוב כהן",
            newspaper: "כל ישראל",
            date: "1950-07-15",
            description: "מאמר על מעמדה הרוחני המיוחד של ירושלים",
            excerpt: "ירושלים איננה עיר כשאר הערים. היא מרכז רוחני שמקרין על העולם כולו..."
        }
    ];

    // Sort articles by date
    const sortedArticles = [...newsArticles].sort((a, b) => new Date(b.date) - new Date(a.date));

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getYearFromDate = (dateString) => {
        return new Date(dateString).getFullYear();
    };

    // Group articles by year for timeline
    const articlesByYear = sortedArticles.reduce((acc, article) => {
        const year = getYearFromDate(article.date);
        if (!acc[year]) acc[year] = [];
        acc[year].push(article);
        return acc;
    }, {});

    const TimelineView = () => (
        <div className="relative">
            {/* Timeline Line */}
            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>

            <div className="space-y-8">
                {Object.entries(articlesByYear)
                    .sort(([a], [b]) => parseInt(b) - parseInt(a))
                    .map(([year, articles]) => (
                        <div key={year} className="relative">
                            {/* Year Marker */}
                            <div className="absolute right-0 transform translate-x-1/2">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {year}
                                </div>
                            </div>

                            {/* Articles for this year */}
                            <div className="mr-20 space-y-4">
                                {articles.map((article) => (
                                    <div key={article.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                                                    <span className="text-2xl">📰</span>
                                                    <span className="text-sm text-gray-500">{article.newspaper}</span>
                                                    <span className="text-sm text-gray-400">•</span>
                                                    <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
                                                </div>

                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {article.title}
                                                </h3>

                                                <p className="text-sm text-gray-600 mb-2">{article.author}</p>
                                                <p className="text-gray-700 mb-3">{article.description}</p>
                                                <p className="text-gray-600 text-sm italic">"{article.excerpt}"</p>
                                            </div>

                                            <Link
                                                to={`/public/news/${article.id}`}
                                                className="mr-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 space-x-reverse"
                                            >
                                                <Eye size={16} />
                                                <span>צפה</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );

    const ListView = () => (
        <div className="space-y-4">
            {sortedArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 space-x-reverse mb-3">
                                <span className="text-2xl">📰</span>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                                        <span>{article.author}</span>
                                        <span>•</span>
                                        <span>{article.newspaper}</span>
                                        <span>•</span>
                                        <span>{formatDate(article.date)}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-3">{article.description}</p>
                            <p className="text-gray-600 text-sm italic">"{article.excerpt}"</p>
                        </div>

                        <Link
                            to={`/public/news/${article.id}`}
                            className="mr-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 space-x-reverse"
                        >
                            <Eye size={16} />
                            <span>צפה</span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-green-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: רשימת קטעי עיתון - Timeline View + List View
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link
                                to="/public/home"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">קטעי עיתון</h1>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {newsArticles.length} מאמרים
              </span>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <button
                                onClick={() => setViewMode('timeline')}
                                className={`px-4 py-2 rounded-md text-sm ${
                                    viewMode === 'timeline'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <Calendar size={16} className="inline ml-2" />
                                ציר זמן
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2 rounded-md text-sm ${
                                    viewMode === 'list'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                רשימה
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Content */}
                {viewMode === 'timeline' ? <TimelineView /> : <ListView />}

                {/* Navigation */}
                <div className="mt-12 pt-6 border-t text-center">
                    <Link
                        to="/public"
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← חזרה לתפריט האתר הציבורי
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsList;
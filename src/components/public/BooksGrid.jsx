import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';

const BooksGrid = () => {
    // Mock books data
    const books = [
        {
            id: 1,
            title: "אורות הקודש",
            author: "הרב דוד כהן הנזיר",
            year: 1925,
            subject: "קבלה ורוחניות",
            summary: "ספר יסוד בתורת הקבלה והרוחניות היהודית, המתאר את דרכי העבודה הרוחנית"
        },
        {
            id: 2,
            title: "הדר ישראל",
            author: "הרב דוד כהן הנזיר",
            year: 1930,
            subject: "פילוסופיה יהודית",
            summary: "חיבור על מעלת עם ישראל ותפקידו בעולם, המתבסס על מקורות תורניים"
        },
        {
            id: 3,
            title: "אגרות הראיה",
            author: "הרב שאר הישוב כהן",
            year: 1952,
            subject: "מכתבים והדרכה",
            summary: "אוסף מכתבים ואגרות שנכתבו לתלמידים ולאנשי רוח המכילים הדרכה רוחנית"
        },
        {
            id: 4,
            title: "נר דוד - קובץ מאמרים",
            author: "הרב דוד כהן הנזיר",
            year: 1928,
            subject: "מאמרים ומחשבות",
            summary: "אוסף מאמרים שפורסמו בעיתונות החרדית והציונית-דתית העוסקים בנושאים אקטואליים"
        }
    ];

    const [selectedAuthor, setSelectedAuthor] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');

    const authors = [...new Set(books.map(book => book.author))];
    const years = [...new Set(books.map(book => book.year))].sort();
    const subjects = [...new Set(books.map(book => book.subject))];

    // Filter books
    const filteredBooks = books.filter(book => {
        return (selectedAuthor === 'all' || book.author === selectedAuthor) &&
            (selectedYear === 'all' || book.year === parseInt(selectedYear)) &&
            (selectedSubject === 'all' || book.subject === selectedSubject);
    });

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-green-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: רשת ספרים - כרטיסים (4 לעמוד) + פילטרים
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
                            <h1 className="text-2xl font-bold text-gray-900">ספרים</h1>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {filteredBooks.length} ספרים
              </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    <div className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
                        <div className="flex items-center space-x-2 space-x-reverse mb-4">
                            <Filter size={16} />
                            <h3 className="font-semibold text-gray-900">פילטרים</h3>
                        </div>

                        {/* Author Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">מחבר</label>
                            <select
                                value={selectedAuthor}
                                onChange={(e) => setSelectedAuthor(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">כל המחברים</option>
                                {authors.map(author => (
                                    <option key={author} value={author}>{author}</option>
                                ))}
                            </select>
                        </div>

                        {/* Year Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">שנה</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">כל השנים</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subject Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">נושא</label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">כל הנושאים</option>
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>

                        {/* Reset Filters */}
                        <button
                            onClick={() => {
                                setSelectedAuthor('all');
                                setSelectedYear('all');
                                setSelectedSubject('all');
                            }}
                            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            איפוס פילטרים
                        </button>
                    </div>

                    {/* Books Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredBooks.map((book) => (
                                <div
                                    key={book.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                                >
                                    {/* Mock Book Cover */}
                                    <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative">
                                        <div className="text-center text-amber-800">
                                            <div className="text-4xl mb-2">📚</div>
                                            <div className="text-sm font-medium px-2">{book.title}</div>
                                        </div>

                                        {/* Hover Effect */}
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Link
                                                to={`/public/books/${book.id}`}
                                                className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                                            >
                                                לפרטים
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Book Info */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                                        <p className="text-xs text-gray-500 mb-3">{book.year}</p>

                                        {/* Summary on hover */}
                                        <div className="hidden group-hover:block">
                                            <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                                {book.summary}
                                            </p>
                                            <Link
                                                to={`/public/books/${book.id}`}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                לפרטים ←
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredBooks.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-4xl mb-4">📚</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">לא נמצאו ספרים</h3>
                                <p className="text-gray-500">נסה לשנות את הפילטרים</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-8 pt-6 border-t text-center">
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

export default BooksGrid;
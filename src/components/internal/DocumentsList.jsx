import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Eye, Edit, Trash2, Download, MoreHorizontal, ArrowLeft, Calendar, Tag, User } from 'lucide-react';

// Import mock data (בפרויקט אמיתי: import { mockDocuments, mockTags, getStatusBadgeColor } from '../data/mockData')
const mockDocuments = [
    {
        id: 1,
        title: "אורות הקודש - פרק א",
        author: "הרב דוד כהן הנזיר",
        category: "כתב יד",
        type: "manuscript",
        status: "transcribed",
        hasTranscript: true,
        dateWritten: "1925-03-15",
        createdAt: "2024-12-15",
        pages: 12,
        tags: ["קבלה", "רוחניות"]
    },
    {
        id: 2,
        title: "מכתב לתלמידים",
        author: "הרב שאר הישוב כהן",
        category: "כתב יד",
        type: "manuscript",
        status: "in_transcription",
        hasTranscript: false,
        dateWritten: "1948-07-22",
        createdAt: "2024-12-12",
        pages: 3,
        tags: ["מכתבים", "חינוך"]
    },
    {
        id: 3,
        title: "הדר ישראל - מבוא",
        author: "הרב דוד כהן הנזיר",
        category: "ספר",
        type: "book",
        status: "published",
        hasTranscript: true,
        dateWritten: "1930-11-08",
        createdAt: "2024-12-10",
        pages: 25,
        tags: ["פילוסופיה יהודית"]
    },
    {
        id: 4,
        title: "כתבה על הציונות הדתית",
        author: "הרב דוד כהן הנזיר",
        category: "קטע עיתון",
        type: "newspaper",
        status: "transcribed",
        hasTranscript: true,
        dateWritten: "1935-05-18",
        createdAt: "2024-12-08",
        pages: 2,
        tags: ["ציונות", "עיתונות"]
    },
    {
        id: 5,
        title: "שיעור בתורת הסוד",
        author: "הרב שאר הישוב כהן",
        category: "כתב יד",
        type: "manuscript",
        status: "draft",
        hasTranscript: false,
        dateWritten: "1952-02-14",
        createdAt: "2024-12-05",
        pages: 8,
        tags: ["קבלה", "שיעורים"]
    }
];

const DocumentsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedAuthor, setSelectedAuthor] = useState('all');
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [showFilters, setShowFilters] = useState(true);

    // Helper functions
    const getStatusBadge = (status, hasTranscript) => {
        const statusConfig = {
            transcribed: { text: "מתומלל", className: "bg-green-100 text-green-800" },
            in_transcription: { text: "בתמלול", className: "bg-yellow-100 text-yellow-800" },
            published: { text: "פורסם", className: "bg-blue-100 text-blue-800" },
            draft: { text: "טיוטה", className: "bg-gray-100 text-gray-800" }
        };

        const config = statusConfig[status] || statusConfig.draft;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.text}
      </span>
        );
    };

    const getTypeIcon = (type) => {
        const icons = {
            manuscript: "📜",
            book: "📚",
            newspaper: "📰"
        };
        return icons[type] || "📄";
    };

    // Filter functions
    const filteredDocuments = mockDocuments.filter(doc => {
        const matchesSearch = doc.title.includes(searchTerm) || doc.author.includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
        const matchesAuthor = selectedAuthor === 'all' || doc.author === selectedAuthor;

        return matchesSearch && matchesCategory && matchesStatus && matchesAuthor;
    });

    const handleSelectDocument = (docId) => {
        setSelectedDocuments(prev =>
            prev.includes(docId)
                ? prev.filter(id => id !== docId)
                : [...prev, docId]
        );
    };

    const handleSelectAll = () => {
        if (selectedDocuments.length === filteredDocuments.length) {
            setSelectedDocuments([]);
        } else {
            setSelectedDocuments(filteredDocuments.map(doc => doc.id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: מסך רשימת מסמכים - טבלה עם פילטרים וחיפוש מיידי
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link
                                to="/internal/dashboard"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">רשימת מסמכים</h1>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {filteredDocuments.length} מסמכים
              </span>
                        </div>

                        <div className="flex items-center space-x-3 space-x-reverse">
                            <Link
                                to="/internal/documents/upload"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
                            >
                                <Plus size={16} />
                                <span>הוסף מסמך</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    {showFilters && (
                        <div className="w-64 bg-white rounded-lg shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-900">פילטרים</h3>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    חיפוש מיידי
                                </label>
                                <div className="relative">
                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="חפש כותרת או מחבר..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    קטגוריה
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">כל הקטגוריות</option>
                                    <option value="כתב יד">כתב יד</option>
                                    <option value="ספר">ספר</option>
                                    <option value="קטע עיתון">קטע עיתון</option>
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    סטטוס תמלול
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">כל הסטטוסים</option>
                                    <option value="transcribed">מתומלל</option>
                                    <option value="in_transcription">בתמלול</option>
                                    <option value="published">פורסם</option>
                                    <option value="draft">טיוטה</option>
                                </select>
                            </div>

                            {/* Author Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    כותב
                                </label>
                                <select
                                    value={selectedAuthor}
                                    onChange={(e) => setSelectedAuthor(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">כל הכותבים</option>
                                    <option value="הרב דוד כהן הנזיר">הרב דוד כהן הנזיר</option>
                                    <option value="הרב שאר הישוב כהן">הרב שאר הישוב כהן</option>
                                </select>
                            </div>

                            {/* Date Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    טווח תאריכים
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="מתאריך"
                                    />
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="עד תאריך"
                                    />
                                </div>
                            </div>

                            {/* Reset Filters */}
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                    setSelectedStatus('all');
                                    setSelectedAuthor('all');
                                }}
                                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                אפס פילטרים
                            </button>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Bulk Actions */}
                        {selectedDocuments.length > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center">
                  <span className="text-blue-800 font-medium">
                    נבחרו {selectedDocuments.length} מסמכים
                  </span>
                                    <div className="flex space-x-3 space-x-reverse">
                                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                                            שנה סטטוס
                                        </button>
                                        <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
                                            העבר למשתמשים
                                        </button>
                                        <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                                            מקם בארכיון
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Documents Table */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold text-gray-900">מסמכים</h2>
                                    {!showFilters && (
                                        <button
                                            onClick={() => setShowFilters(true)}
                                            className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-800"
                                        >
                                            <Filter size={16} />
                                            <span>הצג פילטרים</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            מצב תמלול
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            כותרת
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            סוג
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            כותב
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            תאריך יצירה
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            פעולות
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredDocuments.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedDocuments.includes(doc.id)}
                                                    onChange={() => handleSelectDocument(doc.id)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2 space-x-reverse">
                                                    {doc.hasTranscript ? (
                                                        <div className="w-2 h-2 bg-green-500 rounded-full" title="יש תמלול"></div>
                                                    ) : (
                                                        <div className="w-2 h-2 bg-red-500 rounded-full" title="אין תמלול"></div>
                                                    )}
                                                    {getStatusBadge(doc.status, doc.hasTranscript)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-start">
                                                    <span className="text-xl ml-2">{getTypeIcon(doc.type)}</span>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                                                        <div className="text-xs text-gray-500">{doc.pages} עמודים</div>
                                                        {doc.tags && (
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {doc.tags.slice(0, 2).map((tag, index) => (
                                                                    <span key={index} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                      {tag}
                                    </span>
                                                                ))}
                                                                {doc.tags.length > 2 && (
                                                                    <span className="text-xs text-gray-400">+{doc.tags.length - 2}</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{doc.category}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{doc.author}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {new Date(doc.createdAt).toLocaleDateString('he-IL')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2 space-x-reverse">
                                                    <Link
                                                        to={`/internal/documents/view/${doc.id}`}
                                                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50"
                                                        title="צפה במסמך"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        to={`/internal/documents/edit/${doc.id}`}
                                                        className="text-gray-600 hover:text-gray-800 p-1 rounded-md hover:bg-gray-50"
                                                        title="ערוך מסמך"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-50"
                                                        title="הורד קובץ"
                                                    >
                                                        <Download size={16} />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
                                                        title="מחק מסמך"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* No Results */}
                            {filteredDocuments.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-4xl mb-4">📄</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">לא נמצאו מסמכים</h3>
                                    <p className="text-gray-500">נסה לשנות את הפילטרים או החיפוש</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredDocuments.length > 0 && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    מציג 1-{filteredDocuments.length} מתוך {filteredDocuments.length} תוצאות
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                                        הקודם
                                    </button>
                                    <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">1</span>
                                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                                        הבא
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-8 pt-6 border-t text-center">
                    <Link
                        to="/internal"
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← חזרה לתפריט המערכת הפנימית
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DocumentsList;
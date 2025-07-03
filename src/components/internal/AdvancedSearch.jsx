import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    Filter,
    X,
    Calendar,
    Tag,
    User,
    FileText,
    RotateCcw,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal
} from 'lucide-react';

const AdvancedSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        author: '',
        status: '',
        dateFrom: '',
        dateTo: '',
        tags: [],
        hasTranscript: ''
    });
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
    const [searchHistory, setSearchHistory] = useState([
        'אורות הקודש',
        'מכתבים לתלמידים',
        'ציונות דתית',
        'רוחניות יהודית'
    ]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Mock search results
    const mockSearchResults = [
        {
            id: 1,
            title: "אורות הקודש - פרק א",
            author: "הרב דוד כהן הנזיר",
            category: "כתב יד",
            type: "manuscript",
            status: "transcribed",
            dateWritten: "1925-03-15",
            tags: ["קבלה", "רוחניות"],
            snippet: "בראשית דברינו, עלינו להבין כי הרוחניות היהודית איננה עניין של פילוסופיה מופשטת, אלא דרך חיים מעשית ומוחשית...",
            relevanceScore: 0.95,
            highlightedText: "רוחניות היהודית"
        },
        {
            id: 3,
            title: "הדר ישראל - מבוא",
            author: "הרב דוד כהן הנזיר",
            category: "ספר",
            type: "book",
            status: "published",
            dateWritten: "1930-11-08",
            tags: ["פילוסופיה יהודית"],
            snippet: "חיבור על מעלת עם ישראל ותפקידו בעולם, המתבסס על מקורות תורניים ומחשבת חז\"ל. המחבר בוחן את ייחודו של עם ישראל...",
            relevanceScore: 0.87,
            highlightedText: "עם ישראל"
        },
        {
            id: 4,
            title: "כתבה על הציונות הדתית",
            author: "הרב דוד כהן הנזיר",
            category: "קטע עיתון",
            type: "newspaper",
            status: "transcribed",
            dateWritten: "1935-05-18",
            tags: ["ציונות", "עיתונות"],
            snippet: "בימים אלה, כאשר עם ישראל חוזר לארצו, עלינו לבחון את משמעות השיבה הזו ואת התפקיד המוטל על הציונות הדתית...",
            relevanceScore: 0.82,
            highlightedText: "ציונות הדתית"
        },
        {
            id: 2,
            title: "מכתב לתלמידים",
            author: "הרב שאר הישוב כהן",
            category: "כתב יד",
            type: "manuscript",
            status: "in_transcription",
            dateWritten: "1948-07-22",
            tags: ["מכתבים", "חינוך"],
            snippet: "מכתב אישי שנשלח לתלמידים בישיבה, מכיל הדרכה רוחנית ופרקטית לחיי היום יום...",
            relevanceScore: 0.76,
            highlightedText: "תלמידים"
        }
    ];

    const availableTags = [
        "קבלה", "רוחניות", "פילוסופיה יהודית", "מכתבים", "חינוך",
        "הדרכה", "ציונות", "עיתונות", "רעיונות", "שיעורים",
        "סוד", "תפילה", "ירושלים", "קדושה", "מסורת"
    ];

    const authors = [
        "הרב דוד כהן הנזיר",
        "הרב שאר הישוב כהן"
    ];

    const categories = [
        "כתב יד", "ספר", "קטע עיתון"
    ];

    const statusOptions = [
        { value: "transcribed", label: "מתומלל" },
        { value: "in_transcription", label: "בתמלול" },
        { value: "published", label: "פורסם" },
        { value: "draft", label: "טיוטה" }
    ];

    const handleSearch = () => {
        setIsSearching(true);

        // Add to search history
        if (searchQuery && !searchHistory.includes(searchQuery)) {
            setSearchHistory(prev => [searchQuery, ...prev.slice(0, 4)]);
        }

        // Simulate API call
        setTimeout(() => {
            setSearchResults(mockSearchResults);
            setTotalResults(mockSearchResults.length);
            setCurrentPage(1);
            setIsSearching(false);
        }, 1000);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const handleTagToggle = (tag) => {
        setFilters(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const resetFilters = () => {
        setFilters({
            category: '',
            author: '',
            status: '',
            dateFrom: '',
            dateTo: '',
            tags: [],
            hasTranscript: ''
        });
        setSearchQuery('');
        setSearchResults([]);
        setTotalResults(0);
    };

    const getStatusBadge = (status) => {
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

    const highlightText = (text, highlight) => {
        if (!highlight) return text;

        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
        {parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <mark key={i} className="bg-yellow-200 px-1 rounded">{part}</mark>
            ) : (
                part
            )
        )}
      </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: מסך חיפוש מתקדם - פילטרים ותוצאות עם snippets
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
                            <h1 className="text-2xl font-bold text-gray-900">חיפוש מתקדם</h1>
                        </div>

                        <div className="flex items-center space-x-3 space-x-reverse">
                            <button
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <SlidersHorizontal size={16} />
                                <span>{showAdvancedFilters ? 'הסתר פילטרים' : 'הצג פילטרים'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="space-y-4">
                        {/* Main Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                חיפוש בטקסט מלא
                            </label>
                            <div className="flex space-x-3 space-x-reverse">
                                <div className="flex-1 relative">
                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="חפש במסמכים..."
                                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                                    />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    disabled={isSearching}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
                                >
                                    {isSearching ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>מחפש...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Search size={18} />
                                            <span>חפש</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Search History */}
                        {searchHistory.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    חיפושים אחרונים
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {searchHistory.map((term, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSearchQuery(term)}
                                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Advanced Filters */}
                {showAdvancedFilters && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">פילטרים מתקדמים</h3>
                            <button
                                onClick={resetFilters}
                                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-800"
                            >
                                <RotateCcw size={16} />
                                <span>איפוס</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FileText size={16} className="inline ml-2" />
                                    קטגוריה
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">כל הקטגוריות</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Author Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User size={16} className="inline ml-2" />
                                    כותב
                                </label>
                                <select
                                    value={filters.author}
                                    onChange={(e) => handleFilterChange('author', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">כל הכותבים</option>
                                    {authors.map(author => (
                                        <option key={author} value={author}>{author}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Filter size={16} className="inline ml-2" />
                                    סטטוס תמלול
                                </label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">כל הסטטוסים</option>
                                    {statusOptions.map(status => (
                                        <option key={status.value} value={status.value}>{status.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Date From */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar size={16} className="inline ml-2" />
                                    מתאריך
                                </label>
                                <input
                                    type="date"
                                    value={filters.dateFrom}
                                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Date To */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar size={16} className="inline ml-2" />
                                    עד תאריך
                                </label>
                                <input
                                    type="date"
                                    value={filters.dateTo}
                                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Has Transcript */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FileText size={16} className="inline ml-2" />
                                    מצב תמלול
                                </label>
                                <select
                                    value={filters.hasTranscript}
                                    onChange={(e) => handleFilterChange('hasTranscript', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">הכל</option>
                                    <option value="true">יש תמלול</option>
                                    <option value="false">אין תמלול</option>
                                </select>
                            </div>
                        </div>

                        {/* Tags Filter */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Tag size={16} className="inline ml-2" />
                                תגים
                            </label>
                            <div className="space-y-3">
                                {/* Selected Tags */}
                                {filters.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {filters.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                                                <button
                                                    onClick={() => handleTagToggle(tag)}
                                                    className="mr-2 text-blue-600 hover:text-blue-800"
                                                >
                          <X size={14} />
                        </button>
                      </span>
                                        ))}
                                    </div>
                                )}

                                {/* Available Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {availableTags.filter(tag => !filters.tags.includes(tag)).slice(0, 10).map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagToggle(tag)}
                                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                    {availableTags.filter(tag => !filters.tags.includes(tag)).length > 10 && (
                                        <span className="text-sm text-gray-500 px-3 py-1">
                      +{availableTags.filter(tag => !filters.tags.includes(tag)).length - 10} תגים נוספים
                    </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Results */}
                {totalResults > 0 && (
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">
                                    תוצאות חיפוש ({totalResults})
                                </h3>
                                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                                    <span>מציג {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalResults)} מתוך {totalResults}</span>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {searchResults.map((result) => (
                                <div key={result.id} className="p-6 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                                                <span className="text-xl">{getTypeIcon(result.type)}</span>
                                                <Link
                                                    to={`/internal/documents/view/${result.id}`}
                                                    className="text-lg font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    {highlightText(result.title, result.highlightedText)}
                                                </Link>
                                                <div className="flex items-center space-x-2 space-x-reverse">
                                                    {getStatusBadge(result.status)}
                                                    <span className="text-xs text-gray-500">
                            {Math.round(result.relevanceScore * 100)}% רלוונטיות
                          </span>
                                                </div>
                                            </div>

                                            <div className="text-sm text-gray-600 mb-2">
                                                <span>{result.author}</span>
                                                <span className="mx-2">•</span>
                                                <span>{result.category}</span>
                                                <span className="mx-2">•</span>
                                                <span>{new Date(result.dateWritten).toLocaleDateString('he-IL')}</span>
                                            </div>

                                            <p className="text-gray-700 mb-3 leading-relaxed">
                                                {highlightText(result.snippet, searchQuery)}
                                            </p>

                                            {result.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {result.tags.map(tag => (
                                                        <span key={tag} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center space-x-4 space-x-reverse text-sm">
                                                <Link
                                                    to={`/internal/documents/view/${result.id}`}
                                                    className="flex items-center space-x-1 space-x-reverse text-blue-600 hover:text-blue-800"
                                                >
                                                    <Eye size={14} />
                                                    <span>צפה במסמך</span>
                                                </Link>
                                                <button className="flex items-center space-x-1 space-x-reverse text-gray-600 hover:text-gray-800">
                                                    <Download size={14} />
                                                    <span>הורד</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    מציג {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalResults)} מתוך {totalResults} תוצאות
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronRight size={16} />
                                        <span>הקודם</span>
                                    </button>

                                    <div className="flex space-x-1 space-x-reverse">
                                        {[...Array(Math.min(5, Math.ceil(totalResults / 10)))].map((_, i) => {
                                            const pageNum = i + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`w-8 h-8 text-sm rounded ${
                                                        currentPage === pageNum
                                                            ? 'bg-blue-600 text-white'
                                                            : 'border border-gray-300 bg-white hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalResults / 10)))}
                                        disabled={currentPage >= Math.ceil(totalResults / 10)}
                                        className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <span>הבא</span>
                                        <ChevronLeft size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* No Results */}
                {totalResults === 0 && searchResults.length === 0 && searchQuery && !isSearching && (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="text-gray-400 text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">לא נמצאו תוצאות</h3>
                        <p className="text-gray-500 mb-4">
                            לא נמצאו מסמכים התואמים את החיפוש "{searchQuery}"
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>נסה:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>לבדוק את האיות</li>
                                <li>להשתמש במילים שונות או כלליות יותר</li>
                                <li>להקטין את מספר הפילטרים</li>
                                <li>לחפש רק במסמכים מתומללים</li>
                            </ul>
                        </div>
                    </div>
                )}

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

export default AdvancedSearch;
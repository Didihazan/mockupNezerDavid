import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Eye, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const BookDetail = () => {
    const { id } = useParams();

    // Mock book data
    const book = {
        id: 1,
        title: "אורות הקודש",
        author: "הרב דוד כהן הנזיר",
        year: 1925,
        pages: 284,
        publisher: "מכון אריאל",
        isbn: "978-965-000-001-1",
        category: "קבלה ורוחניות",
        description: "ספר יסוד בתורת הקבלה והרוחניות היהודית, המתאר את דרכי העבודה הרוחנית והתקרבות לאלוהות. המחבר מציג גישה ייחודית המשלבת בין תורת הקבלה למחשבה פילוסופית מודרנית.",
        summary: "ספר זה עוסק בעקרונות היסוד של החיים הרוחניים ובדרכי השגת הדבקות האלוהית. המחבר מציג גישה ייחודית המשלבת בין תורת הקבלה למחשבה פילוסופית מודרנית."
    };

    // Mock related items
    const relatedItems = [
        { id: 1, title: "כתב יד - אורות הקודש פרק א", type: "manuscript" },
        { id: 2, title: "מאמר על הקבלה", type: "news" },
        { id: 3, title: "כתב יד - הערות שוליים", type: "manuscript" }
    ];

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-green-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: פרטי ספר - שתי עמודות + Related Items
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link
                                to="/public/books"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Content - Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Left Column - Book Cover + Actions */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {/* Mock Book Cover */}
                        <div className="w-full max-w-sm mx-auto mb-6">
                            <div className="h-96 bg-gradient-to-br from-amber-100 to-amber-200 rounded shadow-lg flex items-center justify-center">
                                <div className="text-center text-amber-800">
                                    <div className="text-6xl mb-4">📚</div>
                                    <div className="text-lg font-bold px-4">{book.title}</div>
                                    <div className="text-sm mt-2">{book.author}</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2 space-x-reverse">
                                <Eye size={18} />
                                <span>קרא מקוון</span>
                            </button>

                            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 flex items-center justify-center space-x-2 space-x-reverse">
                                <Download size={18} />
                                <span>הורד PDF דוגמה</span>
                            </button>

                            <a
                                href="#"
                                className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 flex items-center justify-center space-x-2 space-x-reverse"
                            >
                                <ExternalLink size={18} />
                                <span>רכישה באתר אריאל</span>
                            </a>
                        </div>

                        {/* Watermark Notice */}
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                            📄 קבצי הדוגמה מכילים סימני מים לשמירת זכויות היוצרים
                        </div>
                    </div>

                    {/* Right Column - Book Details */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h2>
                            <p className="text-xl text-gray-600 mb-1">{book.author}</p>
                            <p className="text-lg text-gray-500">{book.year}</p>
                        </div>

                        {/* Book Info */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <span className="block text-sm font-medium text-gray-500">עמודים</span>
                                <span className="text-lg text-gray-900">{book.pages}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-500">מוציא לאור</span>
                                <span className="text-lg text-gray-900">{book.publisher}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-500">ISBN</span>
                                <span className="text-lg text-gray-900">{book.isbn}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-500">קטגוריה</span>
                                <span className="text-lg text-gray-900">{book.category}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">תיאור מפורט</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {book.description}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                {book.summary}
                            </p>
                        </div>

                        {/* Author Info */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">על המחבר</h3>
                            <p className="text-gray-700 leading-relaxed">
                                הרב דוד כהן הנזיר (1887-1972) היה אחד מגדולי המקובלים והוגי הדעות של הדור.
                                שילב בכתיביו בין עומק התורה והקבלה לבין הבנה עמוקה של רוח הזמן והתפתחויות המודרניות.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Items Carousel */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">חומרים קשורים</h3>
                        <div className="flex space-x-2 space-x-reverse">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ChevronRight size={16} />
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <ChevronLeft size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {relatedItems.map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-3 space-x-reverse mb-2">
                  <span className="text-2xl">
                    {item.type === 'manuscript' ? '📜' : '📰'}
                  </span>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                                        <p className="text-xs text-gray-500">
                                            {item.type === 'manuscript' ? 'כתב יד' : 'קטע עיתון'}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    to={`/public/${item.type === 'manuscript' ? 'manuscripts' : 'news'}/${item.id}`}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    צפה ←
                                </Link>
                            </div>
                        ))}
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

export default BookDetail;
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Settings, LogOut, Plus, Eye, Edit } from 'lucide-react';

// Mock data (בפרויקט אמיתי יהיה import מקובץ נפרד)
const mockStats = {
    newDocuments: 12,
    recentSearches: 45,
    newComments: 8
};

const mockRecentDocuments = [
    {
        id: 1,
        title: "אורות הקודש - פרק א",
        author: "הרב דוד כהן הנזיר",
        date: "15/12/2024",
        status: "transcribed",
        type: "כתב יד"
    },
    {
        id: 2,
        title: "מכתב לתלמידים",
        author: "הרב שאר הישוב כהן",
        date: "12/12/2024",
        status: "in_transcription",
        type: "כתב יד"
    },
    {
        id: 3,
        title: "הדר ישראל - מבוא",
        author: "הרב דוד כהן הנזיר",
        date: "10/12/2024",
        status: "published",
        type: "ספר"
    },
    {
        id: 4,
        title: "כתבה על הציונות הדתית",
        author: "הרב דוד כהן הנזיר",
        date: "08/12/2024",
        status: "transcribed",
        type: "עיתון"
    }
];

const mockNotifications = [
    "תמלול חדש הושלם",
    "מסמך חדש נוסף",
    "עדכון מטה-דאטה"
];

const Dashboard = () => {
    const getStatusBadge = (status) => {
        const statusConfig = {
            transcribed: { text: "מתומלל", className: "bg-green-100 text-green-800" },
            in_transcription: { text: "בתמלול", className: "bg-yellow-100 text-yellow-800" },
            published: { text: "פורסם", className: "bg-blue-100 text-blue-800" },
            draft: { text: "טיוטה", className: "bg-gray-100 text-gray-800" }
        };

        const config = statusConfig[status] || statusConfig.draft;
        return (
            <span className={`px-2 py-1 rounded-full text-xs ${config.className}`}>
        {config.text}
      </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: Dashboard ראשי - מערכת פנימית
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm">🏛️</span>
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900">מכון נזר דוד</h1>
                        </div>

                        <div className="flex items-center space-x-4 space-x-reverse">
                            <span className="text-sm text-gray-700">שלום, הראל כהן</span>

                            {/* Notifications */}
                            <div className="relative">
                                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                                    <Bell size={18} />
                                </button>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
                            </div>

                            {/* User Menu */}
                            <div className="relative">
                                <button className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-gray-900">
                                    <Settings size={18} />
                                    <span className="text-sm">הגדרות</span>
                                </button>
                            </div>

                            <Link
                                to="/internal/login"
                                className="flex items-center space-x-2 space-x-reverse text-gray-500 hover:text-gray-700"
                            >
                                <LogOut size={18} />
                                <span className="text-sm">יציאה</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <nav className="w-64 bg-white shadow-sm min-h-screen">
                    <div className="p-4">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/internal/dashboard"
                                    className="block p-3 text-blue-600 bg-blue-50 rounded-md font-medium"
                                >
                                    📊 דשבורד
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/internal/documents"
                                    className="block p-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    📁 מסמכים
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/internal/search"
                                    className="block p-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    🔍 חיפוש מתקדם
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/internal/users"
                                    className="block p-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    👥 משתמשים והרשאות
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/internal/notifications"
                                    className="block p-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    🔔 התראות
                                </Link>
                            </li>
                        </ul>

                        {/* Quick Actions */}
                        <div className="mt-8 pt-4 border-t">
                            <h3 className="text-sm font-medium text-gray-500 mb-3">פעולות מהירות</h3>
                            <Link
                                to="/internal/documents/upload"
                                className="flex items-center space-x-2 space-x-reverse w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={16} />
                                <span className="text-sm">הוסף מסמך</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">מסמכים חדשים</h3>
                                    <p className="text-3xl font-bold text-blue-600 mt-2">{mockStats.newDocuments}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl">📄</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">השבוע האחרון</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">חיפושים אחרונים</h3>
                                    <p className="text-3xl font-bold text-green-600 mt-2">{mockStats.recentSearches}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Search size={24} />
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">השבוע האחרון</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">הערות חדשות</h3>
                                    <p className="text-3xl font-bold text-orange-600 mt-2">{mockStats.newComments}</p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl">💬</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">השבוע האחרון</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Documents */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                            <div className="px-6 py-4 border-b flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900">מסמכים אחרונים</h2>
                                <Link
                                    to="/internal/documents"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    צפה בכל המסמכים
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">שם</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">כותב</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">תאריך</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">סטטוס</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">פעולות</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {mockRecentDocuments.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                {doc.title}
                                                <div className="text-xs text-gray-500">{doc.type}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{doc.author}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{doc.date}</td>
                                            <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex space-x-2 space-x-reverse">
                                                    <Link
                                                        to={`/internal/documents/view/${doc.id}`}
                                                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        to={`/internal/documents/edit/${doc.id}`}
                                                        className="text-gray-600 hover:text-gray-800 p-1 rounded"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Notifications Panel */}
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="px-6 py-4 border-b">
                                <h2 className="text-lg font-medium text-gray-900">התראות אחרונות</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {mockNotifications.map((notification, index) => (
                                        <div key={index} className="flex items-start space-x-3 space-x-reverse">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-700">{notification}</p>
                                                <p className="text-xs text-gray-500 mt-1">לפני {index + 1} שעות</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    to="/internal/notifications"
                                    className="mt-4 block text-center text-sm text-blue-600 hover:underline"
                                >
                                    צפה בכל ההתראות
                                </Link>
                            </div>
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
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
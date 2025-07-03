import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Import Components - נייבא את כל הקומפוננטות
import Login from './components/internal/Login';
import Dashboard from './components/internal/Dashboard';
import DocumentsList from './components/internal/DocumentsList';
import DocumentUpload from './components/internal/DocumentUpload';
import DocumentEdit from './components/internal/DocumentEdit';
import DocumentViewer from './components/internal/DocumentViewer';
import AdvancedSearch from './components/internal/AdvancedSearch';
import UsersManagement from './components/internal/UsersManagement';
import Notifications from './components/internal/Notifications';

import Home from './components/public/Home';
import BooksGrid from './components/public/BooksGrid';
import BookDetail from './components/public/BookDetail';
import ManuscriptGallery from './components/public/ManuscriptGallery';
import NewsList from './components/public/NewsList';
import NewsDetail from './components/public/NewsDetail';
import Contact from './components/public/Contact';

// =========== עמוד בחירה ראשי ===========
const MainSelection = () => {
    const [userRole, setUserRole] = useState('guest'); // guest, researcher, admin

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">מכון נזר דוד</h1>
                    <p className="text-lg text-gray-600">מערכת ניהול מסמכים ומורשת</p>
                </div>
            </header>

            {/* Main Selection */}
            <main className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">בחר את סוג הגישה המתאים</h2>
                    <p className="text-gray-600">אנא בחר את האזור שתרצה לגשת אליו במערכת</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* אתר ציבורי */}
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🌐</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">אתר ציבורי</h3>
                        <p className="text-gray-600 mb-6">
                            גישה לספרים פרסומים, כתבי יד מתומללים וחומרים ציבוריים
                        </p>
                        <ul className="text-sm text-gray-500 mb-6 space-y-2">
                            <li>• ספרים שפורסמו</li>
                            <li>• כתבי יד מתומללים</li>
                            <li>• קטעי עיתון</li>
                            <li>• חיפוש בתוכן</li>
                        </ul>
                        <Link
                            to="/public"
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                        >
                            כניסה לאתר הציבורי
                        </Link>
                    </div>

                    {/* אתר פנימי */}
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🔒</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">מערכת פנימית</h3>
                        <p className="text-gray-600 mb-6">
                            גישה לחוקרים ועובדי המכון לניהול מסמכים ותמלולים
                        </p>
                        <ul className="text-sm text-gray-500 mb-6 space-y-2">
                            <li>• ניהול כל המסמכים</li>
                            <li>• העלאה ועריכה</li>
                            <li>• מעקב אחר שינויים</li>
                            <li>• כלי ניהול משתמשים</li>
                        </ul>
                        <Link
                            to="/internal"
                            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors inline-block"
                        >
                            כניסה למערכת הפנימית
                        </Link>
                    </div>
                </div>

                {/* Role Selector for Demo */}
                <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
                    <h4 className="font-semibold text-yellow-800 mb-3">🚧 מוקאפ - בחירת תפקיד לדמו:</h4>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => setUserRole('guest')}
                            className={`px-4 py-2 rounded ${userRole === 'guest' ? 'bg-yellow-200' : 'bg-yellow-100'}`}
                        >
                            אורח
                        </button>
                        <button
                            onClick={() => setUserRole('researcher')}
                            className={`px-4 py-2 rounded ${userRole === 'researcher' ? 'bg-yellow-200' : 'bg-yellow-100'}`}
                        >
                            חוקר
                        </button>
                        <button
                            onClick={() => setUserRole('admin')}
                            className={`px-4 py-2 rounded ${userRole === 'admin' ? 'bg-yellow-200' : 'bg-yellow-100'}`}
                        >
                            מנהל
                        </button>
                    </div>
                    <p className="text-sm text-yellow-700 mt-2 text-center">
                        תפקיד נוכחי: <strong>{userRole === 'guest' ? 'אורח' : userRole === 'researcher' ? 'חוקר' : 'מנהל'}</strong>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 py-8 mt-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-gray-600">© 2024 מכון נזר דוד. כל הזכויות שמורות.</p>
                </div>
            </footer>
        </div>
    );
};

// =========== עמודי ניווט לכל אזור ===========
const InternalNavigation = () => (
    <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="bg-blue-600 text-white text-center py-3">
            🚧 מוקאפ - מערכת פנימית למכון נזר דוד
        </div>

        <div className="max-w-6xl mx-auto p-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">מערכת פנימית - ניווט</h1>
                    <Link to="/" className="text-blue-600 hover:underline">← חזרה לעמוד הראשי</Link>
                </div>
                <p className="text-gray-600">בחר את המסך שתרצה לצפות בו:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { path: '/internal/login', name: '1. מסך Login', desc: 'התחברות למערכת' },
                    { path: '/internal/dashboard', name: '2. Dashboard', desc: 'דשבורד ראשי' },
                    { path: '/internal/documents', name: '3. רשימת מסמכים', desc: 'טבלת מסמכים עם פילטרים' },
                    { path: '/internal/documents/upload', name: '4. העלאת מסמך', desc: 'אשף 3 שלבים' },
                    { path: '/internal/documents/edit/1', name: '5. עריכת מסמך', desc: 'עדכון מטה-דאטה' },
                    { path: '/internal/documents/view/1', name: '6. צפייה במסמך', desc: 'PDF + תמלול' },
                    { path: '/internal/search', name: '7. חיפוש מתקדם', desc: 'חיפוש עם פילטרים' },
                    { path: '/internal/users', name: '8. ניהול משתמשים', desc: 'Admin בלבד' },
                    { path: '/internal/notifications', name: '9. התראות', desc: 'רשימת התראות' }
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                        <Link
                            to={item.path}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
                        >
                            צפה במסך
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const PublicNavigation = () => (
    <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="bg-green-600 text-white text-center py-3">
            🚧 מוקאפ - אתר ציבורי למכון נזר דוד
        </div>

        <div className="max-w-6xl mx-auto p-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">אתר ציבורי - ניווט</h1>
                    <Link to="/" className="text-green-600 hover:underline">← חזרה לעמוד הראשי</Link>
                </div>
                <p className="text-gray-600">בחר את המסך שתרצה לצפות בו:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { path: '/public/home', name: '10. דף הבית', desc: 'Hero banner + קטגוריות' },
                    { path: '/public/books', name: '11. רשת ספרים', desc: 'Grid של ספרים' },
                    { path: '/public/books/1', name: '12. פרטי ספר', desc: 'כריכה + תיאור' },
                    { path: '/public/manuscripts', name: '13. גלריית כתבי יד', desc: 'Thumbnails + Lightbox' },
                    { path: '/public/news', name: '14. רשימת עיתונות', desc: 'Timeline של קטעים' },
                    { path: '/public/news/1', name: '15. פרטי עיתון', desc: 'תמונה + תמלול' },
                    { path: '/public/contact', name: '16. יצירת קשר', desc: 'טופס + תרומות' }
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                        <Link
                            to={item.path}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors inline-block"
                        >
                            צפה במסך
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// =========== App Component ===========
function App() {
    return (
        <Router>
            <Routes>
                {/* עמוד בחירה ראשי */}
                <Route path="/" element={<MainSelection />} />

                {/* עמודי ניווט */}
                <Route path="/internal" element={<InternalNavigation />} />
                <Route path="/public" element={<PublicNavigation />} />

                {/* מסכי מערכת פנימית */}
                <Route path="/internal/login" element={<Login />} />
                <Route path="/internal/dashboard" element={<Dashboard />} />
                <Route path="/internal/documents" element={<DocumentsList />} />
                <Route path="/internal/documents/upload" element={<DocumentUpload />} />
                <Route path="/internal/documents/edit/:id" element={<DocumentEdit />} />
                <Route path="/internal/documents/view/:id" element={<DocumentViewer />} />
                <Route path="/internal/search" element={<AdvancedSearch />} />
                <Route path="/internal/users" element={<UsersManagement />} />
                <Route path="/internal/notifications" element={<Notifications />} />

                {/*/!* מסכי אתר ציבורי *!/*/}
                <Route path="/public/home" element={<Home />} />
                <Route path="/public/books" element={<BooksGrid />} />
                <Route path="/public/books/:id" element={<BookDetail />} />
                <Route path="/public/manuscripts" element={<ManuscriptGallery />} />
                <Route path="/public/news" element={<NewsList />} />
                <Route path="/public/news/:id" element={<NewsDetail />} />
                <Route path="/public/contact" element={<Contact />} />

                {/* Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
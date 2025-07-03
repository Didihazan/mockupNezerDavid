import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
            {/* Mockup Banner */}
            <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: מסך Login - התחברות למערכת הפנימית
            </div>

            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mt-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🏛️</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">מכון נזר דוד</h1>
                    <p className="text-gray-600 mt-2">מערכת פנימית לחוקרים ועובדים</p>
                </div>

                {/* Login Form */}
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            אימייל
                        </label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="הכנס אימייל"
                            defaultValue=""
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            סיסמה
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="הכנס סיסמה"
                            defaultValue=""
                        />
                    </div>

                    {/* Login Button */}
                    <Link
                        to="/internal/dashboard"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
                    >
                        התחברות
                    </Link>

                    {/* Forgot Password */}
                    <div className="text-center">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            שכחת סיסמה?
                        </button>
                    </div>
                </form>

                {/* Demo Credentials */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">📝 פרטי דמו למוקאפ:</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                        <div><strong>מנהל:</strong> admin@nazer-david.org.il</div>
                        <div><strong>חוקר:</strong> researcher@nazer-david.org.il</div>
                        <div className="mt-2 text-gray-500">לחץ על "התחברות" למעבר לדשבורד</div>
                    </div>
                </div>

                {/* Error States Examples */}
                <div className="mt-6 space-y-3">
                    <div className="text-sm text-gray-600">
                        <strong>דוגמאות תגובות שגיאה:</strong>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        ❌ "אימייל או סיסמה שגויים"
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded text-sm text-orange-700">
                        ⚠️ "חשבון מושעה - צור קשר עם המנהל"
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

export default Login;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, Heart, CreditCard, ExternalLink } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`במוקאפ: ההודעה נשלחה בהצלחה!\nשם: ${formData.name}\nאימייל: ${formData.email}`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-green-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: יצירת קשר ותרומות - טופס + פרטי תרומה + PayPal
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
                            <h1 className="text-2xl font-bold text-gray-900">צור קשר ותרומות</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">צור קשר</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">שם מלא</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="הכנס שם מלא"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">אימייל</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="הכנס כתובת אימייל"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">הודעה</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="כתוב את הודעתך כאן..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2 space-x-reverse"
                            >
                                <Send size={18} />
                                <span>שלח הודעה</span>
                            </button>
                        </form>

                        {/* Contact Info */}
                        <div className="mt-8 pt-6 border-t">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">פרטי התקשרות</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 space-x-reverse">
                                    <Mail size={18} className="text-gray-500" />
                                    <span className="text-gray-700">info@nazer-david.org.il</span>
                                </div>
                                <div className="flex items-center space-x-3 space-x-reverse">
                                    <Phone size={18} className="text-gray-500" />
                                    <span className="text-gray-700">02-1234567</span>
                                </div>
                                <div className="flex items-center space-x-3 space-x-reverse">
                                    <MapPin size={18} className="text-gray-500" />
                                    <span className="text-gray-700">ירושלים, ישראל</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Donations Section */}
                    <div className="space-y-6">
                        {/* About Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">אודות המכון</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                מכון נזר דוד פועל לשימור והפצת מורשת הרב דוד כהן הנזיר ובנו הרב שאר הישוב כהן.
                                אנו עוסקים בדיגיטציה, תמלול והנגשה של כתבי יד וחומרים היסטוריים חשובים.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                פעילותנו כוללת יצירת ארכיון דיגיטלי מתקדם, מחקר אקדמי ופרסום ספרים
                                המבוססים על החומרים הייחודיים שבארכיון המכון.
                            </p>
                        </div>

                        {/* Donations */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center space-x-3 space-x-reverse mb-4">
                                <Heart size={24} className="text-red-500" />
                                <h2 className="text-xl font-semibold text-gray-900">תמיכה ותרומות</h2>
                            </div>

                            <p className="text-gray-700 mb-6">
                                תרומתכם מסייעת לנו לשמר ולהנגיש את המורשת הרוחנית הייחודית הזו לדורות הבאים.
                                כל תרומה, גדולה כקטנה, תורמת לפעילות החשובה שלנו.
                            </p>

                            {/* Bank Details */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h3 className="font-medium text-gray-900 mb-3">פרטי חשבון לתרומה</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">בנק:</span>
                                        <span className="text-gray-900">בנק ירושלים</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">מספר חשבון:</span>
                                        <span className="text-gray-900">123-456789-001</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">סניף:</span>
                                        <span className="text-gray-900">123</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">שם החשבון:</span>
                                        <span className="text-gray-900">מכון נזר דוד</span>
                                    </div>
                                </div>
                            </div>

                            {/* PayPal */}
                            <div className="space-y-3">
                                <h3 className="font-medium text-gray-900">תרומה אונליין</h3>

                                <a
                                    href="#"
                                    className="w-full bg-yellow-500 text-white py-3 px-4 rounded-md hover:bg-yellow-600 flex items-center justify-center space-x-2 space-x-reverse"
                                >
                                    <CreditCard size={18} />
                                    <span>תרומה דרך PayPal</span>
                                    <ExternalLink size={16} />
                                </a>

                                <a
                                    href="#"
                                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2 space-x-reverse"
                                >
                                    <CreditCard size={18} />
                                    <span>תרומה דרך כרטיס אשראי</span>
                                    <ExternalLink size={16} />
                                </a>
                            </div>

                            {/* Tax Deduction */}
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-800">
                                    💡 המכון מוכר כמוסד ציבורי ותרומות זכאיות לקיזוז מס לפי סעיף 46 לפקודת מס הכנסה
                                </p>
                            </div>
                        </div>

                        {/* Volunteer */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">התנדבות</h3>
                            <p className="text-gray-700 mb-4">
                                מעוניינים להתנדב במכון? אנו מחפשים מתנדבים לסיוע בתמלול כתבי יד,
                                מחקר היסטורי ועבודות טכניות.
                            </p>
                            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                                צור קשר להתנדבות
                            </button>
                        </div>
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

export default Contact;
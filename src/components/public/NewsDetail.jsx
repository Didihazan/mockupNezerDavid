import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, User, Newspaper } from 'lucide-react';

const NewsDetail = () => {
    const { id } = useParams();

    // Mock news article data
    const article = {
        id: 1,
        title: "על הציונות הדתית ותפקידה",
        author: "הרב דוד כהן הנזיר",
        newspaper: "הפועל המזרחי",
        date: "1935-05-18",
        description: "מאמר יסוד על השקפת הציונות הדתית ותפקידה בבניין הארץ",
        content: `בימים אלה, כאשר עם ישראל חוזר לארצו, עלינו לבחון את משמעות השיבה הזו ואת התפקיד המוטל על הציונות הדתית בתהליך הבניין והחידוש.

הציונות הדתית איננה רק תנועה פוליטית או לאומית, אלא ביטוי עמוק של השאיפה היהודית הנצחית לשיבת ציון. היא מגשרת בין החזון הנבואי העתיק לבין המציאות הפרקטית של ימינו.

עלינו להבין כי השיבה לציון איננה רק חזרה פיזית לארץ, אלא תהליך רוחני עמוק של התחדשות עם ישראל. הארץ איננה רק מקום מגורים, אלא מרחב קדוש המיועד לביטוי השלם של החיים היהודיים.

התפקיד הגדול המוטל עלינו הוא לבנות בארץ חברה יהודית אמיתית, החיה על פי ערכי התורה והמסורת, תוך התמודדות עם אתגרי הזמן המודרני. אין זה מספיק לחזור לארץ פיזית - עלינו להחזיר את הארץ לתכונתה הרוחנית.

הציונות הדתית קוראת לנו לא רק להיות יהודים בארץ ישראל, אלא להיות ישראל בארץ ישראל - עם הממלא את ייעודו ההיסטורי והרוחני במולדתו.

הדרך לפנינו איננה קלה, והיא דורשת מאיתנו להיות ראויים לגדולת המשימה. עלינו לשלב בין נאמנות לערכי העבר לבין יכולת התמודדות עם דרישות ההווה והעתיד.

בכך נזכה להיות שותפים בגאולה השלמה של עם ישראל בארצו.`
    };

    // Mock related articles
    const relatedArticles = [
        {
            id: 2,
            title: "החינוך היהודי בארץ ישראל",
            author: "הרב שאר הישוב כהן",
            date: "1948-03-12"
        },
        {
            id: 3,
            title: "על התפילה ומעלתה",
            author: "הרב דוד כהן הנזיר",
            date: "1932-09-25"
        },
        {
            id: 4,
            title: "ירושלים - לב העולם הרוחני",
            author: "הרב שאר הישוב כהן",
            date: "1950-07-15"
        }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-green-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: פרטי קטע עיתון - תמונה + תמלול + המלצות
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link
                                to="/public/news"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <h1 className="text-xl font-bold text-gray-900">{article.title}</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Article Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>

                    <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <User size={16} />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <Newspaper size={16} />
                            <span>{article.newspaper}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <Calendar size={16} />
                            <span>{formatDate(article.date)}</span>
                        </div>
                    </div>

                    <p className="text-lg text-gray-700">{article.description}</p>
                </div>

                {/* Newspaper Image + Transcript */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    {/* Mock Newspaper Image */}
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 border-b">
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white p-6 shadow-md" style={{ fontFamily: 'serif' }}>
                                {/* Newspaper Header */}
                                <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">{article.newspaper}</h2>
                                    <p className="text-sm text-gray-600">{formatDate(article.date)}</p>
                                </div>

                                {/* Article in newspaper layout */}
                                <div className="columns-2 gap-4 text-sm text-gray-900 leading-relaxed">
                                    <h3 className="text-lg font-bold mb-3 column-span-2">{article.title}</h3>
                                    <p className="mb-3">בימים אלה, כאשר עם ישראל חוזר לארצו, עלינו לבחון את משמעות השיבה הזו ואת התפקיד המוטל על הציונות הדתית בתהליך הבניין והחידוש.</p>
                                    <p className="mb-3">הציונות הדתית איננה רק תנועה פוליטית או לאומית, אלא ביטוי עמוק של השאיפה היהודית הנצחית לשיבת ציון...</p>
                                    <p className="text-xs text-gray-600 mt-4">מאת: {article.author}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="p-4 bg-gray-50">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 space-x-reverse mx-auto">
                            <Download size={16} />
                            <span>הורד PDF</span>
                        </button>
                    </div>
                </div>

                {/* Full Transcript */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">תמלול מלא</h2>
                    <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                        {article.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">מאמרים נוספים</h3>
                    <div className="space-y-4">
                        {relatedArticles.map((relatedArticle) => (
                            <div key={relatedArticle.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">{relatedArticle.title}</h4>
                                        <div className="text-sm text-gray-600">
                                            <span>{relatedArticle.author}</span>
                                            <span className="mx-2">•</span>
                                            <span>{formatDate(relatedArticle.date)}</span>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/public/news/${relatedArticle.id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        קרא ←
                                    </Link>
                                </div>
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

export default NewsDetail;
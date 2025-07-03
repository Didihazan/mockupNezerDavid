import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react';

const ManuscriptGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Mock manuscripts data with transcribed pages
    const manuscripts = [
        {
            id: 1,
            title: "אורות הקודש - פרק א",
            author: "הרב דוד כהן הנזיר",
            dateWritten: "1925-03-15",
            pages: 12,
            description: "כתב יד מקורי של הפרק הראשון בספר אורות הקודש",
            thumbnails: [
                { id: 1, page: 1, title: "עמוד ראשון - פתיחה" },
                { id: 2, page: 2, title: "עמוד שני - יסודות הרוחניות" },
                { id: 3, page: 3, title: "עמוד שלישי - דרכי עבודה" }
            ]
        },
        {
            id: 2,
            title: "מכתב לתלמידים",
            author: "הרב שאר הישוב כהן",
            dateWritten: "1948-07-22",
            pages: 3,
            description: "מכתב אישי שנכתב לתלמידיו בישיבה",
            thumbnails: [
                { id: 4, page: 1, title: "עמוד ראשון - פתיחת המכתב" },
                { id: 5, page: 2, title: "עמוד שני - הדרכה רוחנית" },
                { id: 6, page: 3, title: "עמוד שלישי - סיום וברכה" }
            ]
        },
        {
            id: 3,
            title: "שיעור בתורת הסוד",
            author: "הרב שאר הישוב כהן",
            dateWritten: "1952-02-14",
            pages: 8,
            description: "רישומי שיעור אישיים בתורת הסוד",
            thumbnails: [
                { id: 7, page: 1, title: "עמוד ראשון - מבוא לתורת הסוד" },
                { id: 8, page: 2, title: "עמוד שני - יסודות קבליים" }
            ]
        }
    ];

    // Flatten all thumbnails for lightbox navigation
    const allThumbnails = manuscripts.flatMap(manuscript =>
        manuscript.thumbnails.map(thumb => ({
            ...thumb,
            manuscriptTitle: manuscript.title,
            author: manuscript.author
        }))
    );

    const openLightbox = (thumbnail, index) => {
        setSelectedImage(thumbnail);
        setCurrentImageIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        const newIndex = direction === 'next'
            ? (currentImageIndex + 1) % allThumbnails.length
            : (currentImageIndex - 1 + allThumbnails.length) % allThumbnails.length;

        setCurrentImageIndex(newIndex);
        setSelectedImage(allThumbnails[newIndex]);
    };

    const MockPageImage = ({ thumbnail, manuscript }) => (
        <div
            className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded shadow cursor-pointer hover:shadow-lg transition-shadow group relative overflow-hidden"
            onClick={() => openLightbox({...thumbnail, manuscriptTitle: manuscript.title, author: manuscript.author}, allThumbnails.findIndex(t => t.id === thumbnail.id))}
        >
            <div className="aspect-[3/4] p-4 flex flex-col">
                {/* Page Header */}
                <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-amber-900">{manuscript.title}</h4>
                    <p className="text-sm text-amber-700">עמוד {thumbnail.page}</p>
                </div>

                {/* Mock manuscript content */}
                <div className="flex-1 text-amber-900 text-xs leading-relaxed">
                    <div className="space-y-2">
                        <p>בראשית דברינו, עלינו להבין כי הרוחניות היהודית איננה עניין של פילוסופיה מופשטת...</p>
                        <p>הנשמה היהודית נוצרה בצלם אלוהים, ובתוכה טמונים כוחות רוחניים עצומים...</p>
                        <p>שלושה עמודים עיקריים נושאים את הבניין הרוחני: התורה, העבודה, וגמילות חסדים...</p>
                    </div>
                </div>

                {/* Page Number */}
                <div className="text-center text-xs text-amber-600 mt-2">
                    דף {thumbnail.page}
                </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2">
                    <ZoomIn size={20} className="text-gray-700" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-green-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: גלריית כתבי יד - Grid Thumbnails + Lightbox לניווט
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
                            <h1 className="text-2xl font-bold text-gray-900">גלריית כתבי יד</h1>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {allThumbnails.length} עמודים מתומללים
              </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Manuscripts Grid */}
                <div className="space-y-8">
                    {manuscripts.map((manuscript) => (
                        <div key={manuscript.id} className="bg-white rounded-lg shadow-sm p-6">
                            {/* Manuscript Header */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{manuscript.title}</h2>
                                <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                                    <span>{manuscript.author}</span>
                                    <span>•</span>
                                    <span>{new Date(manuscript.dateWritten).toLocaleDateString('he-IL')}</span>
                                    <span>•</span>
                                    <span>{manuscript.pages} עמודים</span>
                                </div>
                                <p className="text-gray-700 mt-2">{manuscript.description}</p>
                            </div>

                            {/* Page Thumbnails */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {manuscript.thumbnails.map((thumbnail) => (
                                    <MockPageImage
                                        key={thumbnail.id}
                                        thumbnail={thumbnail}
                                        manuscript={manuscript}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
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

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="relative max-w-4xl max-h-full p-4">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 left-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={() => navigateImage('prev')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <button
                            onClick={() => navigateImage('next')}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* Image */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                            <div className="aspect-[3/4] max-h-[80vh] bg-gradient-to-br from-amber-50 to-amber-100 p-8">
                                {/* Full Page View */}
                                <div className="h-full flex flex-col">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-amber-900">{selectedImage.manuscriptTitle}</h3>
                                        <p className="text-lg text-amber-700">{selectedImage.author}</p>
                                        <p className="text-md text-amber-600">עמוד {selectedImage.page}</p>
                                    </div>

                                    <div className="flex-1 text-amber-900 text-sm leading-relaxed space-y-4">
                                        <p>בראשית דברינו, עלינו להבין כי הרוחניות היהודית איננה עניין של פילוסופיה מופשטת, אלא דרך חיים מעשית ומוחשית. הדרך אל האלוהות פתוחה בפני כל יהודי, ואין היא נחלתם הבלעדית של יחידי סגולה.</p>

                                        <p>הנשמה היהודית נוצרה בצלם אלוהים, ובתוכה טמונים כוחות רוחניים עצומים הממתינים להתעוררות. על האדם לפתח כוחות אלה באמצעות עבודה רוחנית מתמדת, הכוללת תפילה, לימוד תורה ומעשים טובים.</p>

                                        <p>שלושה עמודים עיקריים נושאים את הבניין הרוחני: התורה - המהווה את הבסיס הרעיוני והערכי, העבודה - כוונת הלב בתפילה ובמצוות, וגמילות חסדים - הביטוי המעשי של הרוחניות.</p>

                                        <p>כל עמוד מאלה חיוני לבניין השלם, ואין אחד מהם יכול לעמוד בפני עצמו. הקשר ביניהם יוצר הרמוניה רוחנית המובילה לדבקות באלוהות.</p>
                                    </div>

                                    <div className="text-center text-amber-600 mt-4">
                                        דף {selectedImage.page} | {selectedImage.title}
                                    </div>
                                </div>
                            </div>

                            {/* Image Info Bar */}
                            <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium text-gray-900">{selectedImage.title}</h4>
                                    <p className="text-sm text-gray-600">
                                        {selectedImage.manuscriptTitle} - עמוד {selectedImage.page}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                                    <span>{currentImageIndex + 1} מתוך {allThumbnails.length}</span>
                                    <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 space-x-reverse">
                                        <Download size={14} />
                                        <span>הורד</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManuscriptGallery;
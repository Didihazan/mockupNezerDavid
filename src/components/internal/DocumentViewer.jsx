import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Download,
    Edit,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Copy,
    MessageSquare,
    Share2,
    FileText,
    Eye,
    EyeOff,
    Maximize2,
    Minimize2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const DocumentViewer = () => {
    const { id } = useParams();

    // Mock document data
    const document = {
        id: 1,
        title: "אורות הקודש - פרק א",
        author: "הרב דוד כהן הנזיר",
        category: "כתב יד",
        type: "manuscript",
        status: "transcribed",
        hasTranscript: true,
        dateWritten: "1925-03-15",
        pages: 12,
        tags: ["קבלה", "רוחניות"],
        description: "פרק פתיחה בספר אורות הקודש, העוסק בייסודות הרוחניות היהודית",
        sourcePath: "/documents/sources/orot_kodesh_1.pdf",
        transcriptPath: "/documents/transcripts/orot_kodesh_1.docx"
    };

    // Mock transcript content
    const mockTranscript = `
אורות הקודש - פרק א: יסודות הרוחניות

בראשית דברינו, עלינו להבין כי הרוחניות היהודית איננה עניין של פילוסופיה מופשטת, אלא דרך חיים מעשית ומוחשית. הדרך אל האלוהות פתוחה בפני כל יהודי, ואין היא נחלתם הבלעדית של יחידי סגולה.

הנשמה היהודית נוצרה בצלם אלוהים, ובתוכה טמונים כוחות רוחניים עצומים הממתינים להתעוררות. על האדם לפתח כוחות אלה באמצעות עבודה רוחנית מתמדת, הכוללת תפילה, לימוד תורה ומעשים טובים.

שלושה עמודים עיקריים נושאים את הבניין הרוחני:

1. התורה - המהווה את הבסיס הרעיוני והערכי
2. העבודה - כוונת הלב בתפילה ובמצוות  
3. גמילות חסדים - הביטוי המעשי של הרוחניות

כל עמוד מאלה חיוני לבניין השלם, ואין אחד מהם יכול לעמוד בפני עצמו. הקשר ביניהם יוצר הרמוניה רוחנית המובילה לדבקות באלוהות.

הדרך איננה קלה ודורשת התמדה וסבלנות. לעתים נדמה כי המטרה רחוקה מהישג, אך אין ליאש. כל צעד קטן בדרך הרוחניות הוא בעל ערך עצום, וכל מעשה טוב מקרב אותנו אל המטרה הנשגבת.

על החונך הרוחני לזכור כי כל נפש היא עולם ומלואו, וכל אחד זקוק לגישה מותאמת אישית. אין דרך אחת המתאימה לכל, והחכמה היא למצוא עבור כל תלמיד את הדרך המתאימה לו.

בזמננו, כאשר העולם משתנה במהירות רבה, חשוב יותר מתמיד לשמור על הערכים הרוחניים הנצחיים. טכנולוגיה וקידמה חומרית הם ברכה, אך אסור להם לבוא על חשבון החיים הרוחניים.

נסיים בברכה שכל יהודי יזכה למצוא את דרכו הייחודית לעבודת ה', ושיהיה שותף בבניין העולם הרוחני המתחדש.
  `;

    const [zoom, setZoom] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showTranscript, setShowTranscript] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [comments, setComments] = useState([
        {
            id: 1,
            text: "נקודה חשובה על הקשר בין תורה לעבודה",
            position: { line: 15, word: 3 },
            author: "ד״ר רחל לוי",
            date: "2024-12-18",
            resolved: false
        },
        {
            id: 2,
            text: "ביטוי יפה זה - כדאי להדגיש",
            position: { line: 22, word: 8 },
            author: "יוסף גולדברג",
            date: "2024-12-17",
            resolved: true
        }
    ]);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 25, 200));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 25, 50));
    };

    const handleRotate = () => {
        setRotation(prev => (prev + 90) % 360);
    };

    const handleDownloadSource = () => {
        alert('במוקאפ: מתחיל הורדת קובץ המקור...');
    };

    const handleDownloadTranscript = () => {
        alert('במוקאפ: מתחיל הורדת קובץ התמלול...');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('קישור הועתק ללוח!');
    };

    const handleAddComment = () => {
        if (selectedText) {
            const newComment = {
                id: Date.now(),
                text: `הערה על: "${selectedText}"`,
                position: { line: Math.floor(Math.random() * 30), word: Math.floor(Math.random() * 10) },
                author: "משתמש נוכחי",
                date: new Date().toISOString().split('T')[0],
                resolved: false
            };
            setComments(prev => [...prev, newComment]);
            setSelectedText('');
            alert('הערה נוספה בהצלחה!');
        } else {
            alert('נא לבחור טקסט לפני הוספת הערה');
        }
    };

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
            setSelectedText(selection.toString());
        }
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

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: מסך צפייה במסמך - שתי עמודות: PDF/תמונה + תמלול
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link
                                to="/internal/documents"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">{document.title}</h1>
                                <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-500">
                                    <span>{document.author}</span>
                                    <span>•</span>
                                    <span>{document.category}</span>
                                    <span>•</span>
                                    <span>{document.pages} עמודים</span>
                                    <span>•</span>
                                    {getStatusBadge(document.status)}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 space-x-reverse">
                            <Link
                                to={`/internal/documents/edit/${id}`}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Edit size={16} />
                                <span>ערוך</span>
                            </Link>

                            <button
                                onClick={handleCopyLink}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Share2 size={16} />
                                <span>שתף</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Toolbar */}
            <div className="bg-white border-b px-4 py-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4 space-x-reverse">
                        {/* Zoom Controls */}
                        <div className="flex items-center space-x-2 space-x-reverse border-l border-gray-300 pl-4">
                            <button
                                onClick={handleZoomOut}
                                className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                                title="הקטן"
                            >
                                <ZoomOut size={18} />
                            </button>
                            <span className="text-sm text-gray-600 min-w-12 text-center">{zoom}%</span>
                            <button
                                onClick={handleZoomIn}
                                className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                                title="הגדל"
                            >
                                <ZoomIn size={18} />
                            </button>
                        </div>

                        {/* Rotate */}
                        <button
                            onClick={handleRotate}
                            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded border-l border-gray-300 pl-4"
                            title="סובב"
                        >
                            <RotateCw size={18} />
                        </button>

                        {/* Page Navigation */}
                        <div className="flex items-center space-x-2 space-x-reverse border-l border-gray-300 pl-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded disabled:opacity-50"
                            >
                                <ChevronRight size={18} />
                            </button>
                            <span className="text-sm text-gray-600">
                עמוד {currentPage} מתוך {document.pages}
              </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, document.pages))}
                                disabled={currentPage === document.pages}
                                className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded disabled:opacity-50"
                            >
                                <ChevronLeft size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 space-x-reverse">
                        {/* Transcript Toggle */}
                        <button
                            onClick={() => setShowTranscript(!showTranscript)}
                            className={`flex items-center space-x-2 space-x-reverse px-3 py-1 rounded text-sm ${
                                showTranscript ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            {showTranscript ? <EyeOff size={16} /> : <Eye size={16} />}
                            <span>{showTranscript ? 'הסתר תמלול' : 'הצג תמלול'}</span>
                        </button>

                        {/* Fullscreen */}
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                            title={isFullscreen ? 'צא ממסך מלא' : 'מסך מלא'}
                        >
                            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>

                        {/* Download Buttons */}
                        <button
                            onClick={handleDownloadSource}
                            className="flex items-center space-x-2 space-x-reverse px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                            <Download size={16} />
                            <span>הורד מקור</span>
                        </button>

                        {document.hasTranscript && (
                            <button
                                onClick={handleDownloadTranscript}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                                <FileText size={16} />
                                <span>הורד תמלול</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
                {/* Document Viewer - Left Side */}
                <div className={`${showTranscript ? 'w-1/2' : 'w-full'} bg-gray-100 flex flex-col`}>
                    <div className="flex-1 flex items-center justify-center p-6">
                        <div
                            className="bg-white shadow-lg"
                            style={{
                                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                                transformOrigin: 'center center'
                            }}
                        >
                            {/* Mock PDF/Image Display */}
                            <div className="w-96 h-96 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-8 relative">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-amber-900 mb-2">אורות הקודש</h2>
                                    <p className="text-lg text-amber-800">פרק א</p>
                                </div>

                                <div className="space-y-3 text-sm text-amber-900">
                                    <p className="leading-relaxed">
                                        בראשית דברינו, עלינו להבין כי הרוחניות היהודית איננה עניין של פילוסופיה מופשטת...
                                    </p>
                                    <p className="leading-relaxed">
                                        הנשמה היהודית נוצרה בצלם אלוהים, ובתוכה טמונים כוחות רוחניים עצומים...
                                    </p>
                                    <p className="leading-relaxed">
                                        שלושה עמודים עיקריים נושאים את הבניין הרוחני:
                                    </p>
                                    <div className="pr-4 space-y-1 text-xs">
                                        <p>1. התורה - המהווה את הבסיס הרעיוני</p>
                                        <p>2. העבודה - כוונת הלב בתפילה</p>
                                        <p>3. גמילות חסדים - הביטוי המעשי</p>
                                    </div>
                                </div>

                                {/* Mock manuscript styling */}
                                <div className="absolute top-4 left-4 text-xs text-amber-600">
                                    📜 עמוד {currentPage}
                                </div>
                                <div className="absolute bottom-4 right-4 text-xs text-amber-600">
                                    כ״ה אדר תרפ״ה
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page Navigation */}
                    <div className="p-4 bg-white border-t">
                        <div className="flex items-center justify-center space-x-4 space-x-reverse">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                ראשון
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                קודם
                            </button>

                            <div className="flex space-x-1 space-x-reverse">
                                {[...Array(Math.min(document.pages, 5))].map((_, i) => {
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
                                {document.pages > 5 && (
                                    <span className="px-2 py-1 text-sm text-gray-500">...</span>
                                )}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, document.pages))}
                                disabled={currentPage === document.pages}
                                className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                הבא
                            </button>
                            <button
                                onClick={() => setCurrentPage(document.pages)}
                                disabled={currentPage === document.pages}
                                className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                אחרון
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transcript Panel - Right Side */}
                {showTranscript && (
                    <div className="w-1/2 bg-white border-r flex flex-col">
                        <div className="p-4 border-b bg-gray-50">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium text-gray-900">תמלול</h3>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <button
                                        onClick={handleAddComment}
                                        disabled={!selectedText}
                                        className="flex items-center space-x-1 space-x-reverse px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        <MessageSquare size={14} />
                                        <span>הוסף הערה</span>
                                    </button>
                                </div>
                            </div>

                            {selectedText && (
                                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                                    <strong>טקסט נבחר:</strong> "{selectedText}"
                                </div>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <div
                                className="prose max-w-none text-gray-900 leading-relaxed"
                                onMouseUp={handleTextSelection}
                                style={{ fontSize: '16px', lineHeight: '1.8' }}
                            >
                                {mockTranscript.split('\n').map((paragraph, index) => (
                                    paragraph.trim() && (
                                        <p key={index} className="mb-4 relative">
                                            {paragraph.trim()}

                                            {/* Show comments for this paragraph */}
                                            {comments
                                                .filter(comment => comment.position.line === index)
                                                .map(comment => (
                                                    <span
                                                        key={comment.id}
                                                        className={`inline-block w-3 h-3 rounded-full ml-2 cursor-pointer ${
                                                            comment.resolved ? 'bg-green-400' : 'bg-yellow-400'
                                                        }`}
                                                        title={`${comment.author}: ${comment.text}`}
                                                    />
                                                ))}
                                        </p>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="border-t bg-gray-50 p-4">
                            <h4 className="font-medium text-gray-900 mb-3">הערות ({comments.length})</h4>
                            <div className="space-y-3 max-h-40 overflow-y-auto">
                                {comments.map(comment => (
                                    <div key={comment.id} className="bg-white p-3 rounded border text-sm">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-medium text-gray-900">{comment.author}</span>
                                            <span className="text-xs text-gray-500">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-700">{comment.text}</p>
                                        <div className="mt-2 flex items-center space-x-2 space-x-reverse">
                      <span className={`text-xs px-2 py-1 rounded ${
                          comment.resolved
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {comment.resolved ? 'נפתר' : 'פעיל'}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            {!isFullscreen && (
                <div className="bg-white border-t p-4 text-center">
                    <Link
                        to="/internal"
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← חזרה לתפריט המערכת הפנימית
                    </Link>
                </div>
            )}
        </div>
    );
};

export default DocumentViewer;
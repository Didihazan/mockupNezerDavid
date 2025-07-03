// =========== נתוני משתמשים ===========
export const mockUsers = [
    {
        id: 1,
        name: "ד״ר אברהם כהן",
        email: "avraham@nazer-david.org.il",
        role: "admin",
        groups: ["מנהלים", "חוקרים"],
        status: "active",
        lastLogin: "2024-12-20T08:30:00Z",
        createdAt: "2024-01-15T10:00:00Z"
    },
    {
        id: 2,
        name: "ד״ר רחל לוי",
        email: "rachel@nazer-david.org.il",
        role: "researcher",
        groups: ["חוקרים"],
        status: "active",
        lastLogin: "2024-12-19T14:20:00Z",
        createdAt: "2024-03-10T09:15:00Z"
    },
    {
        id: 3,
        name: "יוסף גולדברג",
        email: "yosef@nazer-david.org.il",
        role: "researcher",
        groups: ["חוקרים", "עורכים"],
        status: "active",
        lastLogin: "2024-12-18T16:45:00Z",
        createdAt: "2024-06-20T11:30:00Z"
    },
    {
        id: 4,
        name: "שרה דוידסון",
        email: "sarah@nazer-david.org.il",
        role: "researcher",
        groups: ["חוקרים"],
        status: "suspended",
        lastLogin: "2024-11-15T13:10:00Z",
        createdAt: "2024-09-05T08:45:00Z"
    }
];

// =========== נתוני מסמכים ===========
export const mockDocuments = [
    {
        id: 1,
        title: "אורות הקודש - פרק א",
        author: "הרב דוד כהן הנזיר",
        category: "כתב יד",
        type: "manuscript",
        status: "transcribed",
        hasTranscript: true,
        sourcePath: "/documents/sources/orot_kodesh_1.pdf",
        transcriptPath: "/documents/transcripts/orot_kodesh_1.docx",
        tags: ["קבלה", "רוחניות", "פילוסופיה יהודית"],
        description: "פרק פתיחה בספר אורות הקודש, העוסק בייסודות הרוחניות היהודית",
        dateWritten: "1925-03-15",
        createdAt: "2024-12-15T10:30:00Z",
        updatedAt: "2024-12-15T14:20:00Z",
        createdBy: 1,
        pages: 12,
        language: "עברית",
        condition: "טובה"
    },
    {
        id: 2,
        title: "מכתב לתלמידים",
        author: "הרב שאר הישוב כהן",
        category: "כתב יד",
        type: "manuscript",
        status: "in_transcription",
        hasTranscript: false,
        sourcePath: "/documents/sources/letter_students.jpg",
        transcriptPath: null,
        tags: ["מכתבים", "חינוך", "הדרכה"],
        description: "מכתב אישי שנשלח לתלמידים בישיבה",
        dateWritten: "1948-07-22",
        createdAt: "2024-12-12T09:15:00Z",
        updatedAt: "2024-12-18T11:30:00Z",
        createdBy: 2,
        pages: 3,
        language: "עברית",
        condition: "בינונית"
    },
    {
        id: 3,
        title: "הדר ישראל - מבוא",
        author: "הרב דוד כהן הנזיר",
        category: "ספר",
        type: "book",
        status: "published",
        hasTranscript: true,
        sourcePath: "/documents/sources/hadar_israel_intro.docx",
        transcriptPath: "/documents/transcripts/hadar_israel_intro.docx",
        tags: ["ספר", "הדר ישראל", "מבוא"],
        description: "מבוא לספר הדר ישראל על מעלת עם ישראל",
        dateWritten: "1930-11-08",
        createdAt: "2024-12-10T15:45:00Z",
        updatedAt: "2024-12-16T09:20:00Z",
        createdBy: 1,
        pages: 25,
        language: "עברית",
        condition: "מעולה"
    },
    {
        id: 4,
        title: "כתבה על הציונות הדתית",
        author: "הרב דוד כהן הנזיר",
        category: "קטע עיתון",
        type: "newspaper",
        status: "transcribed",
        hasTranscript: true,
        sourcePath: "/documents/sources/zionism_article.jpg",
        transcriptPath: "/documents/transcripts/zionism_article.docx",
        tags: ["ציונות", "עיתונות", "רעיונות"],
        description: "כתבה שפורסמה בעיתון הפועל המזרחי על הציונות הדתית",
        dateWritten: "1935-05-18",
        createdAt: "2024-12-08T12:00:00Z",
        updatedAt: "2024-12-14T16:15:00Z",
        createdBy: 3,
        pages: 2,
        language: "עברית",
        condition: "טובה"
    },
    {
        id: 5,
        title: "שיעור בתורת הסוד",
        author: "הרב שאר הישוב כהן",
        category: "כתב יד",
        type: "manuscript",
        status: "draft",
        hasTranscript: false,
        sourcePath: "/documents/sources/sod_lesson.pdf",
        transcriptPath: null,
        tags: ["קבלה", "שיעורים", "סוד"],
        description: "רישומי שיעור בתורת הסוד שנמסר לתלמידים",
        dateWritten: "1952-02-14",
        createdAt: "2024-12-05T11:20:00Z",
        updatedAt: "2024-12-17T13:40:00Z",
        createdBy: 2,
        pages: 8,
        language: "עברית",
        condition: "בינונית"
    }
];

// =========== נתוני ספרים לאתר הציבורי ===========
export const mockBooks = [
    {
        id: 1,
        title: "אורות הקודש",
        author: "הרב דוד כהן הנזיר",
        year: 1925,
        category: "קבלה ורוחניות",
        description: "ספר יסוד בתורת הקבלה והרוחניות היהודית, המתאר את דרכי העבודה הרוחנית והתקרבות לאלוהות",
        coverImage: "/images/books/orot_kodesh_cover.jpg",
        pages: 284,
        publisher: "מכון אריאל",
        isbn: "978-965-000-001-1",
        status: "available",
        summary: "ספר זה עוסק בעקרונות היסוד של החיים הרוחניים ובדרכי השגת הדבקות האלוהית. המחבר מציג גישה ייחודית המשלבת בין תורת הקבלה למחשבה פילוסופית מודרנית.",
        relatedDocuments: [1, 3]
    },
    {
        id: 2,
        title: "הדר ישראל",
        author: "הרב דוד כהן הנזיר",
        year: 1930,
        category: "פילוסופיה יהודית",
        description: "חיבור על מעלת עם ישראל ותפקידו בעולם, המתבסס על מקורות תורניים ומחשבת חז״ל",
        coverImage: "/images/books/hadar_israel_cover.jpg",
        pages: 312,
        publisher: "מכון אריאל",
        isbn: "978-965-000-002-8",
        status: "available",
        summary: "המחבר בוחן את ייחודו של עם ישראל ואת השליחות הרוחנית המוטלת עליו. הספר משלב בין מקורות מסורתיים לבין תובנות חדשות על המקום של היהדות בעולם המודרני.",
        relatedDocuments: [3]
    },
    {
        id: 3,
        title: "אגרות הראיה",
        author: "הרב שאר הישוב כהן",
        year: 1952,
        category: "מכתבים והדרכה",
        description: "אוסף מכתבים ואגרות שנכתבו לתלמידים ולאנשי רוח, המכילים הדרכה רוחנית ופרקטית",
        coverImage: "/images/books/igrot_hareaya_cover.jpg",
        pages: 198,
        publisher: "מכון אריאל",
        isbn: "978-965-000-003-5",
        status: "available",
        summary: "אוסף מכתבים אינטימיים המגלים את עומק דמותו של המחבר ואת גישתו החינוכית. המכתבים עוסקים בשאלות יום-יומיות ורוחניות כאחד.",
        relatedDocuments: [2]
    },
    {
        id: 4,
        title: "נר דוד - קובץ מאמרים",
        author: "הרב דוד כהן הנזיר",
        year: 1928,
        category: "מאמרים ומחשבות",
        description: "אוסף מאמרים שפורסמו בעיתונות החרדית והציונית-דתית, העוסקים בנושאים אקטואליים",
        coverImage: "/images/books/ner_david_cover.jpg",
        pages: 156,
        publisher: "מכון אריאל",
        isbn: "978-965-000-004-2",
        status: "available",
        summary: "קובץ מאמרים הבוחן את הזירה הציבורית והרוחנית של התקופה. המחבר מציע פרשנות יהודית לאתגרים הרוחניים והחברתיים של דורו.",
        relatedDocuments: [4]
    }
];

// =========== נתוני קטעי עיתון ===========
export const mockNews = [
    {
        id: 1,
        title: "על הציונות הדתית ותפקידה",
        author: "הרב דוד כהן הנזיר",
        newspaper: "הפועל המזרחי",
        date: "1935-05-18",
        description: "מאמר יסוד על השקפת הציונות הדתית ותפקידה בבניין הארץ",
        imageUrl: "/images/news/zionism_article.jpg",
        content: "בימים אלה, כאשר עם ישראל חוזר לארצו, עלינו לבחון את משמעות השיבה הזו ואת התפקיד המוטל על הציונות הדתית...",
        tags: ["ציונות דתית", "בניין הארץ", "השקפה"],
        relatedArticles: [2, 3]
    },
    {
        id: 2,
        title: "החינוך היהודי בארץ ישראל",
        author: "הרב שאר הישוב כהן",
        newspaper: "דגל ירושלים",
        date: "1948-03-12",
        description: "מאמר על עקרונות החינוך היהודי במדינה המתחדשת",
        imageUrl: "/images/news/education_article.jpg",
        content: "עם קום המדינה, חובה עלינו לבנות מערכת חינוך המבוססת על ערכי התורה והמסורת...",
        tags: ["חינוך", "מדינת ישראל", "ערכים"],
        relatedArticles: [1, 4]
    },
    {
        id: 3,
        title: "על התפילה ומעלתה",
        author: "הרב דוד כהן הנזיר",
        newspaper: "המבשר",
        date: "1932-09-25",
        description: "דברים על עומק התפילה ומקומה בעבודת השם",
        imageUrl: "/images/news/prayer_article.jpg",
        content: "התפילה איננה רק בקשה, אלא דרך להתקרב אל האלוהות ולהעמיק את הקשר הרוחני...",
        tags: ["תפילה", "רוחניות", "עבודת השם"],
        relatedArticles: [1]
    },
    {
        id: 4,
        title: "ירושלים - לב העולם הרוחני",
        author: "הרב שאר הישוב כהן",
        newspaper: "כל ישראל",
        date: "1950-07-15",
        description: "מאמר על מעמדה הרוחני המיוחד של ירושלים",
        imageUrl: "/images/news/jerusalem_article.jpg",
        content: "ירושלים איננה עיר כשאר הערים. היא מרכז רוחני שמקרין על העולם כולו...",
        tags: ["ירושלים", "קדושה", "מרכז רוחני"],
        relatedArticles: [2, 3]
    }
];

// =========== נתוני כתבי יד ===========
export const mockManuscripts = [
    {
        id: 1,
        title: "אורות הקודש - פרק א",
        author: "הרב דוד כהן הנזיר",
        dateWritten: "1925-03-15",
        pages: 12,
        description: "כתב יד מקורי של הפרק הראשון בספר אורות הקודש",
        thumbnails: [
            "/images/manuscripts/orot_kodesh_p1_thumb.jpg",
            "/images/manuscripts/orot_kodesh_p2_thumb.jpg",
            "/images/manuscripts/orot_kodesh_p3_thumb.jpg"
        ],
        fullImages: [
            "/images/manuscripts/orot_kodesh_p1_full.jpg",
            "/images/manuscripts/orot_kodesh_p2_full.jpg",
            "/images/manuscripts/orot_kodesh_p3_full.jpg"
        ],
        hasTranscript: true,
        status: "transcribed",
        condition: "טובה",
        tags: ["קבלה", "רוחניות", "כתב יד מקורי"]
    },
    {
        id: 2,
        title: "שיעור בתורת הסוד",
        author: "הרב שאר הישוב כהן",
        dateWritten: "1952-02-14",
        pages: 8,
        description: "רישומי שיעור אישיים בתורת הסוד",
        thumbnails: [
            "/images/manuscripts/sod_lesson_p1_thumb.jpg",
            "/images/manuscripts/sod_lesson_p2_thumb.jpg"
        ],
        fullImages: [
            "/images/manuscripts/sod_lesson_p1_full.jpg",
            "/images/manuscripts/sod_lesson_p2_full.jpg"
        ],
        hasTranscript: false,
        status: "draft",
        condition: "בינונית",
        tags: ["קבלה", "שיעורים", "רישומים אישיים"]
    },
    {
        id: 3,
        title: "מכתב לתלמידים",
        author: "הרב שאר הישוב כהן",
        dateWritten: "1948-07-22",
        pages: 3,
        description: "מכתב אישי שנכתב לתלמידיו בישיבה",
        thumbnails: [
            "/images/manuscripts/letter_students_thumb.jpg"
        ],
        fullImages: [
            "/images/manuscripts/letter_students_full.jpg"
        ],
        hasTranscript: false,
        status: "in_transcription",
        condition: "בינונית",
        tags: ["מכתבים", "תלמידים", "הדרכה"]
    }
];

// =========== נתוני התראות ===========
export const mockNotifications = [
    {
        id: 1,
        title: "תמלול חדש הושלם",
        message: "התמלול של 'אורות הקודש - פרק א' הושלם בהצלחה",
        type: "transcript_completed",
        isRead: false,
        createdAt: "2024-12-20T10:30:00Z",
        userId: 2,
        documentId: 1,
        priority: "medium"
    },
    {
        id: 2,
        title: "מסמך חדש נוסף",
        message: "נוסף מסמך חדש: 'מכתב לתלמידים' על ידי ד״ר רחל לוי",
        type: "document_added",
        isRead: false,
        createdAt: "2024-12-19T14:15:00Z",
        userId: 1,
        documentId: 2,
        priority: "low"
    },
    {
        id: 3,
        title: "עדכון מטה-דאטה",
        message: "המטה-דאטה של 'הדר ישראל - מבוא' עודכנה",
        type: "metadata_updated",
        isRead: true,
        createdAt: "2024-12-18T09:45:00Z",
        userId: 3,
        documentId: 3,
        priority: "low"
    },
    {
        id: 4,
        title: "משתמש חדש נרשם",
        message: "משתמש חדש 'יוסף גולדברג' נרשם למערכת",
        type: "user_registered",
        isRead: true,
        createdAt: "2024-12-17T16:20:00Z",
        userId: 1,
        documentId: null,
        priority: "medium"
    },
    {
        id: 5,
        title: "תזכורת לתמלול",
        message: "יש 3 מסמכים הממתינים לתמלול",
        type: "transcription_reminder",
        isRead: false,
        createdAt: "2024-12-16T08:00:00Z",
        userId: 2,
        documentId: null,
        priority: "high"
    }
];

// =========== סטטיסטיקות למוקאפ ===========
export const mockStats = {
    totalDocuments: 127,
    newDocuments: 12,
    recentSearches: 45,
    newComments: 8,
    pendingTranscriptions: 15,
    activeUsers: 23,
    monthlyUploads: 34,
    completedTranscriptions: 89
};

// =========== תגים ===========
export const mockTags = [
    "קבלה", "רוחניות", "פילוסופיה יהודית", "מכתבים", "חינוך",
    "הדרכה", "ציונות", "עיתונות", "רעיונות", "שיעורים",
    "סוד", "תפילה", "ירושלים", "קדושה", "מסורת", "הלכה",
    "מחשבה", "השקפה", "ספרות", "תורה", "מדינת ישראל"
];

// =========== פונקציות עזר ===========
export const getDocumentsByStatus = (status) => {
    return mockDocuments.filter(doc => doc.status === status);
};

export const getDocumentsByAuthor = (author) => {
    return mockDocuments.filter(doc => doc.author === author);
};

export const getUnreadNotifications = () => {
    return mockNotifications.filter(notification => !notification.isRead);
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
};

export const getDocumentTypeIcon = (type) => {
    const icons = {
        manuscript: "📜",
        book: "📚",
        newspaper: "📰"
    };
    return icons[type] || "📄";
};

export const getStatusBadgeColor = (status) => {
    const colors = {
        transcribed: "bg-green-100 text-green-800",
        in_transcription: "bg-yellow-100 text-yellow-800",
        draft: "bg-gray-100 text-gray-800",
        published: "bg-blue-100 text-blue-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
};
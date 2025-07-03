import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, Upload, FileText, History, Users, Eye, Calendar, Tag, User } from 'lucide-react';

const DocumentEdit = () => {
    const { id } = useParams();

    // Mock existing document data
    const existingDocument = {
        id: 1,
        title: "אורות הקודש - פרק א",
        author: "הרב דוד כהן הנזיר",
        category: "כתב יד",
        type: "manuscript",
        status: "transcribed",
        hasTranscript: true,
        dateWritten: "1925-03-15",
        createdAt: "2024-12-15",
        updatedAt: "2024-12-15",
        pages: 12,
        tags: ["קבלה", "רוחניות"],
        description: "פרק פתיחה בספר אורות הקודש, העוסק בייסודות הרוחניות היהודית",
        language: "עברית",
        condition: "טובה",
        sourcePath: "/documents/sources/orot_kodesh_1.pdf",
        transcriptPath: "/documents/transcripts/orot_kodesh_1.docx",
        permissions: ["חוקרים", "מנהלים"],
        notes: "נוסח מקורי עם הערות בשוליים"
    };

    const [formData, setFormData] = useState(existingDocument);
    const [showHistory, setShowHistory] = useState(false);
    const [showPermissions, setShowPermissions] = useState(false);
    const [newTranscriptFile, setNewTranscriptFile] = useState(null);

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
        { value: "כתב יד", label: "כתב יד", icon: "📜" },
        { value: "ספר", label: "ספר", icon: "📚" },
        { value: "קטע עיתון", label: "קטע עיתון", icon: "📰" }
    ];

    const conditions = [
        "מעולה", "טובה", "בינונית", "דורשת שיקום"
    ];

    const statusOptions = [
        { value: "draft", label: "טיוטה", color: "gray" },
        { value: "in_transcription", label: "בתמלול", color: "yellow" },
        { value: "transcribed", label: "מתומלל", color: "green" },
        { value: "published", label: "פורסם", color: "blue" }
    ];

    const userGroups = [
        "מנהלים", "חוקרים", "עורכים", "אורחים"
    ];

    const versionHistory = [
        {
            id: 1,
            date: "2024-12-15T14:20:00Z",
            user: "הראל כהן",
            action: "עדכון מטה-דאטה",
            details: "הוספת תגים ותיאור מפורט"
        },
        {
            id: 2,
            date: "2024-12-15T10:30:00Z",
            user: "ד״ר רחל לוי",
            action: "העלאת מסמך",
            details: "יצירה ראשונית של המסמך"
        },
        {
            id: 3,
            date: "2024-12-10T16:45:00Z",
            user: "יוסף גולדברג",
            action: "החלפת תמלול",
            details: "עדכון קובץ התמלול עם תיקונים"
        }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleTagToggle = (tag) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const handlePermissionToggle = (group) => {
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.includes(group)
                ? prev.permissions.filter(p => p !== group)
                : [...prev.permissions, group]
        }));
    };

    const handleSave = () => {
        alert('במוקאפ: המסמך נשמר בהצלחה!');
    };

    const handleTranscriptUpload = (file) => {
        setNewTranscriptFile(file);
        alert(`במוקאפ: קובץ התמלול "${file.name}" הועלה בהצלחה!`);
    };

    const getStatusBadge = (status) => {
        const statusConfig = statusOptions.find(s => s.value === status);
        const colorClasses = {
            gray: "bg-gray-100 text-gray-800",
            yellow: "bg-yellow-100 text-yellow-800",
            green: "bg-green-100 text-green-800",
            blue: "bg-blue-100 text-blue-800"
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[statusConfig?.color || 'gray']}`}>
        {statusConfig?.label || status}
      </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: מסך עריכת מסמך - שדות ממולאים מראש + אפשרויות מתקדמות
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
                                <h1 className="text-2xl font-bold text-gray-900">עריכת מסמך</h1>
                                <p className="text-sm text-gray-500">מסמך #{id}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 space-x-reverse">
                            <Link
                                to={`/internal/documents/view/${id}`}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Eye size={16} />
                                <span>תצוגה</span>
                            </Link>

                            <button
                                onClick={() => setShowHistory(true)}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <History size={16} />
                                <span>היסטוריה</span>
                            </button>

                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                <Save size={16} />
                                <span>שמור</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Document Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">פרטי המסמך</h3>

                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        כותרת המסמך
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Author */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        כותב
                                    </label>
                                    <select
                                        value={formData.author}
                                        onChange={(e) => handleInputChange('author', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {authors.map(author => (
                                            <option key={author} value={author}>{author}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Category & Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            קטגוריה
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {categories.map(category => (
                                                <option key={category.value} value={category.value}>
                                                    {category.icon} {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            סטטוס
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => handleInputChange('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status.value} value={status.value}>
                                                    {status.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Date & Language */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            תאריך כתיבה
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.dateWritten}
                                            onChange={(e) => handleInputChange('dateWritten', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            שפה
                                        </label>
                                        <select
                                            value={formData.language}
                                            onChange={(e) => handleInputChange('language', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="עברית">עברית</option>
                                            <option value="אנגלית">אנגלית</option>
                                            <option value="יידיש">יידיש</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Condition */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        מצב השמירה
                                    </label>
                                    <select
                                        value={formData.condition}
                                        onChange={(e) => handleInputChange('condition', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {conditions.map(condition => (
                                            <option key={condition} value={condition}>{condition}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        תגים
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleTagToggle(tag)}
                                                    className="mr-2 text-blue-600 hover:text-blue-800"
                                                >
                          <X size={14} />
                        </button>
                      </span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {availableTags.filter(tag => !formData.tags.includes(tag)).slice(0, 6).map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => handleTagToggle(tag)}
                                                className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                            >
                                                <Plus size={14} className="ml-1" />
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        תיאור
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        הערות פנימיות
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => handleInputChange('notes', e.target.value)}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="הערות למשתמשים אחרים..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* File Management */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">ניהול קבצים</h3>

                            <div className="space-y-4">
                                {/* Source File */}
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <FileText className="text-blue-600" size={24} />
                                        <div>
                                            <div className="font-medium text-gray-900">קובץ מקור</div>
                                            <div className="text-sm text-gray-500">{formData.sourcePath}</div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 space-x-reverse">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">הורד</button>
                                        <button className="text-gray-600 hover:text-gray-800 text-sm">החלף</button>
                                    </div>
                                </div>

                                {/* Transcript File */}
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <FileText className="text-green-600" size={24} />
                                        <div>
                                            <div className="font-medium text-gray-900">קובץ תמלול</div>
                                            <div className="text-sm text-gray-500">
                                                {newTranscriptFile ? newTranscriptFile.name : formData.transcriptPath}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 space-x-reverse">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">הורד</button>
                                        <label className="text-green-600 hover:text-green-800 text-sm cursor-pointer">
                                            החלף
                                            <input
                                                type="file"
                                                accept=".doc,.docx"
                                                onChange={(e) => handleTranscriptUpload(e.target.files[0])}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Upload New Transcript */}
                                {!formData.hasTranscript && (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                        <div className="text-sm text-gray-600 mb-2">העלה קובץ תמלול</div>
                                        <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                                            בחר קובץ
                                            <input
                                                type="file"
                                                accept=".doc,.docx"
                                                onChange={(e) => handleTranscriptUpload(e.target.files[0])}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Current Status */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-medium text-gray-900 mb-4">סטטוס נוכחי</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">מצב:</span>
                                    {getStatusBadge(formData.status)}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">תמלול:</span>
                                    <span className={`text-sm ${formData.hasTranscript ? 'text-green-600' : 'text-red-600'}`}>
                    {formData.hasTranscript ? 'קיים' : 'חסר'}
                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">עמודים:</span>
                                    <span className="text-sm text-gray-900">{formData.pages}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">עודכן:</span>
                                    <span className="text-sm text-gray-900">
                    {new Date(formData.updatedAt).toLocaleDateString('he-IL')}
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Permissions */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-gray-900">הרשאות גישה</h3>
                                <button
                                    onClick={() => setShowPermissions(!showPermissions)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    {showPermissions ? 'הסתר' : 'ערוך'}
                                </button>
                            </div>

                            {showPermissions ? (
                                <div className="space-y-2">
                                    {userGroups.map(group => (
                                        <label key={group} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.permissions.includes(group)}
                                                onChange={() => handlePermissionToggle(group)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-2"
                                            />
                                            <span className="text-sm text-gray-700">{group}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {formData.permissions.map(permission => (
                                        <div key={permission} className="text-sm text-gray-600 flex items-center">
                                            <Users size={14} className="ml-2" />
                                            {permission}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-medium text-gray-900 mb-4">פעולות מהירות</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleInputChange('status', 'published')}
                                    className="w-full text-right px-3 py-2 text-sm bg-green-50 text-green-700 rounded-md hover:bg-green-100"
                                >
                                    סמן כפורסם
                                </button>
                                <button
                                    onClick={() => handleInputChange('status', 'in_transcription')}
                                    className="w-full text-right px-3 py-2 text-sm bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100"
                                >
                                    העבר לתמלול
                                </button>
                                <button
                                    onClick={() => setFormData({...formData, permissions: [...formData.permissions, 'אורחים']})}
                                    className="w-full text-right px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
                                >
                                    הוסף לאתר הציבורי
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Version History Modal */}
                {showHistory && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h3 className="text-lg font-medium text-gray-900">היסטוריית גרסאות</h3>
                                <button
                                    onClick={() => setShowHistory(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto max-h-80">
                                <div className="space-y-4">
                                    {versionHistory.map((version, index) => (
                                        <div key={version.id} className="flex items-start space-x-3 space-x-reverse border-b border-gray-100 pb-4">
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-medium text-gray-900">{version.action}</div>
                                                        <div className="text-sm text-gray-600">{version.details}</div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {new Date(version.date).toLocaleDateString('he-IL')}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">על ידי {version.user}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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

export default DocumentEdit;
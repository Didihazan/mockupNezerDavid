import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, FileText, Image, Calendar, Tag, User, Check, X, Plus } from 'lucide-react';

const DocumentUpload = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 - Metadata
        title: '',
        author: '',
        category: '',
        dateWritten: '',
        tags: [],
        description: '',
        language: 'עברית',
        condition: '',

        // Step 2 - Files
        sourceFile: null,
        transcriptFile: null,

        // Step 3 - Review
        notes: ''
    });

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

    const steps = [
        { number: 1, title: "מטה-דאטה", description: "פרטי המסמך הבסיסיים" },
        { number: 2, title: "קבצים", description: "העלאת קבצי מקור ותמלול" },
        { number: 3, title: "סקירה ואישור", description: "בדיקה סופית ושליחה" }
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

    const handleFileChange = (field, file) => {
        setFormData(prev => ({
            ...prev,
            [field]: file
        }));
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        alert('במוקאפ: המסמך הועלה בהצלחה! מעבר לרשימת המסמכים...');
    };

    const isStepValid = (step) => {
        switch (step) {
            case 1:
                return formData.title && formData.author && formData.category && formData.dateWritten;
            case 2:
                return formData.sourceFile;
            case 3:
                return true;
            default:
                return false;
        }
    };

    const renderProgressBar = () => (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                ${currentStep >= step.number
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-white border-gray-300 text-gray-400'}`}
                            >
                                {currentStep > step.number ? (
                                    <Check size={16} />
                                ) : (
                                    step.number
                                )}
                            </div>
                            <div className="mt-2 text-center">
                                <div className={`text-sm font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {step.title}
                                </div>
                                <div className="text-xs text-gray-400 mt-1 max-w-24">
                                    {step.description}
                                </div>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">פרטי המסמך</h3>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    כותרת המסמך *
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="הכנס כותרת..."
                />
            </div>

            {/* Author */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    כותב *
                </label>
                <select
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">בחר כותב...</option>
                    {authors.map(author => (
                        <option key={author} value={author}>{author}</option>
                    ))}
                </select>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    קטגוריה *
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {categories.map(category => (
                        <button
                            key={category.value}
                            type="button"
                            onClick={() => handleInputChange('category', category.value)}
                            className={`p-4 border-2 rounded-lg text-center transition-colors
                ${formData.category === category.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className="text-2xl mb-2">{category.icon}</div>
                            <div className="text-sm font-medium">{category.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Date Written */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        תאריך כתיבה *
                    </label>
                    <input
                        type="date"
                        value={formData.dateWritten}
                        onChange={(e) => handleInputChange('dateWritten', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Language */}
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
                    <option value="">בחר מצב...</option>
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
                    {availableTags.filter(tag => !formData.tags.includes(tag)).map(tag => (
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
                    placeholder="תיאור קצר של תוכן המסמך..."
                />
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">העלאת קבצים</h3>

            {/* Source File */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    קובץ מקור * (JPG/PDF)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    {formData.sourceFile ? (
                        <div className="space-y-2">
                            <div className="text-green-600">
                                <FileText size={32} className="mx-auto" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                                {formData.sourceFile.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {(formData.sourceFile.size / 1024 / 1024).toFixed(1)} MB
                            </div>
                            <button
                                type="button"
                                onClick={() => handleFileChange('sourceFile', null)}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                הסר קובץ
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="text-gray-400">
                                <Upload size={32} className="mx-auto" />
                            </div>
                            <div className="text-sm text-gray-600">
                                לחץ לבחירת קובץ או גרור קובץ לכאן
                            </div>
                            <div className="text-xs text-gray-500">
                                PDF, JPG, PNG עד 50MB
                            </div>
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleFileChange('sourceFile', e.target.files[0])}
                                className="hidden"
                                id="sourceFile"
                            />
                            <label
                                htmlFor="sourceFile"
                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                            >
                                בחר קובץ
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Transcript File */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    קובץ תמלול (Word) - אופציונלי
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    {formData.transcriptFile ? (
                        <div className="space-y-2">
                            <div className="text-blue-600">
                                <FileText size={32} className="mx-auto" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                                {formData.transcriptFile.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {(formData.transcriptFile.size / 1024 / 1024).toFixed(1)} MB
                            </div>
                            <button
                                type="button"
                                onClick={() => handleFileChange('transcriptFile', null)}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                הסר קובץ
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="text-gray-400">
                                <FileText size={32} className="mx-auto" />
                            </div>
                            <div className="text-sm text-gray-600">
                                העלה קובץ תמלול (אופציונלי)
                            </div>
                            <div className="text-xs text-gray-500">
                                DOC, DOCX עד 20MB
                            </div>
                            <input
                                type="file"
                                accept=".doc,.docx"
                                onChange={(e) => handleFileChange('transcriptFile', e.target.files[0])}
                                className="hidden"
                                id="transcriptFile"
                            />
                            <label
                                htmlFor="transcriptFile"
                                className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
                            >
                                בחר קובץ
                            </label>
                        </div>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    ניתן להוסיף תמלול מאוחר יותר דרך מסך העריכה
                </p>
            </div>

            {/* File Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">הנחיות העלאת קבצים:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• קובץ מקור: PDF איכותי או תמונה ברזולוציה גבוהה</li>
                    <li>• קובץ תמלול: Word עם עיצוב פשוט וברור</li>
                    <li>• שם הקובץ: השתמש בשמות תיאוריים בעברית</li>
                    <li>• גודל מקסימלי: 50MB לקובץ מקור, 20MB לתמלול</li>
                </ul>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">סקירה ואישור</h3>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">סיכום פרטי המסמך:</h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-medium text-gray-700">כותרת:</span>
                        <div className="text-gray-900">{formData.title || 'לא צוין'}</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">כותב:</span>
                        <div className="text-gray-900">{formData.author || 'לא צוין'}</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">קטגוריה:</span>
                        <div className="text-gray-900">{formData.category || 'לא צוין'}</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">תאריך כתיבה:</span>
                        <div className="text-gray-900">{formData.dateWritten || 'לא צוין'}</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">שפה:</span>
                        <div className="text-gray-900">{formData.language}</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">מצב שמירה:</span>
                        <div className="text-gray-900">{formData.condition || 'לא צוין'}</div>
                    </div>
                </div>

                {formData.tags.length > 0 && (
                    <div className="mt-4">
                        <span className="font-medium text-gray-700">תגים:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {formData.tags.map(tag => (
                                <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {formData.description && (
                    <div className="mt-4">
                        <span className="font-medium text-gray-700">תיאור:</span>
                        <div className="text-gray-900 mt-1">{formData.description}</div>
                    </div>
                )}
            </div>

            {/* Files Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">קבצים שהועלו:</h4>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3 space-x-reverse">
                            <FileText className="text-blue-600" size={20} />
                            <div>
                                <div className="text-sm font-medium">קובץ מקור</div>
                                <div className="text-xs text-gray-500">
                                    {formData.sourceFile ? formData.sourceFile.name : 'לא הועלה'}
                                </div>
                            </div>
                        </div>
                        <div className="text-sm">
                            {formData.sourceFile ? (
                                <span className="text-green-600">✓ הועלה</span>
                            ) : (
                                <span className="text-red-600">✗ חסר</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3 space-x-reverse">
                            <FileText className="text-green-600" size={20} />
                            <div>
                                <div className="text-sm font-medium">קובץ תמלול</div>
                                <div className="text-xs text-gray-500">
                                    {formData.transcriptFile ? formData.transcriptFile.name : 'לא הועלה (אופציונלי)'}
                                </div>
                            </div>
                        </div>
                        <div className="text-sm">
                            {formData.transcriptFile ? (
                                <span className="text-green-600">✓ הועלה</span>
                            ) : (
                                <span className="text-gray-400">- לא נדרש</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Notes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    הערות נוספות
                </label>
                <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="הערות למנהל המערכת..."
                />
            </div>

            {/* Final Confirmation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                    <input
                        type="checkbox"
                        id="confirm"
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="confirm" className="text-sm text-blue-800">
                        אני מאשר כי כל הפרטים נכונים ואני מבקש להעלות את המסמך למערכת.
                        המסמך יועבר לבדיקה ואישור לפני הפרסום.
                    </label>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: מסך העלאת מסמך - אשף 3 שלבים
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link
                                to="/internal/documents"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">העלאת מסמך חדש</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Progress Bar */}
                {renderProgressBar()}

                {/* Form Content */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center space-x-2 space-x-reverse px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowRight size={16} />
                        <span>הקודם</span>
                    </button>

                    <div className="flex space-x-3 space-x-reverse">
                        <Link
                            to="/internal/documents"
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            ביטול
                        </Link>

                        {currentStep < 3 ? (
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid(currentStep)}
                                className="flex items-center space-x-2 space-x-reverse px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>הבא</span>
                                <ArrowLeft size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!isStepValid(currentStep)}
                                className="flex items-center space-x-2 space-x-reverse px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Check size={16} />
                                <span>שליחה</span>
                            </button>
                        )}
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

export default DocumentUpload;
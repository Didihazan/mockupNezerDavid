import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    Bell,
    Check,
    CheckCheck,
    Filter,
    Search,
    AlertCircle,
    FileText,
    Users,
    Settings,
    Trash2,
    Eye,
    Calendar,
    Clock
} from 'lucide-react';

const Notifications = () => {
    // Mock notifications data (based on mockData)
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "תמלול חדש הושלם",
            message: "התמלול של 'אורות הקודש - פרק א' הושלם בהצלחה",
            type: "transcript_completed",
            isRead: false,
            createdAt: "2024-12-20T10:30:00Z",
            userId: 2,
            documentId: 1,
            priority: "medium",
            actionUrl: "/internal/documents/view/1"
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
            priority: "low",
            actionUrl: "/internal/documents/view/2"
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
            priority: "low",
            actionUrl: "/internal/documents/edit/3"
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
            priority: "medium",
            actionUrl: "/internal/users"
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
            priority: "high",
            actionUrl: "/internal/documents?filter=no_transcript"
        },
        {
            id: 6,
            title: "סיכום פעילות שבועי",
            message: "השבוע נוספו 12 מסמכים חדשים ו-23 חיפושים בוצעו",
            type: "weekly_summary",
            isRead: true,
            createdAt: "2024-12-15T09:00:00Z",
            userId: 1,
            documentId: null,
            priority: "low",
            actionUrl: "/internal/dashboard"
        },
        {
            id: 7,
            title: "שגיאת מערכת",
            message: "שגיאה בעת העלאת קובץ תמלול - נא לנסות שוב",
            type: "system_error",
            isRead: false,
            createdAt: "2024-12-14T15:30:00Z",
            userId: 2,
            documentId: 4,
            priority: "high",
            actionUrl: "/internal/documents/edit/4"
        },
        {
            id: 8,
            title: "בקשת גישה למסמך",
            message: "ד״ר שרה דוידסון ביקשה גישה למסמך 'כתבה על הציונות הדתית'",
            type: "access_request",
            isRead: true,
            createdAt: "2024-12-13T11:45:00Z",
            userId: 1,
            documentId: 4,
            priority: "medium",
            actionUrl: "/internal/documents/view/4"
        }
    ]);

    const [filterType, setFilterType] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [filterRead, setFilterRead] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const notificationTypes = [
        { value: 'transcript_completed', label: 'תמלול הושלם', icon: '📄', color: 'green' },
        { value: 'document_added', label: 'מסמך נוסף', icon: '➕', color: 'blue' },
        { value: 'metadata_updated', label: 'מטה-דאטה עודכנה', icon: '✏️', color: 'yellow' },
        { value: 'user_registered', label: 'משתמש נרשם', icon: '👤', color: 'purple' },
        { value: 'transcription_reminder', label: 'תזכורת תמלול', icon: '⏰', color: 'orange' },
        { value: 'weekly_summary', label: 'סיכום שבועי', icon: '📊', color: 'gray' },
        { value: 'system_error', label: 'שגיאת מערכת', icon: '⚠️', color: 'red' },
        { value: 'access_request', label: 'בקשת גישה', icon: '🔐', color: 'indigo' }
    ];

    const priorityOptions = [
        { value: 'high', label: 'גבוהה', color: 'red' },
        { value: 'medium', label: 'בינונית', color: 'yellow' },
        { value: 'low', label: 'נמוכה', color: 'green' }
    ];

    // Filter notifications
    const filteredNotifications = notifications.filter(notification => {
        const matchesSearch = notification.title.includes(searchTerm) || notification.message.includes(searchTerm);
        const matchesType = filterType === 'all' || notification.type === filterType;
        const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
        const matchesRead = filterRead === 'all' ||
            (filterRead === 'read' && notification.isRead) ||
            (filterRead === 'unread' && !notification.isRead);

        return matchesSearch && matchesType && matchesPriority && matchesRead;
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.isRead).length;

    const handleMarkAsRead = (notificationId) => {
        setNotifications(prev => prev.map(notification =>
            notification.id === notificationId
                ? { ...notification, isRead: true }
                : notification
        ));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
        alert('כל ההתראות סומנו כנקראו');
    };

    const handleDeleteNotification = (notificationId) => {
        setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
        alert('ההתראה נמחקה');
    };

    const handleDeleteAllRead = () => {
        setNotifications(prev => prev.filter(notification => !notification.isRead));
        alert('כל ההתראות שנקראו נמחקו');
    };

    const getNotificationIcon = (type) => {
        const typeConfig = notificationTypes.find(t => t.value === type);
        return typeConfig?.icon || '📢';
    };

    const getNotificationColor = (type) => {
        const typeConfig = notificationTypes.find(t => t.value === type);
        const colorClasses = {
            green: 'bg-green-100 text-green-800',
            blue: 'bg-blue-100 text-blue-800',
            yellow: 'bg-yellow-100 text-yellow-800',
            purple: 'bg-purple-100 text-purple-800',
            orange: 'bg-orange-100 text-orange-800',
            gray: 'bg-gray-100 text-gray-800',
            red: 'bg-red-100 text-red-800',
            indigo: 'bg-indigo-100 text-indigo-800'
        };
        return colorClasses[typeConfig?.color || 'gray'];
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = priorityOptions.find(p => p.value === priority);
        const colorClasses = {
            red: 'bg-red-100 text-red-800',
            yellow: 'bg-yellow-100 text-yellow-800',
            green: 'bg-green-100 text-green-800'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[priorityConfig?.color || 'green']}`}>
        {priorityConfig?.label || priority}
      </span>
        );
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 60) {
            return `לפני ${diffMins} דקות`;
        } else if (diffHours < 24) {
            return `לפני ${diffHours} שעות`;
        } else if (diffDays < 7) {
            return `לפני ${diffDays} ימים`;
        } else {
            return date.toLocaleDateString('he-IL');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: מסך התראות - רשימת התראות + פעמון בכותרת עם מונה
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link
                                to="/internal/dashboard"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div className="flex items-center space-x-3 space-x-reverse">
                                <div className="relative">
                                    <Bell size={24} className="text-gray-700" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">התראות</h1>
                                    <p className="text-sm text-gray-500">
                                        {unreadCount} לא נקראו • {highPriorityCount} בעדיפות גבוהה
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 space-x-reverse">
                            <button
                                onClick={handleMarkAllAsRead}
                                disabled={unreadCount === 0}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                <CheckCheck size={16} />
                                <span>סמן הכל כנקרא</span>
                            </button>

                            <button
                                onClick={handleDeleteAllRead}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Trash2 size={16} />
                                <span>מחק שנקראו</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">חיפוש</label>
                            <div className="relative">
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="חפש בהתראות..."
                                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">סוג התראה</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">כל הסוגים</option>
                                {notificationTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.icon} {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Priority Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">עדיפות</label>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">כל העדיפויות</option>
                                {priorityOptions.map(priority => (
                                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Read Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">מצב קריאה</label>
                            <select
                                value={filterRead}
                                onChange={(e) => setFilterRead(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">הכל</option>
                                <option value="unread">לא נקרא</option>
                                <option value="read">נקרא</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">
                                התראות ({filteredNotifications.length})
                            </h3>
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                                <Filter size={16} />
                                <span>מסונן לפי הקריטריונים שנבחרו</span>
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-6 hover:bg-gray-50 transition-colors ${
                                    !notification.isRead ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4 space-x-reverse flex-1">
                                        {/* Icon */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                                                <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                                    {notification.title}
                                                </h4>
                                                {getPriorityBadge(notification.priority)}
                                                {!notification.isRead && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3">
                                                {notification.message}
                                            </p>

                                            <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                                                <div className="flex items-center space-x-1 space-x-reverse">
                                                    <Clock size={12} />
                                                    <span>{formatTimeAgo(notification.createdAt)}</span>
                                                </div>
                                                {notification.actionUrl && (
                                                    <Link
                                                        to={notification.actionUrl}
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 space-x-reverse"
                                                    >
                                                        <Eye size={12} />
                                                        <span>צפה בפרטים</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        {!notification.isRead && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded"
                                                title="סמן כנקרא"
                                            >
                                                <Check size={16} />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDeleteNotification(notification.id)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded"
                                            title="מחק התראה"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Notifications */}
                    {filteredNotifications.length === 0 && (
                        <div className="text-center py-12">
                            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">אין התראות</h3>
                            <p className="text-gray-500">
                                {notifications.length === 0
                                    ? 'עדיין לא קיבלת התראות'
                                    : 'לא נמצאו התראות התואמות את הפילטרים'
                                }
                            </p>
                        </div>
                    )}
                </div>

                {/* Summary Statistics */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">סה״כ התראות</p>
                                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                            </div>
                            <Bell className="text-gray-500" size={24} />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">לא נקראו</p>
                                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                            </div>
                            <AlertCircle className="text-blue-500" size={24} />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">עדיפות גבוהה</p>
                                <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
                            </div>
                            <AlertCircle className="text-red-500" size={24} />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">השבוע</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {notifications.filter(n => {
                                        const weekAgo = new Date();
                                        weekAgo.setDate(weekAgo.getDate() - 7);
                                        return new Date(n.createdAt) > weekAgo;
                                    }).length}
                                </p>
                            </div>
                            <Calendar className="text-green-500" size={24} />
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
            </div>
        </div>
    );
};

export default Notifications;
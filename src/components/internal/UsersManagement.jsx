import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Edit, Trash2, UserCheck, UserX, Mail, X, Save } from 'lucide-react';

const UsersManagement = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "הראל כהן",
            email: "avraham@nazer-david.org.il",
            role: "admin",
            groups: ["מנהלים", "חוקרים"],
            status: "active"
        },
        {
            id: 2,
            name: "ד״ר רחל לוי",
            email: "rachel@nazer-david.org.il",
            role: "researcher",
            groups: ["חוקרים"],
            status: "active"
        },
        {
            id: 3,
            name: "יוסף גולדברג",
            email: "yosef@nazer-david.org.il",
            role: "researcher",
            groups: ["חוקרים"],
            status: "suspended"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'researcher', groups: [] });

    const roles = [
        { value: 'admin', label: 'מנהל', color: 'bg-red-100 text-red-800' },
        { value: 'researcher', label: 'חוקר', color: 'bg-blue-100 text-blue-800' }
    ];


    const filteredUsers = users.filter(user =>
        user.name.includes(searchTerm) || user.email.includes(searchTerm)
    );

    const handleAddUser = () => {
        const newUserId = Math.max(...users.map(u => u.id)) + 1;
        setUsers(prev => [...prev, { ...newUser, id: newUserId, status: 'active' }]);
        setNewUser({ name: '', email: '', role: 'researcher', groups: [] });
        setShowAddModal(false);
        alert('משתמש נוסף בהצלחה!');
    };

    const handleEditUser = () => {
        setUsers(prev => prev.map(user => user.id === selectedUser.id ? selectedUser : user));
        setShowEditModal(false);
        setSelectedUser(null);
        alert('משתמש עודכן בהצלחה!');
    };

    const handleToggleStatus = (userId) => {
        setUsers(prev => prev.map(user => {
            if (user.id === userId) {
                return { ...user, status: user.status === 'active' ? 'suspended' : 'active' };
            }
            return user;
        }));
    };

    const handleDeleteUser = (userId) => {
        if (confirm('האם אתה בטוח שברצונך למחוק את המשתמש?')) {
            setUsers(prev => prev.filter(user => user.id !== userId));
            alert('משתמש נמחק בהצלחה!');
        }
    };

    const getRoleBadge = (role) => {
        const roleConfig = roles.find(r => r.value === role);
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleConfig?.color}`}>
        {roleConfig?.label}
      </span>
        );
    };

    const getStatusBadge = (status) => {
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
        {status === 'active' ? 'פעיל' : 'מושעה'}
      </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Mockup Banner */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
                🚧 מוקאפ: ניהול משתמשים (Admin) - CRUD משתמשים והרשאות
            </div>

            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link to="/internal/dashboard" className="text-gray-500 hover:text-gray-700">
                                <ArrowLeft size={20} />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">ניהול משתמשים</h1>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {filteredUsers.length} משתמשים
              </span>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            <Plus size={16} />
                            <span>הוסף משתמש</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="חפש שם או אימייל..."
                            className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">משתמש</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">תפקיד</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">קבוצות</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">סטטוס</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">פעולות</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {user.groups.map(group => (
                                            <span key={group} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {group}
                        </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <button
                                            onClick={() => { setSelectedUser({...user}); setShowEditModal(true); }}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(user.id)}
                                            className={`p-1 rounded ${user.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                                        >
                                            {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Navigation */}
                <div className="mt-8 pt-6 border-t text-center">
                    <Link to="/internal" className="text-sm text-gray-500 hover:text-gray-700">
                        ← חזרה לתפריט המערכת הפנימית
                    </Link>
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-medium text-gray-900">הוסף משתמש חדש</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <input
                                type="text"
                                placeholder="שם מלא"
                                value={newUser.name}
                                onChange={(e) => setNewUser(prev => ({...prev, name: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="אימייל"
                                value={newUser.email}
                                onChange={(e) => setNewUser(prev => ({...prev, email: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser(prev => ({...prev, role: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {roles.map(role => (
                                    <option key={role.value} value={role.value}>{role.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3 space-x-reverse p-6 border-t">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                ביטול
                            </button>
                            <button
                                onClick={handleAddUser}
                                disabled={!newUser.name || !newUser.email}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                הוסף משתמש
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-medium text-gray-900">ערוך משתמש</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <input
                                type="text"
                                value={selectedUser.name}
                                onChange={(e) => setSelectedUser(prev => ({...prev, name: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                value={selectedUser.email}
                                onChange={(e) => setSelectedUser(prev => ({...prev, email: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={selectedUser.role}
                                onChange={(e) => setSelectedUser(prev => ({...prev, role: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {roles.map(role => (
                                    <option key={role.value} value={role.value}>{role.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3 space-x-reverse p-6 border-t">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                ביטול
                            </button>
                            <button
                                onClick={handleEditUser}
                                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                <Save size={16} />
                                <span>שמור</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersManagement;
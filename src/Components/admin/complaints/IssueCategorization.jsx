// src/pages/admin/complaints/IssueCategorization.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const IssueCategorization = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [newSubIssue, setNewSubIssue] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingSubIssue, setEditingSubIssue] = useState({ categoryId: null, index: null, value: '' });
  const [editingKeyword, setEditingKeyword] = useState({ categoryId: null, index: null, value: '' });

  // Initial categories data
  const initialCategories = [
    { id: 1, name: 'Service Quality Issues', count: 24, icon: '⭐', color: 'bg-blue-100 text-blue-700', subIssues: ['Poor service quality', 'Unprofessional behavior', 'Delayed service', 'Incomplete delivery'], keywords: ['poor service', 'unprofessional', 'delay', 'quality issue', 'not satisfied', 'bad experience'] },
    { id: 2, name: 'Payment & Refund Issues', count: 18, icon: '💰', color: 'bg-green-100 text-green-700', subIssues: ['Payment deducted but not confirmed', 'Refund not processed', 'Incorrect amount charged', 'Payment gateway error'], keywords: ['payment failed', 'refund pending', 'amount deducted', 'payment error', 'transaction failed'] },
    { id: 3, name: 'Vendor Misconduct', count: 12, icon: '⚠️', color: 'bg-red-100 text-red-700', subIssues: ['Rude behavior', 'Fraudulent activity', 'No-show', 'False promises'], keywords: ['rude vendor', 'fraud', 'no show', 'misconduct', 'unethical'] },
    { id: 4, name: 'Booking Disputes', count: 15, icon: '📅', color: 'bg-purple-100 text-purple-700', subIssues: ['Wrong date confirmed', 'Service mismatch', 'Cancellation policy dispute', 'Double booking'], keywords: ['booking issue', 'date mismatch', 'cancellation', 'double booking', 'wrong service'] },
    { id: 5, name: 'Technical Issues', count: 8, icon: '🖥️', color: 'bg-amber-100 text-amber-700', subIssues: ['App crash', 'Unable to upload photos', 'Payment failure', 'Login issues'], keywords: ['app crash', 'upload error', 'login issue', 'technical glitch', 'server error'] },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCategories(initialCategories);
      setIsLoading(false);
    }, 500);
  }, []);

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const totalComplaints = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.count, 0);
  }, [categories]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      showToastMsg('Please enter a category name', 'warning');
      return;
    }

    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    const newCategoryObj = {
      id: newId,
      name: newCategory.trim(),
      count: 0,
      icon: '📌',
      color: 'bg-gray-100 text-gray-700',
      subIssues: [],
      keywords: []
    };
    setCategories([...categories, newCategoryObj]);
    setNewCategory('');
    setShowAddModal(false);
    showToastMsg(`Category "${newCategory}" added successfully`, 'success');
  };

  const handleEditCategory = () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      showToastMsg('Please enter a category name', 'warning');
      return;
    }

    setCategories(categories.map(cat =>
      cat.id === editingCategory.id
        ? { ...cat, name: editingCategory.name.trim(), icon: editingCategory.icon || cat.icon }
        : cat
    ));
    
    if (selectedCategory?.id === editingCategory.id) {
      setSelectedCategory({ ...selectedCategory, name: editingCategory.name.trim(), icon: editingCategory.icon || selectedCategory.icon });
    }
    
    setShowEditModal(false);
    setEditingCategory(null);
    showToastMsg(`Category updated successfully`, 'success');
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      if (selectedCategory?.id === categoryToDelete.id) {
        setSelectedCategory(null);
      }
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      showToastMsg(`Category "${categoryToDelete.name}" deleted successfully`, 'success');
    }
  };

  const handleAddSubIssue = (categoryId) => {
    if (!newSubIssue.trim()) {
      showToastMsg('Please enter a sub-issue', 'warning');
      return;
    }

    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, subIssues: [...cat.subIssues, newSubIssue.trim()] }
        : cat
    ));
    
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory({
        ...selectedCategory,
        subIssues: [...selectedCategory.subIssues, newSubIssue.trim()]
      });
    }
    
    setNewSubIssue('');
    showToastMsg(`Sub-issue added successfully`, 'success');
  };

  const handleEditSubIssue = () => {
    if (!editingSubIssue.value.trim()) {
      showToastMsg('Please enter a sub-issue', 'warning');
      return;
    }

    setCategories(categories.map(cat =>
      cat.id === editingSubIssue.categoryId
        ? {
            ...cat,
            subIssues: cat.subIssues.map((issue, idx) =>
              idx === editingSubIssue.index ? editingSubIssue.value.trim() : issue
            )
          }
        : cat
    ));
    
    if (selectedCategory?.id === editingSubIssue.categoryId) {
      setSelectedCategory({
        ...selectedCategory,
        subIssues: selectedCategory.subIssues.map((issue, idx) =>
          idx === editingSubIssue.index ? editingSubIssue.value.trim() : issue
        )
      });
    }
    
    setEditingSubIssue({ categoryId: null, index: null, value: '' });
    showToastMsg(`Sub-issue updated successfully`, 'success');
  };

  const handleDeleteSubIssue = (categoryId, index) => {
    const category = categories.find(c => c.id === categoryId);
    const subIssue = category.subIssues[index];
    
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, subIssues: cat.subIssues.filter((_, i) => i !== index) }
        : cat
    ));
    
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory({
        ...selectedCategory,
        subIssues: selectedCategory.subIssues.filter((_, i) => i !== index)
      });
    }
    
    showToastMsg(`Sub-issue "${subIssue}" deleted`, 'warning');
  };

  // Keyword management functions
  const handleAddKeyword = (categoryId) => {
    if (!newKeyword.trim()) {
      showToastMsg('Please enter a keyword', 'warning');
      return;
    }

    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, keywords: [...(cat.keywords || []), newKeyword.trim().toLowerCase()] }
        : cat
    ));
    
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory({
        ...selectedCategory,
        keywords: [...(selectedCategory.keywords || []), newKeyword.trim().toLowerCase()]
      });
    }
    
    setNewKeyword('');
    showToastMsg(`Keyword added successfully`, 'success');
  };

  const handleEditKeyword = () => {
    if (!editingKeyword.value.trim()) {
      showToastMsg('Please enter a keyword', 'warning');
      return;
    }

    setCategories(categories.map(cat =>
      cat.id === editingKeyword.categoryId
        ? {
            ...cat,
            keywords: cat.keywords.map((keyword, idx) =>
              idx === editingKeyword.index ? editingKeyword.value.trim().toLowerCase() : keyword
            )
          }
        : cat
    ));
    
    if (selectedCategory?.id === editingKeyword.categoryId) {
      setSelectedCategory({
        ...selectedCategory,
        keywords: selectedCategory.keywords.map((keyword, idx) =>
          idx === editingKeyword.index ? editingKeyword.value.trim().toLowerCase() : keyword
        )
      });
    }
    
    setEditingKeyword({ categoryId: null, index: null, value: '' });
    showToastMsg(`Keyword updated successfully`, 'success');
  };

  const handleDeleteKeyword = (categoryId, index) => {
    const category = categories.find(c => c.id === categoryId);
    const keyword = category.keywords[index];
    
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, keywords: cat.keywords.filter((_, i) => i !== index) }
        : cat
    ));
    
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory({
        ...selectedCategory,
        keywords: selectedCategory.keywords.filter((_, i) => i !== index)
      });
    }
    
    showToastMsg(`Keyword "${keyword}" deleted`, 'warning');
  };

  const handleUpdateCategoryCount = (categoryId, increment) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, count: Math.max(0, cat.count + increment) }
        : cat
    ));
    
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory({
        ...selectedCategory,
        count: Math.max(0, selectedCategory.count + increment)
      });
    }
  };

  const iconOptions = ['⭐', '💰', '⚠️', '📅', '🖥️', '📌', '🔧', '🚚', '📞', '💳', '🔒', '📝'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'warning' ? 'bg-orange-500' : 
            'bg-blue-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🏷️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Issue Categorization</h3>
            <p className="text-sm text-gray-500 mt-0.5">Classify complaints based on type: Service Quality, Payment & Refund, Vendor Misconduct, Booking Disputes, Technical Issues</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-blue-400">
          <p className="text-xs text-gray-400">Total Categories</p>
          <p className="text-2xl font-bold">{categories.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-green-400">
          <p className="text-xs text-gray-400">Total Complaints</p>
          <p className="text-2xl font-bold">{totalComplaints}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-purple-400">
          <p className="text-xs text-gray-400">Avg per Category</p>
          <p className="text-2xl font-bold">{Math.round(totalComplaints / categories.length) || 0}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-amber-400">
          <p className="text-xs text-gray-400">Total Sub-Issues</p>
          <p className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.subIssues.length, 0)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Complaint Categories</h3>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors"
              >
                + Add Category
              </button>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                    selectedCategory?.id === cat.id 
                      ? 'bg-red-50 border-l-4 border-red-500 shadow-sm' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center text-lg flex-shrink-0`}>
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{cat.name}</p>
                      <p className="text-xs text-gray-400">{cat.count} complaints</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">
                      {totalComplaints > 0 ? Math.round((cat.count / totalComplaints) * 100) : 0}%
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategory(cat);
                        setShowEditModal(true);
                      }}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      ✏️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Distribution</h3>
            <div className="space-y-3">
              {categories.map(cat => {
                const percentage = totalComplaints > 0 ? (cat.count / totalComplaints) * 100 : 0;
                return (
                  <div key={cat.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 truncate flex-1 mr-2">{cat.name}</span>
                      <span className="font-semibold text-gray-700 flex-shrink-0">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  const randomCat = categories[Math.floor(Math.random() * categories.length)];
                  if (randomCat) {
                    handleUpdateCategoryCount(randomCat.id, 1);
                    showToastMsg(`Added 1 complaint to "${randomCat.name}"`, 'success');
                  }
                }}
                className="w-full p-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                📊 + Add Sample Complaint
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full p-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                📁 Create New Category
              </button>
              <button
                onClick={() => {
                  const exportData = categories.map(c => ({
                    Category: c.name,
                    Complaints: c.count,
                    SubIssues: c.subIssues.join(', '),
                    Keywords: c.keywords?.join(', ') || '',
                    Percentage: totalComplaints > 0 ? ((c.count / totalComplaints) * 100).toFixed(1) : 0
                  }));
                  console.log('Export data:', exportData);
                  showToastMsg('Categories exported to console', 'info');
                }}
                className="w-full p-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                📤 Export Categories Data
              </button>
            </div>
          </div>
        </div>

        {/* Category Details */}
        <div className="lg:col-span-2">
          {selectedCategory ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-gray-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${selectedCategory.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {selectedCategory.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{selectedCategory.name}</h3>
                    <p className="text-xs text-gray-400">{selectedCategory.count} total complaints</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateCategoryCount(selectedCategory.id, 1)}
                    className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-lg hover:bg-green-100 whitespace-nowrap"
                  >
                    + Add Complaint
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategory(selectedCategory);
                      setShowEditModal(true);
                    }}
                    className="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded-lg hover:bg-amber-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setCategoryToDelete(selectedCategory);
                      setShowDeleteModal(true);
                    }}
                    className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-lg hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Sub-Issues Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Common Sub-Issues</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedCategory.subIssues.map((issue, idx) => (
                    <div key={idx} className="group relative">
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full inline-flex items-center gap-2">
                        <span className="max-w-[200px] truncate">{issue}</span>
                        <button
                          onClick={() => setEditingSubIssue({ categoryId: selectedCategory.id, index: idx, value: issue })}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-amber-500"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteSubIssue(selectedCategory.id, idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </span>
                    </div>
                  ))}
                  {selectedCategory.subIssues.length === 0 && (
                    <p className="text-xs text-gray-400">No sub-issues added yet</p>
                  )}
                </div>
                
                {/* Add Sub-Issue Form */}
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <input
                    type="text"
                    value={newSubIssue}
                    onChange={(e) => setNewSubIssue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSubIssue(selectedCategory.id)}
                    placeholder="Add new sub-issue..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                  <button 
                    onClick={() => handleAddSubIssue(selectedCategory.id)} 
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    Add Sub-Issue
                  </button>
                </div>
              </div>

              {/* Auto-Classification Rules */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Auto-Classification Rules</h4>
                <p className="text-xs text-gray-500 mb-3">Keywords that trigger this category:</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedCategory.keywords?.map((kw, idx) => (
                    <div key={idx} className="group relative">
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs text-gray-600 inline-flex items-center gap-1">
                        <span className="max-w-[150px] truncate">{kw}</span>
                        <button
                          onClick={() => setEditingKeyword({ categoryId: selectedCategory.id, index: idx, value: kw })}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-amber-500"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteKeyword(selectedCategory.id, idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </span>
                    </div>
                  ))}
                  {(!selectedCategory.keywords || selectedCategory.keywords.length === 0) && (
                    <p className="text-xs text-gray-400">No keywords added yet</p>
                  )}
                </div>
                
                {/* Add Keyword Form */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword(selectedCategory.id)}
                    placeholder="Add new keyword (e.g., late delivery)"
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                  <button 
                    onClick={() => handleAddKeyword(selectedCategory.id)} 
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                  >
                    Add Keyword
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Sub-Issues</p>
                  <p className="text-xl font-bold text-blue-600">{selectedCategory.subIssues.length}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Keywords</p>
                  <p className="text-xl font-bold text-green-600">{selectedCategory.keywords?.length || 0}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">% of Total</p>
                  <p className="text-xl font-bold text-purple-600">
                    {totalComplaints > 0 ? Math.round((selectedCategory.count / totalComplaints) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">🏷️</div>
              <p className="text-gray-400 mb-2">Select a category to view details</p>
              <p className="text-sm text-gray-400">Click on any category from the list to manage sub-issues and classification rules</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Sub-Issue Modal */}
      {editingSubIssue.categoryId !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20" onClick={() => setEditingSubIssue({ categoryId: null, index: null, value: '' })}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Sub-Issue</h3>
            </div>
            <div className="p-6">
              <input
                type="text"
                value={editingSubIssue.value}
                onChange={(e) => setEditingSubIssue({ ...editingSubIssue, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-100"
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setEditingSubIssue({ categoryId: null, index: null, value: '' })} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button onClick={handleEditSubIssue} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Keyword Modal */}
      {editingKeyword.categoryId !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20" onClick={() => setEditingKeyword({ categoryId: null, index: null, value: '' })}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Keyword</h3>
            </div>
            <div className="p-6">
              <input
                type="text"
                value={editingKeyword.value}
                onChange={(e) => setEditingKeyword({ ...editingKeyword, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-100"
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setEditingKeyword({ categoryId: null, index: null, value: '' })} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button onClick={handleEditKeyword} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Add New Category</h3>
              <p className="text-sm text-gray-500">Create a new complaint category</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Delivery Issues"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Icon (Optional)</label>
                <div className="flex gap-2 flex-wrap">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => {
                        // In a real implementation, you'd set the icon state
                        showToastMsg('Icon selector would be implemented here', 'info');
                      }}
                      className="w-10 h-10 text-xl border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleAddCategory} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Category</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Icon</label>
                <input
                  type="text"
                  value={editingCategory.icon}
                  onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  maxLength={2}
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleEditCategory} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {showDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-red-50">
              <h3 className="text-lg font-bold text-red-600">Delete Category</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <span className="font-bold">"{categoryToDelete.name}"</span>?
              </p>
              <p className="text-sm text-gray-500 mb-4">
                This action cannot be undone. All associated data will be removed.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleDeleteCategory} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
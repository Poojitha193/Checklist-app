// src/ChecklistTable.js
import React, { useState } from 'react';
import './ChecklistTable.css';
import AddNewForm from './AddNewForm';

const ChecklistTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [checklistItems, setChecklistItems] = useState([
        { id: 1, heading: 'Apple', category: 'Fruits', department: 'Food', formNo: '101', done: false },
        { id: 2, heading: 'Glass Bowl', category: 'Crockery', department: 'Decor', formNo: '102', done: false },
        { id: 3, heading: 'Potato', category: 'Vegetable', department: 'Food', formNo: '103', done: false },
    ]);
    const [editingItem, setEditingItem] = useState(null);

    const handleAddNewClick = () => {
        setEditingItem(null);
        setShowForm(true);
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleDeleteClick = (id) => {
        const updatedItems = checklistItems.filter(item => item.id !== id);
        setChecklistItems(updatedItems);
    };

    const handleDoneClick = (id) => {
        const updatedItems = checklistItems.map(item =>
            item.id === id ? { ...item, done: true } : item
        );
        setChecklistItems(updatedItems);
    };

    const handleFormSubmit = (newItem) => {
        if (editingItem) {
            // Update existing item
            setChecklistItems(prevItems =>
                prevItems.map(item =>
                    item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item
                )
            );
        } else {
            // Add new item
            setChecklistItems(prevItems => [
                ...prevItems,
                { ...newItem, id: checklistItems.length + 1 }
            ]);
        }
        setShowForm(false);
    };

    const filteredItems = checklistItems.filter(item =>
        item.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.formNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="checklist-container">
            <h2>Check List</h2>
            <div className="toolbar">
                <input
                    type="text"
                    placeholder="Search Checklist"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="add-new-btn" onClick={handleAddNewClick}>
                    Add New
                </button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Heading</th>
                            <th>Category</th>
                            <th>Department</th>
                            <th>Form No.</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={item.id} className={item.done ? 'done' : ''}>
                                <td>{index + 1}</td>
                                <td>{item.heading}</td>
                                <td>{item.category}</td>
                                <td>{item.department}</td>
                                <td>{item.formNo}</td>
                                <td>
                                    <button className='edit-btn' onClick={() => handleEditClick(item)}>Edit</button>
                                    <button className='done-btn' onClick={() => handleDoneClick(item.id)}>Done</button>
                                    <button className='delete-btn' onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showForm && (
                <AddNewForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleFormSubmit}
                    editingItem={editingItem}
                />
            )}
        </div>
    );
};

export default ChecklistTable;
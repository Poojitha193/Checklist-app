// src/AddNewForm.js
import React, { useState, useEffect } from 'react';
import './AddNewForm.css';

const AddNewForm = ({ onClose, onSubmit, editingItem }) => {
    const [formData, setFormData] = useState({
        department: '',
        category: '',
        heading: '',
        formNo: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingItem) {
            setFormData({
                department: editingItem.department || '',
                category: editingItem.category || '',
                heading: editingItem.heading || '',
                formNo: editingItem.formNo || ''
            });
        }
    }, [editingItem]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.heading) newErrors.heading = 'Heading is required';
        if (!formData.formNo) newErrors.formNo = 'Form No. is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData);
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="modal">
			<span>			

			<div className="modal-header">
				<h2>{editingItem ? 'Edit Design Form' : 'Add New Design Form'}</h2>
				<span className="close-btn" onClick={onClose}>&times;</span>
			</div>
            <div className="modal-content">
                <form onSubmit={handleSubmit} className="form-content">
                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
							placeholder="Select Type"
                            value={formData.department}
                            onChange={handleChange}
                        />
                        {errors.department && <p className="error">{errors.department}</p>}
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
							placeholder="Select Type"
                            value={formData.category}
                            onChange={handleChange}
                        />
                        {errors.category && <p className="error">{errors.category}</p>}
                    </div>
                    <div className="form-group">
                        <label>Heading</label>
                        <input
                            type="text"
                            name="heading"
							placeholder="Select Type"
                            value={formData.heading}
                            onChange={handleChange}
                        />
                        {errors.heading && <p className="error">{errors.heading}</p>}
                    </div>
                    <div className="form-group">
                        <label>Form No.</label>
                        <input
                            type="text"
                            name="formNo"
							placeholder="Select Type"
                            value={formData.formNo}
                            onChange={handleChange}
                        />
                        {errors.formNo && <p className="error">{errors.formNo}</p>}
                    </div>
                    <button type="submit" className="submit-btn">SUBMIT</button>
                </form>
            </div>
			</span>
        </div>
    );
};

export default AddNewForm;
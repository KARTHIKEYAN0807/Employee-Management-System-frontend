import React, { useState } from 'react';

const EmployeeForm = ({ employee, onSave, onClose }) => {
    const [formData, setFormData] = useState(employee);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(employee.image || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        const updatedCourses = [...formData.course];
        if (checked) {
            updatedCourses.push(name);
        } else {
            const index = updatedCourses.indexOf(name);
            if (index > -1) {
                updatedCourses.splice(index, 1);
            }
        }
        setFormData({ ...formData, course: updatedCourses });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Store the file to send it to parent
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Show preview of the image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData, imageFile); // Pass formData and imageFile to parent component
    };

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{employee._id ? 'Edit Employee' : 'Create Employee'}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile No</label>
                                <input type="text" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Designation</label>
                                <select className="form-select" name="designation" value={formData.designation} onChange={handleChange} required>
                                    <option value="">Select Designation</option>
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Software Developer">Software Developer</option> {/* New Designation */}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender</label><br />
                                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} required /> Male
                                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} className="ms-2" required /> Female
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Course</label><br />
                                <input type="checkbox" name="MCA" checked={formData.course.includes('MCA')} onChange={handleCheckboxChange} /> MCA
                                <input type="checkbox" name="BCA" checked={formData.course.includes('BCA')} onChange={handleCheckboxChange} className="ms-2" /> BCA
                                <input type="checkbox" name="BSC" checked={formData.course.includes('BSC')} onChange={handleCheckboxChange} className="ms-2" /> BSC
                                <input type="checkbox" name="B.Tech" checked={formData.course.includes('B.Tech')} onChange={handleCheckboxChange} className="ms-2" /> B.Tech {/* New Course */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image Upload</label>
                                <input type="file" className="form-control" name="image" onChange={handleFileChange} />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2" style={{ width: '100px' }} />}
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;

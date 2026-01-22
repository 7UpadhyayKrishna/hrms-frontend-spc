import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone, Calendar, MapPin, Building, Briefcase } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeCode: '',
    designation: '',
    department: '',
    dateOfJoining: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    status: 'active',
    salary: '',
    bankAccount: '',
    panNumber: '',
    aadharNumber: ''
  });

  useEffect(() => {
    fetchEmployee();
    fetchDepartments();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await api.get(`/employees/${id}`);
      const employee = response.data.data;
      
      // Handle department - check both department._id and departmentId
      const departmentId = employee.department?._id || employee.departmentId || employee.department || '';
      
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        employeeCode: employee.employeeCode || '',
        designation: employee.designation || '',
        department: departmentId,
        dateOfJoining: employee.dateOfJoining ? new Date(employee.dateOfJoining).toISOString().split('T')[0] : '',
        dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth).toISOString().split('T')[0] : '',
        address: employee.address || '',
        emergencyContact: employee.emergencyContact || '',
        status: employee.status || 'active',
        salary: employee.salary || '',
        bankAccount: employee.bankAccount || '',
        panNumber: employee.panNumber || '',
        aadharNumber: employee.aadharNumber || ''
      });
    } catch (error) {
      toast.error('Failed to load employee details');
      navigate('/employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data.data || []);
    } catch (error) {
      console.error('Failed to load departments');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Ensure department is sent correctly
      const updateData = {
        ...formData,
        department: formData.department || null
      };
      
      console.log('Updating employee with data:', updateData);
      const response = await api.put(`/employees/${id}`, updateData);
      console.log('Update response:', response.data);
      toast.success('Employee updated successfully');
      navigate('/employees');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update employee');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[#A88BFF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E2A] space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/employees')}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              Edit Employee
            </h1>
            <p className="text-gray-400 mt-1">Update employee information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-[#2A2A3A] rounded-xl border border-gray-800 p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <User size={20} />
            <span>Personal Information</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Emergency Contact
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Employment Information */}
        <div className="bg-[#2A2A3A] rounded-xl border border-gray-800 p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Briefcase size={20} />
            <span>Employment Information</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Employee Code *
              </label>
              <input
                type="text"
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date of Joining *
              </label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-[#2A2A3A] rounded-xl border border-gray-800 p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Building size={20} />
            <span>Financial Information</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Bank Account Number
              </label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                PAN Number
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Aadhar Number
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#1E1E2A] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A88BFF] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/employees')}
            className="btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#A88BFF] text-white rounded-lg hover:bg-[#B89CFF] transition-all shadow-lg shadow-[#A88BFF]/20 flex items-center space-x-2"
          >
            <Save size={20} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;

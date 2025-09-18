import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap,
  FileText,
  Upload,
  Save,
  X,
  Check,
  AlertCircle,
  Users,
  Home,
  CreditCard,
  BookOpen,
  Camera,
  Download,
  Eye,
  Trash2,
  Plus,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import Header from '../../../component/common/header';
import Sidebar from '../../../component/common/sidebar';
import { useStudents } from '../../../context/StudentContext';
import { useNavigate } from 'react-router-dom'



export default function NewAdmission() {
  const { isDark } = useTheme();
  const { addStudent } = useStudents();
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Student Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    religion: '',
    bloodGroup: '',
    studentPhoto: null,
    
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Guardian Information
    fatherName: '',
    fatherOccupation: '',
    fatherPhone: '',
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherPhone: '',
    motherEmail: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianEmail: '',
    
    // Academic Information
    previousSchool: '',
    lastClass: '',
    admissionClass: '',
    subjects: [],
    academicYear: '2024-25',
    
    // Documents
    documents: {
      birthCertificate: null,
      previousMarksheet: null,
      transferCertificate: null,
      casteCertificate: null,
      incomeCertificate: null,
      medicalCertificate: null
    }
  });

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Student Info', icon: User },
    { id: 2, title: 'Contact Details', icon: Phone },
    { id: 3, title: 'Guardian Info', icon: Users },
    { id: 4, title: 'Academic Info', icon: GraduationCap },
    { id: 5, title: 'Documents', icon: FileText },
    { id: 6, title: 'Review', icon: Eye }
  ];

  const classes = [
    'Pre-KG', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 
    'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12'
  ];

  const subjects = [
    'Mathematics', 'English', 'Hindi', 'Science', 'Social Studies',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Arts',
    'Physical Education', 'Music', 'Dance'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (documentType, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }));
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 2:
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        break;
      case 3:
        if (!formData.fatherName) newErrors.fatherName = 'Father name is required';
        if (!formData.motherName) newErrors.motherName = 'Mother name is required';
        break;
      case 4:
        if (!formData.admissionClass) newErrors.admissionClass = 'Admission class is required';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStudentInfo();
      case 2:
        return renderContactInfo();
      case 3:
        return renderGuardianInfo();
      case 4:
        return renderAcademicInfo();
      case 5:
        return renderDocuments();
      case 6:
        return renderReview();
      default:
        return null;
    }
  };
  

  const renderStudentInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2 flex justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
            {formData.studentPhoto ? (
              <img src={URL.createObjectURL(formData.studentPhoto)} alt="Student" className="w-full h-full rounded-full object-cover" />
            ) : (
              <Camera size={32} className="text-gray-400" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
            <Camera size={16} />
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleInputChange('studentPhoto', e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          First Name *
        </label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.firstName 
              ? 'border-red-500' 
              : isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter first name"
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Last Name *
        </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.lastName 
              ? 'border-red-500' 
              : isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter last name"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Date of Birth *
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.dateOfBirth 
              ? 'border-red-500' 
              : isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Gender *
        </label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.gender 
              ? 'border-red-500' 
              : isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Nationality
        </label>
        <input
          type="text"
          value={formData.nationality}
          onChange={(e) => handleInputChange('nationality', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter nationality"
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Blood Group
        </label>
        <select
          value={formData.bloodGroup}
          onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        >
          <option value="">Select blood group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.email 
              ? 'border-red-500' 
              : isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter email address"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.phone 
              ? 'border-red-500' 
              : isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter phone number"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div className="md:col-span-2">
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Address *
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          rows={3}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.address 
              ? 'border-red-500' 
              : isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
          placeholder="Enter full address"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          City
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter city"
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          State
        </label>
        <input
          type="text"
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter state"
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          ZIP Code
        </label>
        <input
          type="text"
          value={formData.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter ZIP code"
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Country
        </label>
        <input
          type="text"
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter country"
        />
      </div>
    </div>
  );

  const renderGuardianInfo = () => (
    <div className="space-y-8">
      {/* Father's Information */}
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 pb-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          Father's Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Father's Name *
            </label>
            <input
              type="text"
              value={formData.fatherName}
              onChange={(e) => handleInputChange('fatherName', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.fatherName 
                  ? 'border-red-500' 
                  : isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter father's name"
            />
            {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Occupation
            </label>
            <input
              type="text"
              value={formData.fatherOccupation}
              onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter father's occupation"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.fatherPhone}
              onChange={(e) => handleInputChange('fatherPhone', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter father's phone"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.fatherEmail}
              onChange={(e) => handleInputChange('fatherEmail', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter father's email"
            />
          </div>
        </div>
      </div>

      {/* Mother's Information */}
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 pb-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          Mother's Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Mother's Name *
            </label>
            <input
              type="text"
              value={formData.motherName}
              onChange={(e) => handleInputChange('motherName', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.motherName 
                  ? 'border-red-500' 
                  : isDark 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter mother's name"
            />
            {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Occupation
            </label>
            <input
              type="text"
              value={formData.motherOccupation}
              onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter mother's occupation"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.motherPhone}
              onChange={(e) => handleInputChange('motherPhone', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter mother's phone"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.motherEmail}
              onChange={(e) => handleInputChange('motherEmail', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter mother's email"
            />
          </div>
        </div>
      </div>

      {/* Guardian Information */}
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 pb-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          Guardian Information (if different from parents)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Guardian's Name
            </label>
            <input
              type="text"
              value={formData.guardianName}
              onChange={(e) => handleInputChange('guardianName', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter guardian's name"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Relation to Student
            </label>
            <input
              type="text"
              value={formData.guardianRelation}
              onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter relation"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.guardianPhone}
              onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter guardian's phone"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.guardianEmail}
              onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter guardian's email"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Previous School
        </label>
        <input
          type="text"
          value={formData.previousSchool}
          onChange={(e) => handleInputChange('previousSchool', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          placeholder="Enter previous school name"
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Last Class Completed
        </label>
        <select
          value={formData.lastClass}
          onChange={(e) => handleInputChange('lastClass', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        >
          <option value="">Select last class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Admission Class *
        </label>
        <select
          value={formData.admissionClass}
          onChange={(e) => handleInputChange('admissionClass', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.admissionClass 
              ? 'border-red-500' 
              : isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        >
          <option value="">Select admission class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
        {errors.admissionClass && <p className="text-red-500 text-sm mt-1">{errors.admissionClass}</p>}
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Academic Year
        </label>
        <select
          value={formData.academicYear}
          onChange={(e) => handleInputChange('academicYear', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        >
          <option value="2024-25">2024-25</option>
          <option value="2025-26">2025-26</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
          Select Subjects (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {subjects.map((subject) => (
            <label key={subject} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.subjects.includes(subject)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('subjects', [...formData.subjects, subject]);
                  } else {
                    handleInputChange('subjects', formData.subjects.filter(s => s !== subject));
                  }
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{subject}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/30 border-blue-700/50' : 'bg-blue-50 border-blue-200'} border`}>
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-blue-500 mt-1" size={20} />
          <div>
            <h4 className={`font-semibold ${isDark ? 'text-blue-300' : 'text-blue-800'} mb-1`}>Document Requirements</h4>
            <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
              Please upload clear, readable copies of all required documents. Accepted formats: PDF, JPG, PNG (Max size: 5MB per file)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries({
          birthCertificate: 'Birth Certificate *',
          previousMarksheet: 'Previous Marksheet',
          transferCertificate: 'Transfer Certificate',
          casteCertificate: 'Caste Certificate',
          incomeCertificate: 'Income Certificate',
          medicalCertificate: 'Medical Certificate'
        }).map(([key, label]) => (
          <div key={key} className={`border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-xl p-6 text-center`}>
            <div className="space-y-3">
              <Upload className={`mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={32} />
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>{label}</h4>
                {uploadedFiles[key] ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="text-green-500" size={16} />
                    <span className="text-green-500 text-sm">{uploadedFiles[key].name}</span>
                    <button
                      onClick={() => {
                        setUploadedFiles(prev => ({ ...prev, [key]: null }));
                        handleInputChange('documents', { ...formData.documents, [key]: null });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Click to upload or drag and drop
                  </p>
                )}
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
                      handleFileUpload(key, file);
                    } else {
                      alert('File size should be less than 5MB');
                    }
                  }}
                />
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  Choose File
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-8">
      <div className={`p-6 rounded-xl ${isDark ? 'bg-green-900/30 border-green-700/50' : 'bg-green-50 border-green-200'} border`}>
        <div className="flex items-center space-x-3">
          <Check className="text-green-500" size={24} />
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-green-300' : 'text-green-800'}`}>Review Application</h3>
            <p className={`${isDark ? 'text-green-200' : 'text-green-700'}`}>Please review all information before submitting</p>
          </div>
        </div>
      </div>

      {/* Student Information Summary */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
        <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 pb-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          Student Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Name:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {formData.firstName} {formData.lastName}
            </p>
          </div>
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date of Birth:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.dateOfBirth}</p>
          </div>
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Gender:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.gender}</p>
          </div>
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Admission Class:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.admissionClass}</p>
          </div>
        </div>
      </div>

      {/* Contact Information Summary */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
        <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 pb-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          Contact Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.email}</p>
          </div>
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Phone:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.phone}</p>
          </div>
          <div className="md:col-span-2">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Address:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* Guardian Information Summary */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
        <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 pb-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          Guardian Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Father's Name:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.fatherName}</p>
          </div>
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Mother's Name:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.motherName}</p>
          </div>
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Father's Phone:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.fatherPhone}</p>
          </div>
          <div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Mother's Phone:</span>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{formData.motherPhone}</p>
          </div>
        </div>
      </div>

      {/* Documents Summary */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
        <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 pb-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          Documents Uploaded
        </h4>
        <div className="space-y-2">
          {Object.entries(uploadedFiles).map(([key, file]) => (
            file && (
              <div key={key} className="flex items-center space-x-2">
                <Check className="text-green-500" size={16} />
                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {file.name}
                </span>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );

   const handleSubmit = () => {
    try {
      // Add the student to the global state
      const newStudent = addStudent(formData);
      
      console.log('Student added successfully:', newStudent);
      
      // Show success message
      alert(`Student ${formData.firstName} ${formData.lastName} has been successfully enrolled with ID: ${newStudent.studentId}`);
      
      // Reset form or navigate to student list
      // You can redirect to All Students page here if needed
      navigate('/allstudents'); 
       
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        religion: '',
        bloodGroup: '',
        studentPhoto: null,
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        fatherName: '',
        fatherOccupation: '',
        fatherPhone: '',
        fatherEmail: '',
        motherName: '',
        motherOccupation: '',
        motherPhone: '',
        motherEmail: '',
        guardianName: '',
        guardianRelation: '',
        guardianPhone: '',
        guardianEmail: '',
        previousSchool: '',
        lastClass: '',
        admissionClass: '',
        subjects: [],
        academicYear: '2024-25',
        documents: {
          birthCertificate: null,
          previousMarksheet: null,
          transferCertificate: null,
          casteCertificate: null,
          incomeCertificate: null,
          medicalCertificate: null
        }
      });
      
      setUploadedFiles({});
      setCurrentStep(1);
      console.log('Before adding student:', students.length);
  
       console.log('After adding student:', students.length);
      
      
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
   
    <div className={`flex h-screen  ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <aside className="flex-shrink-0 transition-all duration-300 ">
                
                <Sidebar 
                  isSidebarExpanded={isSidebarExpanded}
                  setIsSidebarExpanded={setIsSidebarExpanded}
                />
              </aside>
            
             
      
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
        {/* Header */}
        
        <Header isDark={isDark} className="w-full flex items-center justify-between px-4 shadow-sm transition-all duration-300"  />
       <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-8  ">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            New Student Admission
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete all steps to submit the admission application
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex-1">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-500 text-white' 
                          : isDark 
                            ? 'bg-gray-700 text-gray-400' 
                            : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      isActive 
                        ? isDark ? 'text-blue-300' : 'text-blue-600'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                   {index < steps.length - 1 && (
                      <div className={`absolute top-6  h-0.5 ${
                          isSidebarExpanded ? 'w-25 left-25' : 'w-39 left-30' 
                        } ${
                          isCompleted ? 'bg-green-500' : isDark ? 'bg-gray-700' : 'bg-gray-300'
                        }`} 
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border shadow-lg p-8 mb-8`}>
          {renderStepContent()}
        </div>

        {/* render review after completeing all step before submission only  */}
        {currentStep === 6 && (
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border shadow-lg p-8 mb-8`}>
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 pb-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              Review
            </h4>
            <div className="space-y-2">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                    
                    {typeof value === 'object' && value !== null
                      ? " [File Object]" 
                      : ` ${value}`
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 bg-gradient-to-r from-black-900 to-grey-900 text-grey-600 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${
              currentStep === 1 ? 'opacity-50 ' : ''  
            }`}
          >
            Previous
          </button>

          {currentStep === 6 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Submit Application
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Next
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
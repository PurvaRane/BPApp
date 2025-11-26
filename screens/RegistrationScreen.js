import React, { useState } from 'react';



export default function RegistrationScreen() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    ownerId: ''
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    console.log('Registration data:', formData);
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#1E407A' }}>
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-white text-3xl font-bold text-center mb-8">Create Account</h1>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/30 transition-all hover:border-white/50">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-12 h-12 text-white/70" />
                )}
              </div>
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <button
            onClick={() => document.getElementById('imageUpload').click()}
            className="mt-4 px-6 py-2 border-2 border-white/40 text-white rounded-md text-sm font-medium transition-all hover:bg-white/10 hover:border-white/60"
          >
            SELECT IMAGE
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Username (User ID)"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/95 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/95 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>

          {/* Full Name */}
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/95 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/95 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>

          {/* Owner ID */}
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Owner ID"
              value={formData.ownerId}
              onChange={(e) => handleInputChange('ownerId', e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/95 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full mt-8 py-4 bg-white text-blue-900 rounded-lg font-bold text-lg transition-all hover:bg-white/90 hover:shadow-lg active:scale-98"
        >
          REGISTER
        </button>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <button className="text-white/90 text-base hover:text-white transition-colors">
            Already have an account? <span className="font-semibold underline">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
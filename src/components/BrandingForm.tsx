import React from 'react';
import { usePageStore } from '../store/pageStore';
import { Upload, Mail, Phone } from 'lucide-react';

const BrandingForm: React.FC = () => {
  const { settings, setLogo, setHeaderImage, setHeaderTitle, setShowDiscountCodes, setContactInfo, setBusinessName, setShowHolidayEdition } = usePageStore();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContactChange = (type: 'email' | 'phone', value: string) => {
    if (type === 'email') {
      setContactInfo(value, settings.contactPhone);
    } else {
      setContactInfo(settings.contactEmail, value);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Brand Your Page</h2>
      
      <div className="space-y-8">
        {/* Business Name Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your business name"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="holidayEdition"
              checked={settings.showHolidayEdition}
              onChange={(e) => setShowHolidayEdition(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="holidayEdition" className="ml-2 block text-sm text-gray-900">
              Add "Holiday Edition" to business name
            </label>
          </div>
          {settings.businessName && (
            <div className="mt-2 text-sm text-gray-600">
              Preview: {settings.businessName}{settings.showHolidayEdition ? ' - Holiday Edition' : ''}
            </div>
          )}
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
          <p className="text-sm text-gray-500">Add your contact details to display on your landing page</p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </span>
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </div>

        {/* Logo Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo Upload</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {settings.logo && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo Preview</label>
            <img
              src={settings.logo}
              alt="Logo preview"
              className="mt-2 h-20 object-contain"
            />
          </div>
        )}

        {/* Header Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Header Image (Optional)</label>
          <p className="text-sm text-gray-500 mb-2">
            Your template already includes a beautiful header image, but you can upload your own if you'd like to customize it further.
          </p>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a header image</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleHeaderImageUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">Recommended size: 1920x400px. PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Header Title Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Header Title (Optional)</label>
          <p className="text-sm text-gray-500 mb-2">
            Customize the main title that appears in your header. Leave empty to use the default template title.
          </p>
          <input
            type="text"
            value={settings.headerTitle}
            onChange={(e) => setHeaderTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your custom header title"
          />
        </div>

        {settings.headerImage && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Header Image Preview</label>
            <img
              src={settings.headerImage}
              alt="Header image preview"
              className="mt-2 w-full h-40 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandingForm;
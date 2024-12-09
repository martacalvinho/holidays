import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { path: '/branding', label: 'Branding' },
  { path: '/products', label: 'Products' },
  { path: '/discounts', label: 'Discounts' },
  { path: '/urgency', label: 'Urgency' },
  { path: '/preview', label: 'Preview' },
  { path: '/publish', label: 'Publish' },
];

const StepNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = steps.findIndex(step => step.path === location.pathname);

  const goToNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1].path);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1].path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
            currentIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        
        <div className="flex space-x-2">
          {steps.map((step, index) => (
            <div
              key={step.path}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex
                  ? 'bg-indigo-600'
                  : index < currentIndex
                  ? 'bg-indigo-200'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === steps.length - 1}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
            currentIndex === steps.length - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;
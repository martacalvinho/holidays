import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Package, Tags, Timer, Eye, Upload } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/branding', icon: <Palette size={20} />, label: 'Branding' },
    { path: '/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/discounts', icon: <Tags size={20} />, label: 'Discounts' },
    { path: '/urgency', icon: <Timer size={20} />, label: 'Urgency' },
    { path: '/preview', icon: <Eye size={20} />, label: 'Preview' },
    { path: '/publish', icon: <Upload size={20} />, label: 'Publish' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
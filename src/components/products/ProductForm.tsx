import React, { useState, useCallback } from 'react';
import { usePageStore } from '../../store/pageStore';
import { Upload, Plus, Image as ImageIcon } from 'lucide-react';
import type { Product } from '../../types';

const ProductForm: React.FC = () => {
  const { addProduct } = usePageStore();
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    discountPrice: undefined
  });
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      ...formData,
      id: crypto.randomUUID()
    });
    setFormData({
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
      discountPrice: undefined
    });
    setPreviewImage(null);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'price' | 'discountPrice') => {
    const value = e.target.value;
    if (value === '') {
      setFormData(prev => ({ ...prev, [field]: field === 'price' ? 0 : undefined }));
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setFormData(prev => ({ ...prev, [field]: numValue }));
      }
    }
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleImageUpload(file);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
        <div
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
            isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
          } border-dashed rounded-md transition-colors duration-200 relative`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-1 text-center">
            {previewImage ? (
              <div className="relative group">
                <img
                  src={previewImage}
                  alt="Product preview"
                  className="mx-auto h-32 w-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <p className="text-white text-sm">Drop new image or click to change</p>
                </div>
              </div>
            ) : (
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>{previewImage ? 'Change image' : 'Upload a file'}</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Regular Price</label>
          <input
            type="number"
            value={formData.price || ''}
            onChange={(e) => handlePriceChange(e, 'price')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sale Price (Optional)</label>
          <input
            type="number"
            value={formData.discountPrice || ''}
            onChange={(e) => handlePriceChange(e, 'discountPrice')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
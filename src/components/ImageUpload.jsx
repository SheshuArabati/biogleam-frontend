import { useState } from 'react';
import { uploadImage, uploadMultipleImages } from '../lib/api';

export default function ImageUpload({
  onUpload,
  onMultipleUpload,
  multiple = false,
  maxImages = 10,
  existingImages = [],
  onImagesChange,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState(existingImages);

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      if (multiple) {
        const fileArray = Array.from(files).slice(0, maxImages);
        const formData = new FormData();
        fileArray.forEach((file) => {
          formData.append('images', file);
        });

        const result = await uploadMultipleImages(formData);
        const newUrls = result.images.map((img) => img.url);
        const updatedImages = [...images, ...newUrls];
        setImages(updatedImages);
        
        if (onMultipleUpload) {
          onMultipleUpload(newUrls);
        }
        if (onImagesChange) {
          onImagesChange(updatedImages);
        }
      } else {
        const file = files[0];
        const formData = new FormData();
        formData.append('image', file);

        const result = await uploadImage(formData);
        if (onUpload) {
          onUpload(result.url);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          {multiple ? 'Upload Images' : 'Upload Image'}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={uploading}
          className="w-full px-4 py-2 border rounded-lg disabled:opacity-50"
        />
        {multiple && (
          <p className="text-xs text-gray-500 mt-1">
            You can upload up to {maxImages} images. Selected: {images.length}
          </p>
        )}
      </div>

      {uploading && (
        <div className="text-sm text-gray-600">Uploading...</div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {multiple && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {multiple && images.length > 0 && (
        <div className="text-sm text-gray-600">
          <strong>Image URLs (comma-separated):</strong>
          <textarea
            readOnly
            value={images.join(', ')}
            className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 text-sm"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}

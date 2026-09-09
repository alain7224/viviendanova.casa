import React, { useState } from 'react';
import { usePropertyStore } from '@stores/propertyStore';
import { PropertyCard } from '@components/PropertyCard';

export const AdminProperties: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    city: '',
    bedrooms: '3',
    bathrooms: '2',
    features: [] as string[],
  });

  const properties = usePropertyStore((state) => state.properties);

  const handleDragDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock implementation
    console.log('Adding property:', formData);
    setShowForm(false);
    setFormData({
      name: '',
      price: '',
      city: '',
      bedrooms: '3',
      bathrooms: '2',
      features: [],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestionar Propiedades</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          {showForm ? 'Cancelar' : '+ Nueva Propiedad'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeInUp">
          <h2 className="text-2xl font-bold mb-6">Nueva Propiedad</h2>
          <form onSubmit={handleAddProperty} className="space-y-4">
            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDragDrop}
              className="border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
            >
              <p className="text-lg font-semibold mb-2">📷 Arrastra fotos/videos aquí</p>
              <p className="text-sm text-gray-600">o haz clic para seleccionar</p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => setFiles([...files, ...Array.from(e.target.files || [])])}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                {files.length > 0 && (
                  <p className="mt-2 text-primary font-semibold">{files.length} archivo(s) seleccionado(s)</p>
                )}
              </label>
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {files.map((file, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                      className="absolute top-0 right-0 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-error/90"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Precio"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Ciudad"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Dormitorios"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg flex-1"
                />
                <input
                  type="number"
                  placeholder="Baños"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg flex-1"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Guardar Propiedad
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 text-text py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Properties Grid */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Propiedades Actuales ({properties.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img src={property.coverImage} alt={property.name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="font-bold truncate">{property.name}</h3>
                <p className="text-primary font-bold">{property.price.toLocaleString()} {property.currency}</p>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 bg-secondary text-white text-xs py-1 rounded hover:bg-secondary/90">
                    Editar
                  </button>
                  <button className="flex-1 bg-error text-white text-xs py-1 rounded hover:bg-error/90">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

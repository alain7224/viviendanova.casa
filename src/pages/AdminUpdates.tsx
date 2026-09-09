import React, { useState } from 'react';

const releaseHistory = [
  {
    version: '1.2.0',
    date: '2026-09-09',
    changes: ['Mapa inteligente sin solapamiento', 'Admin panel completo', 'Sistema de login seguro', '12 idiomas', '6 estilos de tarjetas'],
    status: 'installed',
  },
  {
    version: '1.1.9',
    date: '2026-09-08',
    changes: ['Fixes de responsive', 'Mejoras de rendimiento'],
    status: 'installed',
  },
  {
    version: '1.1.8',
    date: '2026-09-05',
    changes: ['Nuevo diseño de tarjetas', 'Analytics básico'],
    status: 'installed',
  },
];

export const AdminUpdates: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadPatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      // Mock implementation
      const content = await selectedFile.text();
      console.log('Patch content:', content);
      alert('Patch validado y listo para instalar');
    } finally {
      setIsProcessing(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Actualizaciones</h1>

      {/* Upload Patch */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Subir Parche (.patch)</h2>
        <form onSubmit={handleUploadPatch} className="space-y-4">
          <div
            className="border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file?.name.endsWith('.patch')) {
                setSelectedFile(file);
              } else {
                alert('Solo se aceptan archivos .patch');
              }
            }}
          >
            {selectedFile ? (
              <div>
                <p className="text-lg font-semibold text-primary">✓ {selectedFile.name}</p>
                <p className="text-sm text-gray-600 mt-1">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold mb-2">📦 Arrastra el archivo .patch aquí</p>
                <p className="text-sm text-gray-600">o haz clic para seleccionar</p>
                <input
                  type="file"
                  accept=".patch"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="patch-input"
                />
                <label htmlFor="patch-input" className="cursor-pointer">
                  Click aquí
                </label>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="space-y-2">
              <h3 className="font-bold">Preview de cambios:</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-40 overflow-y-auto">
                <pre>{selectedFile.name} detectado</pre>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!selectedFile || isProcessing}
              className="flex-1 bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isProcessing ? 'Procesando...' : 'Instalar Parche'}
            </button>
            {selectedFile && (
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="px-6 py-2 bg-gray-300 rounded-lg font-bold hover:bg-gray-400"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Release History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Historial de Versiones</h2>
        <div className="space-y-4">
          {releaseHistory.map((release) => (
            <div key={release.version} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold">v{release.version}</h3>
                  <p className="text-sm text-gray-600">{release.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    release.status === 'installed'
                      ? 'bg-success/20 text-success'
                      : 'bg-warning/20 text-warning'
                  }`}
                >
                  {release.status === 'installed' ? '✓ Instalada' : 'Disponible'}
                </span>
              </div>
              <ul className="space-y-1">
                {release.changes.map((change, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span>•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import { dateFormatter, createDateFromISO } from '../utils/dateUtils';

const EntryModal = ({ isOpen, onClose, date, currentHours, currentDescription, onSave }) => {
  const [hours, setHours] = useState(currentHours || '');
  const [logDescription, setLogDescription] = useState(currentDescription || '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setHours(currentHours !== undefined && currentHours !== null ? currentHours.toString() : '');
    setLogDescription(currentDescription || '');
    setError('');
    setIsSaving(false);
  }, [isOpen, currentHours, currentDescription, date]);

  if (!isOpen || !date) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    const hoursNum = parseFloat(hours);

    if (isNaN(hoursNum) || hoursNum < 1 || hoursNum > 24) {
      setError('Por favor, ingresa un número entre 1 y 24.');
      return;
    }

    setError('');
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await onSave(date, hoursNum, logDescription);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const dateObj = createDateFromISO(date);
  const formattedDate = dateFormatter.format(dateObj).split(',');
  const dayName = formattedDate[0].charAt(0).toUpperCase() + formattedDate[0].slice(1);
  const dayDetails = formattedDate[1].trim();
  const isEditing = currentHours !== undefined && currentHours > 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-200">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-fade-in">
        <form onSubmit={handleSave} className="p-6 text-gray-900">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {isEditing ? 'Modificar Registro' : 'Nuevo Registro'}
            </h3>
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Fecha */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <p className="text-md font-semibold text-indigo-600">
              {dayName}, {dayDetails}
            </p>
          </div>

          {/* Horas trabajadas */}
          <div className="mb-4">
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
              Horas trabajadas *
            </label>
            <div className="relative">
              <input
                id="hours"
                name="hours"
                type="number"
                min="1" // 🔹 ahora mínimo 1
                max="24"
                step="0.5"
                required
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                disabled={isSaving}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 disabled:opacity-70 ${
                  error ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Ejemplo: 8.0"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              rows="3"
              value={logDescription}
              onChange={(e) => setLogDescription(e.target.value)}
              disabled={isSaving}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 resize-none disabled:opacity-70"
              placeholder="Descripción del trabajo realizado..."
            ></textarea>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 shadow-md flex items-center justify-center disabled:opacity-80"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryModal;

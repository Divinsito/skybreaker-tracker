// src/components/TimeEntryRow.jsx
import React from 'react';
import { Plus, X, Pencil } from 'lucide-react'; 
import { dateFormatter, createDateFromISO } from '../utils/dateUtils';

const TimeEntryRow = ({ date, hours, description, onOpenModal, onDeleteLog }) => {
  const dateObj = createDateFromISO(date);
  const formattedDate = dateFormatter.format(dateObj).split(',');
  const dayName = formattedDate[0].charAt(0).toUpperCase() + formattedDate[0].slice(1);
  const dayDetails = formattedDate[1].trim();

  const isLogged = hours !== undefined && hours !== null && hours > 0;

  return (
    <div className="flex flex-col items-start justify-between p-4 bg-white rounded-xl shadow-md transition-shadow border-l-4 border-gray-200 hover:shadow-lg">
      <div className="flex flex-col mb-3">
        <p className="text-md font-semibold text-gray-900 capitalize">
          {dayName}, {dayDetails}
        </p>
        
        {isLogged && description ? (
            <p className="text-sm text-gray-500 truncate mt-1">
                {description}
            </p>
        ) : (
             <p className="text-sm text-gray-500">
                Sin registro
            </p>
        )}
      </div>
      
      <div className="flex items-center justify-between w-full">
        <span className={`text-2xl font-extrabold ${isLogged ? 'text-indigo-600' : 'text-gray-400'}`}>
          {isLogged ? `${hours.toFixed(1)}h` : '0.0h'}
        </span>
        
        <div className="flex space-x-2">
          {isLogged ? (
            <>
              <button
                onClick={onOpenModal} 
                aria-label={`Modificar horas para el ${dayDetails}`}
                className="p-2 text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors"
                title="Modificar"
              >
                <Pencil className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => onDeleteLog(date)}
                aria-label={`Eliminar registro de horas para el ${dayDetails}`}
                className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                title="Eliminar"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={onOpenModal}
              aria-label={`Registrar horas para el ${dayDetails}`}
              className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-lg hover:bg-green-200 transition-colors flex items-center"
              title="Agregar"
            >
              <Plus className="w-4 h-4 mr-1" />
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeEntryRow;
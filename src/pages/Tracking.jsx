// src/pages/Tracking.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, Clock } from 'lucide-react'; 
import { getApril2025Weekdays } from '../utils/dateUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import EntryModal from '../components/EntryModal';
import TimeEntryRow from '../components/TimeEntryRow';

const Tracking = () => {
  const [logs, setLogs] = useLocalStorage('april2025TimeLogs', {});

  const [modalState, setModalState] = useState({
    isOpen: false,
    date: null,
    currentHours: null,
    currentDescription: null,
  });

  const aprilWeekdays = useMemo(getApril2025Weekdays, []);

  const addOrUpdateLog = useCallback((date, hours, description) => {
    setLogs(prevLogs => ({
      ...prevLogs,
      [date]: { hours, description },
    }));
  }, [setLogs]);

  const deleteLog = useCallback((date) => {
    setLogs(prevLogs => {
      const newLogs = { ...prevLogs };
      delete newLogs[date];
      return newLogs;
    });
  }, [setLogs]);

  const openModal = useCallback((date, entry) => {
    const hours = entry ? entry.hours : 0;
    const description = entry ? entry.description : '';

    setModalState({
      isOpen: true,
      date,
      currentHours: hours,
      currentDescription: description,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      date: null,
      currentHours: null,
      currentDescription: null,
    });
  }, []);

  const totalHours = useMemo(() => {
    return Object.values(logs || {}).reduce((sum, entry) => sum + (entry.hours || 0), 0);
  }, [logs]);

  const registeredDaysCount = useMemo(() => {
    return Object.keys(logs || {}).filter(date => logs[date]?.hours > 0).length;
  }, [logs]);

  const totalAprilWeekdays = useMemo(() => aprilWeekdays.length, [aprilWeekdays]);

  const averageDailyHours = useMemo(() => {
    return registeredDaysCount > 0 ? totalHours / registeredDaysCount : 0;
  }, [totalHours, registeredDaysCount]);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <h1 className="text-xl font-extrabold text-gray-900 mb-6">
            Abril 2025: Días Laborables
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 bg-white rounded-xl shadow-md border-b-4 border-indigo-500 transition-colors">
            <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-indigo-400" /> Total de horas
            </p>
            <span className="text-2xl font-bold text-indigo-600">
              {totalHours.toFixed(1)}h
            </span>
          </div>

          <div className="p-5 bg-white rounded-xl shadow-md border-b-4 border-green-500 transition-colors">
            <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-green-400" /> Días registrados
            </p>
            <span className="text-2xl font-bold text-green-600">
              {registeredDaysCount} / {totalAprilWeekdays}
            </span>
          </div>

          <div className="p-5 bg-white rounded-xl shadow-md border-b-4 border-orange-500 transition-colors">
            <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-orange-400" /> Promedio diario
            </p>
            <span className="text-2xl font-bold text-orange-600">
              {averageDailyHours.toFixed(1)}h
            </span>
          </div>
        </div>

        {/* Days List (R: Read operation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {aprilWeekdays.map((date) => (
            <TimeEntryRow
              key={date}
              date={date}
              hours={logs[date]?.hours} 
              description={logs[date]?.description}
              onOpenModal={() => openModal(date, logs[date])}
              onDeleteLog={deleteLog}
            />
          ))}
        </div>
        
      </div>

      {/* Entry Modal (C, U) */}
      <EntryModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        date={modalState.date}
        currentHours={modalState.currentHours}
        currentDescription={modalState.currentDescription}
        onSave={addOrUpdateLog}
      />
    </>
  );
};

export default Tracking;
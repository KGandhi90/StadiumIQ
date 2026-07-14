import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LIVE_MATCH, INITIAL_ALERTS } from '../utils/constants';
import { subscribeToAlerts } from '../api/firebase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentMatch, setCurrentMatch] = useState(LIVE_MATCH);
  const [alerts, setAlerts]             = useState(INITIAL_ALERTS);
  const [minute, setMinute]             = useState(67);

  // Tick match clock
  useEffect(() => {
    const timer = setInterval(() => {
      setMinute(m => m < 90 ? m + 1 : m);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Firebase real-time alerts
  useEffect(() => {
    const unsub = subscribeToAlerts(firestoreAlerts => {
      if (firestoreAlerts.length > 0) setAlerts(firestoreAlerts);
    });
    return unsub;
  }, []);

  return (
    <AppContext.Provider value={{ currentMatch, alerts, setAlerts, minute }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = { children: PropTypes.node.isRequired };

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

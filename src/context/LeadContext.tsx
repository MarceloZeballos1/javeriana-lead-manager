import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Lead } from '../types';

interface LeadContextType {
  leads: Lead[];
  addLead: (lead: Lead) => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

interface LeadProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'javeriana_leads';

export const LeadProvider = ({ children }: LeadProviderProps) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Lead[];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const addLead = (lead: Lead) => {
    setLeads((prev) => [...prev, lead]);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = (): LeadContextType => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};

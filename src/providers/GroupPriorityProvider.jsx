import React, { createContext, useState, useContext } from 'react';
import { GROUPING_OPTIONS } from '../constants/options';
import { PRIORITY_OPTIONS } from '../constants/options';

const GroupPriorityContext = createContext();


export const GroupPriorityProvider = ({ children }) => {
  const [grouping, setGrouping] = useState(GROUPING_OPTIONS.STATUS);
  const [priority, setPriority] = useState(PRIORITY_OPTIONS.PRIORITY);

  const updateGrouping = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const updatePriority = (newPriority) => {
    setPriority(newPriority);
  };

  return (
    <GroupPriorityContext.Provider value={{ grouping, priority, updateGrouping, updatePriority }}>
      {children}
    </GroupPriorityContext.Provider>
  );
};

export const useGroupPriority = () => {
    const context = useContext(GroupPriorityContext);
  
    if (!context) {
      throw new Error('useGroupPriority must be used within a GroupPriorityProvider');
    }
  
    return context;
  };

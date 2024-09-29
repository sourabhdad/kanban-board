import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { useGroupPriority } from "../../providers/GroupPriorityProvider";

const GROUPING_OPTIONS = {
  STATUS: "Status",
  USER: "User",
  PRIORITY: "Priority",
};

const PRIORITY_OPTIONS = {
  PRIORITY: "Priority",
  TITLE: "Title",
};

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { grouping, priority, updateGrouping, updatePriority } =
    useGroupPriority();

  // Load saved state from localStorage when the component mounts
  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping");
    const savedPriority = localStorage.getItem("priority");

    if (savedGrouping) {
      updateGrouping(savedGrouping);
    }
    if (savedPriority) {
      updatePriority(savedPriority);
    }
  }, [updateGrouping, updatePriority]);

  // Save grouping to localStorage when it changes
  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    updateGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping); // Persist in localStorage
  };

  // Save priority to localStorage when it changes
  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    updatePriority(newPriority);
    localStorage.setItem("priority", newPriority); // Persist in localStorage
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.dropdownButton} onClick={handleMouseEnter}>
        <img src="/assets/Display.svg" alt="display icon" /> Display{" "}
        <img src="/assets/down.svg" alt="down icon" />
      </div>

      {isDropdownOpen && (
        <div
          className={styles.dropdownContent}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.dropdownField}>
            <label htmlFor="grouping">Grouping</label>
            <select
              name="grouping"
              id="grouping"
              value={grouping}
              onChange={handleGroupingChange}
            >
              {Object.entries(GROUPING_OPTIONS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.dropdownField}>
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={handlePriorityChange}
            >
              {Object.entries(PRIORITY_OPTIONS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

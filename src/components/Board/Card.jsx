import styles from "./card.module.css";
import React, { useState, useEffect } from "react";

const Card = ({ card, userData }) => {
  const [isChecked, setIsChecked] = useState(false);

  // Load checkbox state from Local Storage
  useEffect(() => {
    const savedCheckedState = localStorage.getItem(`checkbox-${card.id}`);
    if (savedCheckedState !== null) {
      setIsChecked(JSON.parse(savedCheckedState)); // Parse and set the state
    }
  }, [card.id]);

  const handleCheckboxClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    localStorage.setItem(
      `checkbox-${card.id}`,
      JSON.stringify(newCheckedState)
    ); // Save to Local Storage
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardhead}>
        <div style={{ color: "#8c8b8b" }}>{card.id}</div>
      </div>
      <div className={styles.title}>
        <img
          src={isChecked ? "/assets/DONE.svg" : "/assets/TODO.svg"}
          alt="checkbox"
          onClick={handleCheckboxClick}
          className={styles.checkbox}
        />
        <div>{card.title}</div>
      </div>
      <div className={styles.cardfooter}>
        <img src={`/assets/${card.priority}.svg`} alt="priorityimg" />
        {card.tag.map((tagValue, index) => (
          <div key={index} className={styles.tags}>
            <img src="/assets/tag.svg" alt="tag" />
            <span>{tagValue}</span>
          </div>
        ))}
      </div>
      <d></d>
    </div>
  );
};

export default Card;

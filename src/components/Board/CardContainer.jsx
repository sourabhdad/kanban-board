import React from "react";
import styles from "./cardContainer.module.css";
import Card from "./Card";
import CardContainerTitle from "./CardContainerTitle";

const PriorityNumberToText = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const CardContainer = ({ data, grouping, status, userData, priority }) => {
  const len = data ? data.length : 0;
  console.log(userData);
  switch (grouping) {
    case "STATUS":
      return CardContainerByStatus(data, status, len, userData);
    case "USER":
      return CardContainerByUser(data, len, userData);
    case "PRIORITY":
      return CardContainerByPriority(data, len, priority, userData);
    default:
      return CardContainerByStatus(data, status, len, userData);
  }
};

const CardContainerByStatus = (data, status, len, userData) => {
  return (
    <div className={styles.cardContainer}>
      <CardContainerTitle status={status} length={len} />
      {data?.map((card) => {
        return <Card card={card} userData={userData} />;
      })}
    </div>
  );
};

const CardContainerByUser = (data, len, userData) => {
  return (
    <div className={styles.cardContainer}>
      <CardContainerTitle length={len} userData={userData} />
      {data?.map((card) => {
        return <Card card={card} />;
      })}
    </div>
  );
};

const CardContainerByPriority = (data, len, priority) => {
  return (
    <div className={styles.cardContainer}>
      <CardContainerTitle
        length={len}
        title={PriorityNumberToText[priority]}
        priority={priority}
      />

      {data?.map((card) => {
        return <Card card={card} />;
      })}
    </div>
  );
};

export default CardContainer;

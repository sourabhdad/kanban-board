import React from "react";
import styles from "./cardContainer.module.css";
import { toTitleCase } from "../../utils/TitleCase";

const CardContainerTitle = ({ status, length, userData, title, priority }) => {
  return (
    <div className={styles.cardContainerTitle}>
      <div className={styles.headingLeft}>
        {status && (
          <img
            src={`/assets/${status}.svg`}
            className={styles.image}
            alt="status"
          />
        )}
        {priority !== undefined && (
          <img src={`assets/${priority}_.svg`} alt="status" />
        )}
        {userData && (
          <>
            <div
              style={{
                width: "22px",
                height: "22px",
                backgroundColor: `#${Math.floor(
                  Math.random() * 16777215
                ).toString(16)}`, // Random color
                borderRadius: "50%",
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              {userData.name
                .split(" ")
                .map((nameFragment) => nameFragment[0].toUpperCase())}
            </div>
          </>
        )}

        {userData && <p>{userData.name}</p>}
        {title && <p>{title}</p>}
        {status && <p>{toTitleCase(status)}</p>}
        <p style={{ color: "#8c8b8b" }}>{length}</p>
      </div>
      <div className={styles.options}>
        <img src="/assets/add.svg" alt="" />
        <img src="/assets/3dot.svg" alt="" />
      </div>
    </div>
  );
};

export default CardContainerTitle;

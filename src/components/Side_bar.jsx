import React, { useState } from "react";
import useLocalStorage from "./useLocalStorage";  // Import the hook
import styles from "../design/App.module.css";
import Modal from "./Modal";

function Side_bar({ onGroupSelect }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useLocalStorage("groups", []);
  const [activeGroup, setActiveGroup] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addGroup = (groupName, color) => {
    const newGroup = { id: Date.now(), name: groupName, color };
    setGroups([...groups, newGroup]);
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : name[0].toUpperCase() + name.slice(-1).toUpperCase();
  };

  const handleGroupClick = (group) => {
    setActiveGroup(group);
    onGroupSelect(group);
  };

  return (
    <div className={styles.sideBar}>
      <h1>Pocket Note</h1>
      <div className={styles.note}>
        <button className={styles.btn} onClick={toggleModal}>
          &emsp;+&emsp;
        </button>
      </div>

      <div className={styles.groupList}>
        {groups.map((group, index) => (
          <div
            key={index}
            className={`${styles.groupItem} ${activeGroup === group ? styles.activeGroup : ""}`}
            onClick={() => handleGroupClick(group)}
          >
            <span
              className={`${styles.colorIcon}`}
              style={{ backgroundColor: group.color }}
            >
              {getInitials(group.name)}
            </span>
            <span className={styles.groupName}>{group.name}</span>
          </div>
        ))}
      </div>

      {isModalOpen && <Modal toggleModal={toggleModal} addGroup={addGroup} />}
    </div>
  );
}

export default Side_bar;

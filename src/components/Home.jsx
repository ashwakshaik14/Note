import React, { useState, useEffect } from 'react';
import Side_bar from './Side_bar';
import Notesadder from './Notesadder';
import Pic from '../assets/main.png';
import lock from '../assets/lock.png';
import styles from '../design/App.module.css';
import useLocalStorage from './useLocalStorage';  // Import the custom hook

function Home() {
    const [selectedGroup, setSelectedGroup] = useState(null);

    // Use useLocalStorage hook to get and set group notes from localStorage
    const [groupNotes, setGroupNotes] = useLocalStorage('groupNotes', {}); // Default to an empty object if no data is found

    // Function to handle selecting a group
    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
    };

    // Function to add a note for a specific group
    const addNoteToGroup = (groupName, note) => {
        setGroupNotes((prevNotes) => ({
            ...prevNotes,
            [groupName]: [...(prevNotes[groupName] || []), note]
        }));
    };

    return (
        <div className={styles.container}>
            <Side_bar onGroupSelect={handleGroupSelect} />
            
            <div className={styles.mainContent}>
                {selectedGroup ? (
                    <Notesadder 
                        selectedGroup={selectedGroup}
                        notes={groupNotes[selectedGroup.name] || []}
                        addNote={(note) => addNoteToGroup(selectedGroup.name, note)}
                    />
                ) : (
                    <div className={styles.contentArea}>
                        <img src={Pic} alt="Main" width={500} height={250}/>
                        <h1>Pocket Notes</h1>
                        <br/>
                        <p>Send and receive messages without keeping your phone online.<br/>
                           Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
                    </div>
                )}
                
                {/* Render the bottom section only if no group is selected */}
                {!selectedGroup && (
                    <div className={styles.bottom}>
                        <img src={lock} alt="Lock" />
                        <p>end-to-end encrypted</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;

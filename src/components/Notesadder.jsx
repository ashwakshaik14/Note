import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import styles from '../design/App.module.css';

function Notesadder({ selectedGroup, addNote }) {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useLocalStorage(selectedGroup?.name || "defaultGroup", []); // Fetch the notes for the selected group

    const handleAddNote = () => {
        if (note.trim()) {
            // Get the current date and time
            const now = new Date();

            // Extract date, month, year
            const day = now.getDate();
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = months[now.getMonth()];
            const year = now.getFullYear();

            // Extract hours and minutes, and format to 12-hour with AM/PM
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)

            // Format the final timestamp
            const formattedTimestamp = `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;

            // Add the new note to the list
            const newNotes = [...notes, { text: note, timestamp: formattedTimestamp }];
            setNotes(newNotes);
            setNote(""); // Clear the input
        }
    };

    return (
        <div className={styles.notesContainer}>
            <h2 className={styles.groupTitle}>
                {selectedGroup ? (
                    <>
                        <span className={styles.groupIcon} style={{ backgroundColor: selectedGroup.color }}>
                            {selectedGroup.name
                                .split(" ")
                                .map(word => word[0])
                                .join("")
                                .toUpperCase()}
                        </span>
                        {selectedGroup.name}
                    </>
                ) : "My Notes"}
            </h2>
            <div className={styles.notesList}>
                {notes.map((note, index) => (
                    <div key={index} className={styles.noteItem}>
                        <div className={styles.noteText}>{note.text}</div>
                        <div className={styles.noteTimestamp}>{note.timestamp}</div>
                    </div>
                ))}
            </div>
            <div className={styles.noteInput}>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter your text here..."
                    className={styles.textArea}
                />
                <button
                    onClick={handleAddNote}
                    className={styles.addButton}
                    disabled={!note.trim()}
                    style={{ color: note.trim() ? '#007bff' : 'lightgray' }}
                />
            </div>
        </div>
    );
}

export default Notesadder;

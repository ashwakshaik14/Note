import React, { useState } from 'react';
import './Modal.css';

export default function Modal({ toggleModal, addGroup }) {
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

    const handleCreateGroup = () => {
        if (groupName && selectedColor) {
            addGroup(groupName, selectedColor);  // Add group to the sidebar
            toggleModal();
        } else {
            // Optional: Show an error if group name or color is missing
            alert("Please enter a group name and choose a color.");
        }
    };

    return (
        <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Create New Group</h2>
                
                <div className="form-group">
                    <label htmlFor="groupName">Group Name</label>
                    <input 
                        type="text" 
                        id="groupName" 
                        placeholder="Enter group name" 
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label>Choose Colour</label>
                    <div className="color-options">
                        {colors.map((color, index) => (
                            <span
                                key={index}
                                className="color-circle"
                                style={{
                                    backgroundColor: color,
                                    border: selectedColor === color ? "2px solid black" : "none",
                                }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="button-container">
                    <button className="create-button" onClick={handleCreateGroup}>Create</button>
                </div>
            </div>
        </div>
    );
}
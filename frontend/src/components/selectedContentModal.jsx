import React, { useState, useEffect } from "react";

const ContentModal = (props) => {
    const { selectedContent, handleCloseModal, isEdit, refreshTrigger } = props;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editMode, setEditMode] = useState(isEdit);

    // Ustawienie tytułu i zawartości po wybraniu nowej treści
    useEffect(() => {
        setTitle(selectedContent.title);
        setContent(selectedContent.content);
    }, [selectedContent]);

    const handleCommitChanges = () => {
        setEditMode(false);
        let titleValue = document.getElementById("titleInput").value;
        let contentValue = document.getElementById("contentInput").value;
        let contentId = selectedContent._id;

        const updatedData = {
            title: titleValue,
            content: contentValue
        };

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch(`${BASE_API_URL}/contents/${contentId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    refreshTrigger();
                    console.log("Content updated successfully");
                } else {
                    throw new Error("Failed to update content");
                }
            })
            .catch((error) => console.error("Error updating content:", error));
    };
    
    
    const deleteFunction = () => {
        let contentId = selectedContent._id;

        const requestOptions = {
            method: "DELETE",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch(`${BASE_API_URL}/contents/${contentId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    refreshTrigger();
                    console.log("Content updated successfully");
                } else {
                    throw new Error("Failed to update content");
                }
            })
            .catch((error) => console.error("Error updating content:", error));
    };

    
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                {editMode ? (
                    <>
                        <h2><input id="titleInput" type="text" value={title} onChange={(event) => setTitle(event.target.value)} /></h2>
                        <p><input id="contentInput" type="text" value={content} onChange={(event) => setContent(event.target.value)} /></p>
                        <button onClick={handleCommitChanges}>COMMIT</button>
                        <button onClick={deleteFunction}>DELETE</button>                    </>
                ) : (
                    <>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <button onClick={() => setEditMode(true)}>EDIT</button>
                        <button onClick={deleteFunction}>DELETE</button>  
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentModal;

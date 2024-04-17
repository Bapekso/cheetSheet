import React, { useEffect, useState } from "react";
import "./app.css";
import AddContent from "./components/addContent";
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";
import ContentModal from "./components/selectedContentModal";

const contentRefetch = createTrigger();

function App() {
    const requestNewContentsValue = useTrigger(contentRefetch);

    const [content, setContent] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [isEdit, setIsEdit] = useState(false); 

    useEffect(() => {
        fetch(`${BASE_API_URL}/contents`)
            .then(resp => resp.json())
            .then(data => {
                setContent(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [requestNewContentsValue]);

    const handleClick = (id) => {
        fetch(BASE_API_URL + "/contents" + `/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setSelectedContent(data);
            })
            .catch((error) => console.error("Error fetching content:", error));
    };

    const handleCloseModal = () => {
        setSelectedContent(null);
    };

    
    return (
        <>
            <h1>Testy</h1>
            <div className="isBody">
                {content.map((item) => (
                    <div className="container" key={item._id} onClick={() => handleClick(item._id)}>
                        <h2>{item.title}</h2>
                    </div>
                ))}
                {selectedContent && (
                    <ContentModal refreshTrigger={contentRefetch} selectedContent={selectedContent} handleCloseModal={handleCloseModal} isEdit={isEdit} />
                )}
            </div>
            <AddContent onAdd={contentRefetch}/>
            
        </>
    );
}

export default App;

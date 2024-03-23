import React, {useContext, useState} from 'react';
import {context} from '../contexts/NoteContext';
import '../assets/css/create-note-container.css';

function componentDidMount() {
    document.querySelectorAll('#entrypoint input, #entrypoint textarea').forEach((element) => {
        element.addEventListener('mouseover', (e) => {
            e.target.focus();
        })
    })
}
function CreateNoteContainer(props) {
    const {createNote} = useContext(context)
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    componentDidMount();
        return (
            <div className={'create-note-container ext-container'}>
                <input type="text" className={'description'} placeholder={'Your note description...'} value={description} onChange={(e) => setDescription(e.target.value)}/>
                <textarea className={'content'} placeholder={'Your note content...'} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button className={'save-btn'} onClick={() => {
                    setDescription('');
                    setContent('');
                    createNote(content, description);
                }}>Save</button>
            </div>
        );
}

export default CreateNoteContainer;
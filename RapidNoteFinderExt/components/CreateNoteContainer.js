import React, {useContext} from 'react';
import {context} from '../contexts/NoteContext'
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
    componentDidMount();
        return (
            <div className={'create-note-container ext-container'}>
                <input type="text" className={'description'} placeholder={'Your note description...'}/>
                <textarea className={'content'} placeholder={'Your note content...'}></textarea>
                <button className={'save-btn'} onClick={createNote}>Save</button>
            </div>
        );
}

export default CreateNoteContainer;
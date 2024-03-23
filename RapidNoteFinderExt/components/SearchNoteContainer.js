import React, {useState, useContext} from 'react';
import {context} from "../contexts/NoteContext";
import '../assets/css/search-note-container.css';

function componentDidMount() {
    document.querySelectorAll('#entrypoint input, #entrypoint textarea').forEach((element) => {
        element.addEventListener('mouseover', (e) => {
            e.target.focus();
        })
    });
}
function SearchNoteContainer(props) {
    const [description, setDescription] = useState('');
    const {findNote} = useContext(context)
    componentDidMount();
        return (
            <div className={'ext-container'}>
                <input type="text" value={description} className={'description'} placeholder={'Describe your note'} onKeyUp={(e) => {
                    if(e.key == 'Enter')
                        findNote(description);
                }}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}/>
                <div className={'response'}></div>
               <div id="editor"></div>
            </div>
        );
}

export default SearchNoteContainer;
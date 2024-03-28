import React, {useState, useContext, useEffect, useRef } from 'react';
import {context} from "../contexts/NoteContext";
import '../assets/css/search-note-container.css';
import injectScript from "../scripts/injectScript";
import { Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function componentDidMount() {
    document.querySelectorAll('#entrypoint input, #entrypoint textarea').forEach((element) => {
        element.addEventListener('mouseover', (e) => {
            e.target.focus();
        })
    });
}

function SearchNoteContainer(props) {
    const [editorValue, setEditorValue] = useState('');
    const editorRef = useRef(null);
    const handleChange = (value) => {
        setEditorValue(value);
    };

    const handlePaste = () => {
        // Restore the editor's scroll position after pasting
        const editor = editorRef.current.getEditor();
        const range = editor.getSelection();
        editor.setSelection(range.index + 1, range.length);
    };

    const [description, setDescription] = useState('');
    const {findNote} = useContext(context)
        return (
            <div className={'ext-container'}>
                <input type="text" value={description} className={'description'} placeholder={'Describe your note'} onKeyUp={(e) => {
                    if(e.key == 'Enter')
                        findNote(description, setEditorValue);
                }}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}/>

                <div style={{ height: '400px', overflowY: 'auto', overflowX: 'auto', width: '100%' , display: 'none'}} id={'quill-editor-wrapper'}>
                    <ReactQuill id={'quill-editor'} value={editorValue} onChange={handleChange} onPaste={handlePaste}  ref={editorRef} />
                </div>
            </div>
        );
}

export default SearchNoteContainer;
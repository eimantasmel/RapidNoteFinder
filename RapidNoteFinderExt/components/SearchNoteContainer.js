import React, {useState, useContext, useEffect, useRef, useLayoutEffect  } from 'react';
import {context} from "../contexts/NoteContext";
import '../assets/css/search-note-container.css';
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
    const {findNote, updateNote} = useContext(context)
    const editorRef = useRef(null);
    const editorValueRef = useRef('');
    const handleChange = (value) => {
        setEditorValue(value);
    };

    const handlePaste = () => {
        const editor = editorRef.current.getEditor();
        const range = editor.getSelection();
        editor.setSelection(range.index + 1, range.length);
    };

    useEffect(() => {
        componentDidMount();
        editorValueRef.current = editorValue;
    })

    useLayoutEffect(() => {
        // This function will be called when the component is mounted
        return () => {
            // This function will be called when the component is about to unmount
            console.log(editorValueRef.current)
            updateNote(editorValueRef.current);
            console.log('Component is unmounting');
        };
    }, []);

    const [description, setDescription] = useState('');
        return (
            <div className={'ext-container'}>
                <input type="text" value={description} className={'description'} placeholder={'Describe your note'} onKeyUp={(e) => {
                    if(e.key == 'Enter')
                        findNote(description, setEditorValue);
                }}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}/>

                <div style={{ height: '400px', overflowY: 'auto', overflowX: 'auto', width: '100%' , display: 'none', color: 'white'}} id={'quill-editor-wrapper'}>
                    <ReactQuill id={'quill-editor'} value={editorValue} onChange={handleChange} onPaste={handlePaste}  ref={editorRef} />
                    <input type="hidden" id={'note-id'}/>
                </div>
            </div>
        );
}

export default SearchNoteContainer;
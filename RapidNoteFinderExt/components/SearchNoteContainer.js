import React, {useState, useContext, useEffect, useRef, useLayoutEffect  } from 'react';
import {context} from "../contexts/NoteContext";
import '../assets/css/search-note-container.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoaderComponent from './LoaderComponent';

function componentDidMount() {
    document.querySelectorAll('#entrypoint input, #entrypoint textarea').forEach((element) => {
        element.addEventListener('mouseover', (e) => {
            e.target.focus();
        })
    });
}

function SearchNoteContainer(props) {
    const [editorValue, setEditorValue] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const {findNote, updateNote, showLoader} = useContext(context)
    const editorRef = useRef(null);
    const editorValueRef = useRef('');
    const handleChange = (value) => {
        setEditorValue(value);
        setIsUpdated(true);
    };

    useEffect(() => {
        componentDidMount();
        editorValueRef.current = editorValue;
    })

    useLayoutEffect(() => {
        // This function will be called when the component is mounted
        return () => {
            // This function will be called when the component is about to unmount
            if(isUpdated)
                updateNote(editorValueRef.current);
        };
    }, [isUpdated]);

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

                {showLoader && <LoaderComponent />}

                <div style={{ maxHeight: '90%', overflowY: 'auto', overflowX: 'auto', width: '100%' , display: 'none', color: 'white', marginBottom: '10px' }} id={'quill-editor-wrapper'}>
                    <ReactQuill id={'quill-editor'} value={editorValue} onChange={handleChange} ref={editorRef} />
                    <input type="hidden" id={'note-id'}/>
                </div>
            </div>
        );
}

export default SearchNoteContainer;
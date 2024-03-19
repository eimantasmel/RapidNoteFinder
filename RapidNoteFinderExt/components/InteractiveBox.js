import React, {useContext} from 'react';
import Navbar from "./Navbar";
import CreateNoteContainer from "./CreateNoteContainer";
import {context} from '../contexts/NoteContext'
import SearchNoteContainer from "./SearchNoteContainer";
import '../assets/css/interactibe-box.css';

function InteractiveBox(props) {
        const {showCreateCont} = useContext(context)
        return (
            <div id={'interactive-box'}>
                <Navbar />
                {
                    showCreateCont ?
                        ( <CreateNoteContainer />)
                        :
                        (<SearchNoteContainer />)
                }
            </div>
        );
}

export default InteractiveBox;
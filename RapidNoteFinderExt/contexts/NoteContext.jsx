import React, {Component} from 'react';
import doubleClickEvent from "../scripts/doubleClick";
import axios from 'axios';
import getAssociation from "../scripts/getAssociation";
import host from '../scripts/apiHost'; 

export const context = React.createContext();
class NoteContext extends Component {

    constructor() {
        super();

        this.state = {
            showBox: false,
            showCreateCont: false,
            showSearchCont: true,
            showLoader: false,
            lastKeyDownContainer: {lastKeyDown: null}
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if(e.key == 'F8')
            {
                doubleClickEvent(this.state.lastKeyDownContainer, () => {
                    this.setState(prevState => ({
                        showBox: !prevState.showBox
                    }));
                })
            }
            else if(e.key == 'Escape')
                this.setState({
                    showBox: false
                });
        })
    }

    showSearchContainer() {
        this.setState({
            showCreateCont: false,
            showSearchCont: true,
        }, () => {
            document.querySelector('#showsearch').style.background = 'darkred'
            document.querySelector('#showcreate').style.background = 'deeppink'
        })
    }
    showCreateContainer() {
        this.setState({
            showCreateCont: true,
            showSearchCont: false,
        }, () => {
            document.querySelector('#showsearch').style.background = 'deeppink'
            document.querySelector('#showcreate').style.background = 'darkred'
        })
    }

    async createNote(content, description) {
        const associate = await getAssociation() ?? '';
        this.setState({
            showLoader: true
        });
        fetch(`${host}/api/note/add`, {
            method: 'post',
            body: JSON.stringify({
                content,
                description,
                associate,
            }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({
                showLoader: false
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            this.setState({
                showLoader: false
            });
        });
    }

    updateNote(content) {
        const noteId = document.getElementById('note-id').dataset.noteId;
        fetch(`${host}/api/note/update/${noteId}`, {
            method: 'post',
            body: JSON.stringify({
              content: content
            })
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }

    async findNote(description, setEditorValue) {
        this.setState({
            showLoader: true
        });
        const associate = await getAssociation() ?? '';
        axios.get(`${host}/api/note/find`, {
            params: {
                description: description,
                associate: associate
            }
        })
        .then(response => {
            this.setState({
                showLoader: false
            });
            const {content, noteId } = response.data;
            document.querySelector('.ext-container #quill-editor-wrapper').style.display = 'block';
            const noteIdElement = document.querySelector('#quill-editor-wrapper #note-id')
            noteIdElement.dataset.noteId = noteId;
            setEditorValue(content);
        })
        .catch(err => {
            console.log(err);
            this.setState({
                showLoader: false
            });
        })
    }

    render() {
        return (
        <context.Provider value={{
            ...this.state,
            showCreateContainer: this.showCreateContainer.bind(this),
            showSearchContainer: this.showSearchContainer.bind(this),
            createNote: this.createNote.bind(this),
            findNote: this.findNote.bind(this),
            updateNote: this.updateNote.bind(this),
        }}>
            {this.props.children}
        </context.Provider>
        );
    }
}

export default NoteContext;
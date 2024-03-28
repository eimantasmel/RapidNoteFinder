import React, {Component} from 'react';
import doubleClickEvent from "../scripts/doubleClick";
import axios from 'axios';
import getAssociation from "../scripts/getAssociation";
export const context = React.createContext();
class NoteContext extends Component {

    constructor() {
        super();

        this.state = {
            showBox: false,
            showCreateCont: false,
            showSearchCont: true,
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
        axios.post('http://127.0.0.1:8000/api/note/add', {
            content,
            description,
            associate,
        })
        .then(response => {

        })
        .catch(err => console.log(err))
    }

    async findNote(description, setEditorValue) {
        const associate = await getAssociation() ?? '';
        axios.get(`http://127.0.0.1:8000/api/note/find`, {
            params: {
                description: description,
                associate: associate
            }
        })
        .then(response => {
            const {content } = response.data;
            document.querySelector('.ext-container #quill-editor-wrapper').style.display = 'block';
            setEditorValue(content);
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
        <context.Provider value={{
            ...this.state,
            showCreateContainer: this.showCreateContainer.bind(this),
            showSearchContainer: this.showSearchContainer.bind(this),
            createNote: this.createNote.bind(this),
            findNote: this.findNote.bind(this),
        }}>
            {this.props.children}
        </context.Provider>
        );
    }
}

export default NoteContext;
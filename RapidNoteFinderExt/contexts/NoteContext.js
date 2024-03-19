import React, {Component} from 'react';
import doubleClickEvent from "../scripts/doubleClick";
import axios from 'axios';
export const context = React.createContext();
class NoteContext extends Component {

    constructor() {
        super();

        this.state = {
            showBox: false,
            showCreateCont: true,
            showSearchCont: false,
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
            showCreateCont: true,
            showSearchCont: false,
        }, () => {
            document.querySelector('#showsearch').style.background = 'darkred'
            document.querySelector('#showcreate').style.background = 'deeppink'
        })
    }
    showCreateContainer() {
        this.setState({
            showCreateCont: false,
            showSearchCont: true,
        }, () => {
            document.querySelector('#showsearch').style.background = 'deeppink'
            document.querySelector('#showcreate').style.background = 'darkred'
        })
    }

    createNote() {
        axios.post('/api/note/add')
        .then(response => console.log(response))
        .catch(err => console.log('pavargau ir tiek'))
    }

    render() {
        return (
        <context.Provider value={{
            ...this.state,
            showCreateContainer: this.showCreateContainer.bind(this),
            showSearchContainer: this.showSearchContainer.bind(this),
            createNote: this.createNote.bind(this),
        }}>
            {this.props.children}
        </context.Provider>
        );
    }
}

export default NoteContext;
import React, {Component} from 'react';

class SearchNoteContainer extends Component {
    componentDidMount() {
        document.querySelectorAll('#entrypoint input, #entrypoint textarea').forEach((element) => {
            element.addEventListener('mouseover', (e) => {
                e.target.focus();
            })
        })
    }

    render() {
        return (
            <div className={'ext-container'}>
                <input type="text" className={'description'} placeholder={'Describe your note'}/>
                <div className={'response'}></div>
            </div>
        );
    }
}

export default SearchNoteContainer;
import React, {Component, useContext} from 'react';
import ReactDom from 'react-dom/client';
import './assets/css/general.css';
import NoteContext, {context} from "./contexts/NoteContext";
import InteractiveBox from "./components/InteractiveBox";
// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import 'froala-editor/js/froala_editor.pkgd.min.js';

function App(props) {
        const {showBox} = useContext(context);
        return (
            <>
            {
                showBox &&
                (<InteractiveBox />)
            }
            </>
        )
}

const entryPoint = document.createElement('div')
entryPoint.id = 'entrypoint';
document.body.appendChild(entryPoint);




const root = ReactDom.createRoot(document.getElementById('entrypoint'));
root.render(
    <NoteContext>
        <App />
    </NoteContext>
);


//<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' ...">
// const metaElement = document.createElement('meta');
// metaElement.setAttribute('http-equiv', "Content-Security-Policy");
// metaElement.setAttribute('content', "script-src 'self' 'unsafe-eval' http://127.0.0.1");
// document.head.appendChild(metaElement);

// const tinymce = document.createElement('script');
// tinymce.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js';
// tinymce.setAttribute('referrerpolicy', 'origin');
// document.head.appendChild(tinymce);


// const editor = document.createElement('script');
// editor.innerHTML = "tinymce.init({selector: '#editor', plugins: 'paste', paste_data_images: true, height: 300});";
// document.body.appendChild(editor);

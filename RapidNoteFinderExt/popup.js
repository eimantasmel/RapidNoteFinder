import getAssociation from "./scripts/getAssociation.js";
document.addEventListener('DOMContentLoaded', async (e) => {
    const association = document.getElementById('association'); 

    association.addEventListener('change', (e) => {
        chrome.storage.sync.set({['associate']: e.target.value})
    })

    association.value = await getAssociation() ?? '';

    if(!association.value)
    {
        association.value = 'DEFAULT USER'
        chrome.storage.sync.set({['associate']: association.value})
    }
})
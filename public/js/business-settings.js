// Function to make only the paragraph text editable
function editInformation(button) {
    const parent = button.parentNode;
    const serviceDescription = parent.querySelector('p'); 
    serviceDescription.contentEditable = true;
    serviceDescription.classList.add('editable-box'); 
    serviceDescription.focus();
}

    // Function to save the edited text (just for frontend purposes)
    function saveInformation(button) {
    const parent = button.parentNode;
    const serviceDescription = parent.querySelector('p'); 
    serviceDescription.contentEditable = false;
    serviceDescription.classList.remove('editable-box'); 
    alert("Information updated (not persisted in backend).");
}
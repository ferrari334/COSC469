document.addEventListener('DOMContentLoaded', function () {
    const yesButton = document.querySelector('.yesButton');


    yesButton.addEventListener('click', function () {
        getPageText();
    })

})



async function getPageText() {
    // Get the active tab the user is on
    const [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });


    const results = await chrome.scripting.executeScript({
        target: { tabId: tabs.id },
        function: () => {
            return document.body.textContent;
        }
    }); 


    const textArea = document.querySelector('.myTextArea');

    textArea.value = results[0].result;



}



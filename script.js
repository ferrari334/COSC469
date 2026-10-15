import { analyzePolicy } from "./deepseek.js";

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
    const pageText = results[0].result;

    const prompt = parsePageText(pageText);

    // Send the text to the LLM and show its analysis in the text area
    textArea.value = "Analyzing policy...";
    try {
        textArea.value = await analyzePolicy(prompt);
    } catch (error) {
        textArea.value = `Error: ${error.message}`;
    }

}



function parsePageText(pageText) {
    // Handle RAG (Retrieval-Augmented Generation) here and any other processing
    // Send the rest to the api for llm analysis




    // Take this further and process it as needed 
    const processedText = pageText.replace(/\s+/g, ' ').trim(); // Example processing: remove extra whitespace
    return processedText;
}
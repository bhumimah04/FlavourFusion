// This array will store the paragraphs
let paragraphs = [];

// Function to add sentence to the current paragraph
function addSentence() {
    const sentenceInput = document.getElementById('sentenceInput');
    const sentence = sentenceInput.value.trim();

    if (sentence !== '') {
        const currentParagraph = getCurrentParagraph();
        currentParagraph.sentences.push(sentence);
        displaySentences();
        sentenceInput.value = '';
    }
}

// Function to create a new paragraph
function createNewParagraph() {
    const paragraphName = prompt("Enter a name for the paragraph:");
    if (paragraphName !== null && paragraphName.trim() !== '') {
        const newParagraph = {
            name: paragraphName.trim(),
            sentences: []
        };
        paragraphs.push(newParagraph);
        displaySentences();
    }
}

// Function to display sentences in the current paragraph
function displaySentences() {
    const sentenceList = document.getElementById('sentenceList');
    sentenceList.innerHTML = '';

    const currentParagraph = getCurrentParagraph();
    currentParagraph.sentences.forEach(sentence => {
        const p = document.createElement('p');
        p.textContent = sentence;
        sentenceList.appendChild(p);
    });

    const saveParagraphButton = document.createElement('button');
    saveParagraphButton.textContent = 'Save Paragraph';
    saveParagraphButton.onclick = saveParagraph;
    sentenceList.appendChild(saveParagraphButton);

    const addAnotherParagraphButton = document.createElement('button');
    addAnotherParagraphButton.textContent = 'Add Another Paragraph';
    addAnotherParagraphButton.onclick = createNewParagraph;
    sentenceList.appendChild(addAnotherParagraphButton);

    const savedParagraphsList = document.createElement('div');
    savedParagraphsList.innerHTML = '<h2>Saved Paragraphs</h2>';
    paragraphs.forEach(paragraph => {
        const savedParagraphButton = document.createElement('button');
        savedParagraphButton.textContent = paragraph.name;
        savedParagraphButton.onclick = () => displaySavedParagraph(paragraph);
        savedParagraphsList.appendChild(savedParagraphButton);
    });
    sentenceList.appendChild(savedParagraphsList);
}

// Function to get the current paragraph
function getCurrentParagraph() {
    // If no paragraphs exist, create a new one
    if (paragraphs.length === 0) {
        createNewParagraph();
    }
    return paragraphs[paragraphs.length - 1];
}

// Function to save the current paragraph
function saveParagraph() {
    const currentParagraph = getCurrentParagraph();

    // Send currentParagraph to backend for storage
    // Here, you should make an AJAX request to your backend to save the paragraph

    // Clear the current paragraph after saving
    currentParagraph.sentences = [];
    displaySentences();
}

// Function to display saved paragraph
function displaySavedParagraph(paragraph) {
    const sentenceInput = document.getElementById('sentenceInput');
    sentenceInput.value = '';
    paragraph.sentences.forEach(sentence => {
        sentenceInput.value += sentence + ' ';
    });
}

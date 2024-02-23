document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    const message = input.value;
    sendMessage(message);
    input.value = ''; // Clear the input after sending
});

document.querySelectorAll('.suggestion-btn').forEach(button => {
    button.addEventListener('click', () => {
        sendMessage(button.textContent);
    });
});

function markdownToHtml(markdown) {
    // Convert markdown links to HTML links
    let html = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Convert markdown bold to HTML bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Handle new lines for separation between projects
    html = html.replace(/ - /g, '<br> - ');

    // Insert new lines between projects for clarity
    html = html.replace(/(\d\.)/g, '<br>$1');

    return html;
}

const sendMessage = async (message) => {
    displayMessage(message, 'user');
    const response = await fetch('/.netlify/functions/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
    });

    if (!response.ok) {
        const errorMessage = `An error occurred: ${response.statusText}`;
        console.error(errorMessage);
        displayMessage(errorMessage, 'bot');
        return;
    }

    const data = await response.json();
    displayMessage(data.message, 'bot');
};


const displayMessage = (message, sender) => {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');

    if (sender === 'bot') {
        // Convert markdown to HTML for bot messages
        messageElement.innerHTML = markdownToHtml(message);
    } else {
        // Treat user messages as text
        messageElement.textContent = message;
    }

    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
};
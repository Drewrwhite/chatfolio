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

const sendMessage = async (message) => {
    displayMessage(message, 'user');
    const response = await fetch('/.netlify/functions/chatbot', {
        method: 'POST',
        body: JSON.stringify({ prompt: message }),
    });
    const data = await response.json();
    displayMessage(data.message, 'bot');
};

const displayMessage = (message, sender) => {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
};
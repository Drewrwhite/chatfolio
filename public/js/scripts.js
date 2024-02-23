document.addEventListener('DOMContentLoaded', (event) => {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-btn');


    // Event listener for the send button click
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default action to stop from submitting a form if it's part of one
            const message = chatInput.value; // Get the message from input
            sendMessage(message); // Call the sendMessage function defined in chat.js
            chatInput.value = ''; // Clear the input after sending
        }
    });

    // Your existing typewriter effect code
    const messages = ["Hi, I’m Drew! 👋 Thanks for checking out my portfolio! Feel free to chat with me to find out more about me and my journey in Data Engineering!"];
    let currentChar = 0;
    let currentMessage = 0;
    function typeWriter() {
        if (currentChar < messages[currentMessage].length) {
            chatBox.textContent += messages[currentMessage].charAt(currentChar);
            currentChar++;
            setTimeout(typeWriter, 15); // Adjust typing speed by changing the timeout duration (in ms)
        }
    }
    typeWriter();
});

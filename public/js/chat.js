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
    let html = markdown.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Convert markdown bold to HTML bold
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<b>$1</b>');

    // Convert lines starting with a dash (with optional leading spaces) to bold, removing the dash
    // This regex accounts for optional spaces before the dash and ensures the conversion to bold text
    html = html.replace(/^\s*-\s*([^*\n]+):/gm, '<b>$1</b>:');
    html = html.replace(/^-\s*([^*\n]+):/gm, '<b>$1:</b>');

    // Convert markdown headers to HTML headers (up to h6)
    html = html.replace(/#{1,6}\s+([^#\n]+)/g, (match, p1) => {
        const level = match.trim().indexOf('#');
        return `<h${level}>${p1.trim()}</h${level}>`;
    });

    // Convert markdown unordered lists to HTML lists
    html = html.replace(/^- (.+)$/gm, '<ul><li>$1</li></ul>');

    // Convert markdown ordered lists to HTML lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>'); // Treat ordered lists as unordered lists without numbering

    // Handle paragraphs (double line breaks)
    html = html.replace(/\n\n/g, '<p></p>');

    // Single line breaks to <br> for better readability
    html = html.replace(/\n/g, '<br>');

    // Post-processing to clean up any malformed HTML due to replacements
    html = html.replace(/<ul>\s*<br>/g, '<ul>').replace(/<br>\s*<\/ul>/g, '</ul>');
    html = html.replace(/<\/ul><ul>/g, ''); // Remove consecutive <ul> tags created by lists

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
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    chatBox.appendChild(messageElement);

    if (sender === 'bot') {
        // Split the markdown message into sections by double line breaks
        const sections = message.split('\n\n');
        let sectionIndex = 0;

        const processSection = () => {
            if (sectionIndex < sections.length) {
                // Convert current section to HTML for final display
                const htmlSection = markdownToHtml(sections[sectionIndex]);
                // Use a temporary element to display the typing effect
                const tempElement = document.createElement('div');
                messageElement.appendChild(tempElement);

                let charIndex = 0;
                const typingSpeed = 10; // Adjust as needed
                const plainTextSection = sections[sectionIndex].replace(/<[^>]*>?/gm, ''); // Remove HTML tags for typing effect

                const typeWriter = () => {
                    if (charIndex < plainTextSection.length) {
                        // Append next character
                        tempElement.textContent += plainTextSection[charIndex++];
                        setTimeout(typeWriter, typingSpeed);
                    } else {
                        // Once typing effect is complete for the section, replace with HTML content
                        tempElement.innerHTML = htmlSection;
                        // Add double line break (or equivalent spacing) after the section
                        if (sectionIndex < sections.length - 1) { // Check to avoid adding extra space after the last section
                            const spacingElement = document.createElement('div');
                            spacingElement.innerHTML = '<br>';
                            messageElement.appendChild(spacingElement);
                        }
                        sectionIndex++;
                        // Process the next section
                        setTimeout(processSection, typingSpeed);
                    }
                };

                typeWriter();
            } else {
                // Scroll to the bottom after all sections are displayed
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        };

        processSection();
    } else {
        // Treat user messages as text without typing effect
        messageElement.textContent = message;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};

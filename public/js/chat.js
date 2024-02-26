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


// function markdownToHtml(markdown) {
//     // Convert markdown links to HTML links
//     let html = markdown.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+?)\)/g, '<a href="$2" target="_blank">$1</a>');

//     // Convert markdown bold to HTML bold
//     html = html.replace(/\*\*([^\*]+)\*\*/g, '<b>$1</b>');

//     // Convert lines starting with a dash (with optional leading spaces) to bold, removing the dash
//     // This regex accounts for optional spaces before the dash and ensures the conversion to bold text
//     html = html.replace(/^\s*-\s*([^*\n]+):/gm, '<b>$1</b>:');
//     html = html.replace(/^-\s*([^*\n]+):/gm, '<b>$1:</b>');

//     // Convert markdown headers to HTML headers (up to h6)
//     html = html.replace(/#{1,6}\s+([^#\n]+)/g, (match, p1) => {
//         const level = match.trim().indexOf('#');
//         return `<h${level}>${p1.trim()}</h${level}>`;
//     });

//     // Convert markdown unordered lists to HTML lists
//     html = html.replace(/^- (.+)$/gm, '<ul><li>$1</li></ul>');

//     // Convert markdown ordered lists to HTML lists
//     html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>'); // Treat ordered lists as unordered lists without numbering

//     // Handle paragraphs (double line breaks)
//     html = html.replace(/\n\n/g, '<p></p>');

//     // Single line breaks to <br> for better readability
//     html = html.replace(/\n/g, '<br>');

//     // Post-processing to clean up any malformed HTML due to replacements
//     html = html.replace(/<ul>\s*<br>/g, '<ul>').replace(/<br>\s*<\/ul>/g, '</ul>');
//     html = html.replace(/<\/ul><ul>/g, ''); // Remove consecutive <ul> tags created by lists

//     return html;
// }

function preprocessEmails(markdown) {
    // Regular expression to match email addresses
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    // Replace email text with markdown mailto link
    return markdown.replace(emailRegex, '[$1](mailto:$1)');
}

function markdownToHtml(markdown) {
    const preprocessedMarkdown = preprocessEmails(markdown);
    const converter = new showdown.Converter({
        simplifiedAutoLink: true
    });
    const html = converter.makeHtml(preprocessedMarkdown);
    return html;
}

const sendMessage = async (message) => {
    displayMessage(message, 'user');
    const sendButton = document.getElementById('send-btn');
    // Change the button to show the spinner icon
    sendButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';

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
        // Reset the button content if there's an error
        sendButton.innerHTML = '<i class="fa fa-arrow-up"></i>';
        return;
    }

    const data = await response.json();
    displayMessage(data.message, 'bot');
    // Don't reset the button here; it will be reset after displayMessage completes
};

const stripHtmlTags = (text) => text.replace(/<\/?[^>]+(>|$)/g, "");

const displayMessage = (message, sender) => {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    chatBox.appendChild(messageElement);
    const sendButton = document.getElementById('send-btn'); // Reference the send button here

    if (sender === 'bot') {
        const sections = message.split('\n\n');
        let sectionIndex = 0;

        const processSection = () => {
            if (sectionIndex < sections.length) {
                const markdownText = stripHtmlTags(sections[sectionIndex]);
                const htmlSection = markdownToHtml(markdownText);
                const tempElement = document.createElement('div');
                messageElement.appendChild(tempElement);

                let charIndex = 0;
                const typingSpeed = 10;
                const plainTextSection = htmlSection.replace(/<[^>]*>?/gm, '');

                const typeWriter = () => {
                    if (charIndex < plainTextSection.length) {
                        tempElement.textContent += plainTextSection[charIndex++];
                        setTimeout(typeWriter, typingSpeed);
                    } else {
                        tempElement.innerHTML = htmlSection;
                        if (sectionIndex < sections.length - 1) {
                            const spacingElement = document.createElement('div');
                            spacingElement.innerHTML = '';
                            messageElement.appendChild(spacingElement);
                        }
                        sectionIndex++;
                        setTimeout(processSection, typingSpeed);
                    }
                };

                typeWriter();
            } else {
                chatBox.scrollTop = chatBox.scrollHeight;
                // Reset the button content back to the original state
                sendButton.innerHTML = '<i class="fa fa-arrow-up"></i>';
            }
        };

        processSection();
    } else {
        messageElement.textContent = message;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};



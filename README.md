# Chatfolio

My portfolio with an integrated chatbot to help guide through my professional experience as well as bits about me

## Structure

The project has the following structure:

- `built-functions/`: This directory contains the built JavaScript files for Chatfolio.
    - `data/`: This directory contains JSON data used by the Chatfolio's serverless function.
        - `about.json`: This file contains data about me.
        - `projects.json`: This file contains data about projects.
        - `resume.json`: This file contains resume data.
    - `chatbot-bundle.js`: This is the bundled JavaScript file for the chatbot.
- `functions/`: This directory contains the source JavaScript files for the chatbot.
    - `chatbot.js`: This is the main JavaScript file for the chatbot.
- `public/`: This directory contains the HTML, CSS, and JavaScript files for the website.
    - `css/`: Directory of css files.
        - `styles.css`: This file contains the main CSS styles for the website.
    - `js/`: Directory of website JavaScript files.
        - `chat.js`: This file contains the JavaScript code for the chat functionality.
        - `scripts.js`: This file contains the main JavaScript code for the website.
        - `sidenav.js`: This file contains the JavaScript code for the side navigation functionality.
    - `data/`: This directory contains JSON data used by Chatfolio.
        - `about.json`: This file contains data about me.
        - `projects.json`: This file contains data about projects.
        - `resume.json`: This file contains resume data.
    - `images/`: This directory contains images used by Chatfolio.
    - `index.html`: This is the main HTML file for the website (Chatfolio landing page).
    - `projects.html`: This HTML file contains the projects page.
    - `about.html`: This HTML file contains the about page.
- `netlify.toml`: This file contains configuration for Netlify.
- `package.json`: This file contains the list of npm dependencies.
- `webpack.config.js`: This file contains configuration for Webpack.

## License

[MIT](https://choosealicense.com/licenses/mit/)

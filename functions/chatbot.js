// Imports
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Assuming __dirname is the functions directory, adjust paths for local and deployed environments
const dataDirectory = path.join(__dirname, '..', 'public', 'data');
const projectsDataPath = path.join(dataDirectory, 'projects.json');
const resumeDataPath = path.join(dataDirectory, 'resume.json');
const aboutDataPath = path.join(dataDirectory, 'about.json');

let projectsData, resumeData, aboutData;

// Safely load JSON data
try {
  projectsData = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));
  resumeData = JSON.parse(fs.readFileSync(resumeDataPath, 'utf8'));
  aboutData = JSON.parse(fs.readFileSync(aboutDataPath, 'utf8'));
} catch (error) {
  console.error("Error loading data files:", error);
}

// Helper function to determine the context based on the user's prompt
function determineContext(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  // Projects-specific keywords
  if (lowerPrompt.includes("projects") || lowerPrompt.includes("action responder") || lowerPrompt.includes("musical journeys") || lowerPrompt.includes("weather database") || lowerPrompt.includes("crime analysis") || lowerPrompt.includes("airline data") || lowerPrompt.includes("quality of life") || lowerPrompt.includes("dice roller game") || lowerPrompt.includes("air quality index") || lowerPrompt.includes("spotify etl")) {
      return JSON.stringify(projectsData);
  }
  // Resume-specific keywords
  else if (lowerPrompt.includes("experience") || lowerPrompt.includes("data engineer") || lowerPrompt.includes("python") || lowerPrompt.includes("sql") || lowerPrompt.includes("etl pipelines") || lowerPrompt.includes("cloud platforms") || lowerPrompt.includes("consultant") || lowerPrompt.includes("intern") || lowerPrompt.includes("managing member") || lowerPrompt.includes("data architecture") || lowerPrompt.includes("ai algorithms") || lowerPrompt.includes("data science") || lowerPrompt.includes("programming") || lowerPrompt.includes("development") || lowerPrompt.includes("analytics") || lowerPrompt.includes("school") || lowerPrompt.includes("education") || lowerPrompt.includes("tech") || lowerPrompt.includes("skills") || lowerPrompt.includes("contact")) {
      return JSON.stringify(resumeData);
  }
  // About-specific keywords
  else if (lowerPrompt.includes("about me") || lowerPrompt.includes("contact info") || lowerPrompt.includes("personal") || lowerPrompt.includes("hobbies") || lowerPrompt.includes("ju-jitsu") || lowerPrompt.includes("music") || lowerPrompt.includes("outdoors") || lowerPrompt.includes("food") || lowerPrompt.includes("family") || lowerPrompt.includes("biography") || lowerPrompt.includes("background") || lowerPrompt.includes("origin") || lowerPrompt.includes("side business") || lowerPrompt.includes("interests") || lowerPrompt.includes("sport") || lowerPrompt.includes("ju jitsu") || lowerPrompt.includes("metal") || lowerPrompt.includes("fun") || lowerPrompt.includes("interests")) {
      return JSON.stringify(aboutData);
  }
  return "";
}

exports.handler = async (event) => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON in request body" })
    };
  }

  // Check if the payload contains the required 'prompt' field
  if (!payload || typeof payload.prompt !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing or invalid 'prompt' in request body" })
    };
  }

  const contextString = determineContext(payload.prompt);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "As your personal guide, I embody Drew, ready to navigate you through the highlights of my portfolio and experiences. Should our conversation drift or if you seek details beyond the scope of my professional projects, technical skills, and personal interests, I'll gently steer us back to the core topics that define my work and passions. My goal is to share insights and stories directly from my perspective, ensuring you receive authentic and focused information. Dive into my portfolio with me, and rest assured, you'll explore the essence of my journey in Data Engineering, my projects, and what drives me, all from the source—me, Drew. Let's focus on what truly matters to make the most of our interaction."
        }, {
          role: "user",
          content: payload.prompt
        }, {
          role: "assistant",
          content: contextString
        }],
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      })
    });

    const data = await response.json();
    console.log("OpenAI response data:", data);

    let formattedResponse = data.choices[0].message.content.trim();

    // Example: wrapping the response in a paragraph tag
    formattedResponse = `<p>${formattedResponse}</p>`;

    // Corrected access to the response content
    return {
      statusCode: 200,
      body: JSON.stringify({ message: formattedResponse })
    };
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error: " + error.message })
    };
  }
};

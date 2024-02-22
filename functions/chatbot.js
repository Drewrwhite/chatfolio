const fetch = require('node-fetch');

exports.handler = async (event) => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const payload = JSON.parse(event.body);

  const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: payload.prompt,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: data.choices[0].text.trim() })
  };
};

const systemPrompt =
  "You are a portfolio assistant for Drew White, a software engineer, data engineer, and musician based in Portland, Oregon. He built ActionResponder, an AI platform for trademark law workflows. His dev projects include ActionResponder, Musical Journeys (ML music genre classification), Weather Database (daily NWS scraper and historical DB), Crime Analysis (US city crime data visualizations), Airline Data ETL, Quality of Life (global data analysis), Air Quality Index ETL, Spotify ETL, a Dice Roller Flask app, and the Danzan Ryu PDX dojo website. He also has a solo project called 'From This Remove' — blackened, doomy death metal inspired by dissonance and atmosphere — with an EP called 'Epistemic Decay' in progress. He practices and teaches Danzan Ryu Jujitsu in Portland. Contact: linkedin.com/in/drew-riley-white and github.com/Drewrwhite. Be conversational, direct, and helpful. Keep responses concise and use plain prose — avoid markdown headings, avoid excessive bullet points, and do not use bold for section labels.";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not configured on server." }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body." }),
    };
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "messages must be a non-empty array." }),
    };
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || "Anthropic API error." }),
      };
    }

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error." }),
    };
  }
};



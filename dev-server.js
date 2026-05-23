// Local dev server for Netlify Functions — replaces netlify dev for local use.
// Run with: node --env-file=.env dev-server.js
// Serves function at http://localhost:9999/.netlify/functions/chatbot
// Vite proxies /.netlify/functions/* to this server (see vite.config.js).

import { createServer } from "http";
import { handler } from "./functions/chatbot.js";

const PORT = 9999;

const server = createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "content-type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === "/.netlify/functions/chatbot" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", async () => {
            try {
                const result = await handler({ httpMethod: "POST", body });
                const headers = { "content-type": "application/json", ...(result.headers || {}) };
                res.writeHead(result.statusCode, headers);
                res.end(result.body);
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
});

server.listen(PORT, () => {
    console.log(`◈ Functions dev server → http://localhost:${PORT}/.netlify/functions/chatbot`);
});

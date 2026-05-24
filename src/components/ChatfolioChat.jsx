import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const suggestions = [
  "Tell me about your projects.",
  "Tell me about yourself.",
  "How can I get into contact with you?",
];

const getAssistantText = (payload) => {
  if (!payload || !Array.isArray(payload.content)) {
    return "No response received.";
  }

  return payload.content
    .filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n\n");
};

function ChatfolioChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageWindowRef = useRef(null);

  useEffect(() => {
    const node = messageWindowRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, isLoading]);

  const submitMessage = async (rawMessage) => {
    const content = rawMessage.trim();
    if (!content || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content }];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/.netlify/functions/chatbot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Anthropic request failed.");
      }

      const payload = await response.json();
      const assistantMessage = getAssistantText(payload);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: assistantMessage,
        },
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: `The ritual failed: ${error.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitMessage(input);
  };

  const hasStarted = messages.length > 0 || isLoading;

  return (
    <section className="chatfolio-section section-shell">
      <div className="section-heading">
        <h2>Chatfolio</h2>
        <hr className="section-rule" />
      </div>

      {!hasStarted ? (
        <div className="prompt-chip-row" aria-label="Suggested prompts">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="btn"
              type="button"
              onClick={() => submitMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <div className="chat-shell">
        <div className="chat-header">
          <span className="chat-header-dot" aria-hidden="true" />
          <span className="chat-header-title">chatfolio</span>
        </div>
        <div className="message-window" ref={messageWindowRef}>
          {messages.length === 0 ? (
            <div className="assistant-message ritual-intro">
              Ask about projects, work, music, or how to get in touch.
            </div>
          ) : null}

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user" ? "user-message" : "assistant-message"
              }
            >
              {message.role === "assistant" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noreferrer" />
                    ),
                    h1: ({ node, children }) => (
                      <p>
                        <strong>{children}</strong>
                      </p>
                    ),
                    h2: ({ node, children }) => (
                      <p>
                        <strong>{children}</strong>
                      </p>
                    ),
                    h3: ({ node, children }) => (
                      <p>
                        <strong>{children}</strong>
                      </p>
                    ),
                    h4: ({ node, children }) => (
                      <p>
                        <strong>{children}</strong>
                      </p>
                    ),
                    h5: ({ node, children }) => (
                      <p>
                        <strong>{children}</strong>
                      </p>
                    ),
                    h6: ({ node, children }) => (
                      <p>
                        <strong>{children}</strong>
                      </p>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                message.content
              )}
            </div>
          ))}

          {isLoading ? (
            <div
              className="assistant-message loading-message"
              aria-live="polite"
            >
              <span>·</span>
              <span>·</span>
              <span>·</span>
            </div>
          ) : null}
        </div>

        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submitMessage(input);
              }
            }}
            placeholder="Speak into the ash..."
            autoComplete="off"
          />
          <button
            className="btn send-button"
            type="submit"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChatfolioChat;

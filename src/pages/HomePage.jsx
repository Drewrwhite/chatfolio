import ChatfolioChat from "../components/ChatfolioChat";
import { usePageMeta } from "../hooks/usePageMeta";

function HomePage() {
  usePageMeta({
    description: "Tech, esoterics, and noise — the portfolio of Drew R. White.",
    path: "/",
  });

  return <ChatfolioChat />;
}

export default HomePage;

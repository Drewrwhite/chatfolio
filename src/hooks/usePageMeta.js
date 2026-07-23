import { useEffect } from "react";

const SITE_NAME = "Drew R. White";
const SITE_URL = "https://drewrwhite.com";

function setMetaTag(attr, name, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

/**
 * Updates the document title, description, and social meta tags for the
 * current route. Falls back to the defaults already set in index.html
 * when no override is provided.
 */
export function usePageMeta({ title, description, path = "/", noindex = false }) {
    useEffect(() => {
        const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
        document.title = fullTitle;

        setMetaTag("name", "description", description);
        setMetaTag("property", "og:title", fullTitle);
        setMetaTag("property", "og:description", description);
        setMetaTag("name", "twitter:title", fullTitle);
        setMetaTag("name", "twitter:description", description);

        const url = `${SITE_URL}${path}`;
        setMetaTag("property", "og:url", url);
        setMetaTag("name", "twitter:url", url);

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", url);

        setMetaTag("name", "robots", noindex ? "noindex, follow" : "index, follow");
    }, [title, description, path, noindex]);
}

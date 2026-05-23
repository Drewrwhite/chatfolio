# Chatfolio

React and Vite rebuild of drewrwhite.com with the "Ash & Ember" visual direction: bone-toned typography, ember accents, smoke textures, and a browser-side Anthropic-powered Chatfolio.

## Development

1. Install dependencies with `npm install`
2. Create a local `.env` file from `.env.example`
3. Start the app with `npm run dev`
4. Build for production with `npm run build`

## Environment

The chat UI reads the Anthropic key from `VITE_ANTHROPIC_API_KEY`.

## Structure

- `src/`: React app source.
- `public/images/`: Existing site imagery, including `DRWHEADER.png`, `ARNEW.png`, favicons, and project art.
- `public/data/`: Legacy JSON content retained in place.
- `public/_redirects`: SPA routing rule for Netlify.
- `functions/`: Legacy serverless code retained in the repository but no longer used by the React app.

## Deployment

Netlify builds the site with `npm run build` and publishes `dist/`.

## License

[MIT](https://choosealicense.com/licenses/mit/)

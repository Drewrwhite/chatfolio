const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node', // Target node environment for serverless functions
  mode: 'production', // Use 'development' for easier debugging
  entry: './functions/chatbot.js', // Entry point for your serverless function
  output: {
    path: path.resolve(__dirname, 'built-functions'), // Output directory
    filename: 'chatbot-bundle.js', // Output file
  },
  plugins: [
    // This plugin copies your JSON data to the output directory
    new CopyPlugin({
      patterns: [
        // Adjust the 'from' path according to where your JSON data files are located
        { from: 'public/data', to: 'data' },
      ],
    }),
  ],
};
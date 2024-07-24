# CodeKitty AI chrome extension 
The CodeKitty AI Google Chrome extension helps programmers understand large GitHub repositories using the Gemini API through two main methods. The first method retrieves content from GitHub files and code on the current webpage and makes an API call to the backend using the Gemini AI API. This method builds a continuous chat-like feature to ask further questions. It also allows users to select code and tap an "explain" button to receive automatic explanations. In the second method, it retrieves the repository name to fetch all its contents using the GitHub API. Then, it builds a rag using Langchain and the Gemini API embedding model. The AI has the full context of the repository, but the total number of lines of code is restricted to 12000. This is how CodeKitty can help developers understand large codebase syntax, files, and more using Gemini.
# Main Codes
- The content script code is in src/content.js
- The service worker code inside github/background.js
- Sidepanel code inside github/sidepanel.js and github/sidepanel.html
- Tab code inside github/auth.html

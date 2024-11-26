# Guardian Sight

All-in-one tool Chrome Gemini Nano built-in AI extension to empower content creators. :rocket:

## Links

- [Project board](https://github.com/users/vivekVells/projects/3)

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (recommended version 16.x or higher) -> Refer `.nvmrc` file to know current version being used. As of now, `node: 18.20.4` being used.
- npm (comes with Node.js)

## Getting Started

Follow these steps to get the boilerplate code up and running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vivekVells/guardian-sight
   ```

2. **Navigate to the project folder:**

   ```bash
   cd guardian-sight
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   This command will start the development server using Vite, enabling hot module replacement and allowing you to see your changes in real.

5. **Load the extension in Chrome:**

   - Open the Chrome browser.
   - Navigate to `chrome://extensions/`.
   - Turn on the "Developer mode" toggle in the top-right corner.
   - Click the "Load unpacked" button and select the `dist` folder inside your project directory.

6. **Start Developing:**

   - The popup UI can be found in the `src/App.tsx` directory.
   - Customize the manifest template in `src/manifest.json` and let CRXJS handle the dynamic manifest generation.
   - The support for background scripts, options page, content scripts is already configured. Customise them in their respective folder.

7. **Build for Production:**

   When you're ready to publish your extension, create a production build by running:

   ```bash
   npm run build
   ```

   The optimized files will be available in the `dist` folder. You can then package this folder to distribute your extension.

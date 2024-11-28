import express from 'express';
import cors from 'cors';
import { chromium } from 'playwright-chromium';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const app = express();
const PORT = 3005;
const IPADDRESS = "0.0.0.0";

// Enable CORS for all origins
app.use(cors());

// Optional: Customize CORS to allow requests only from specific origin
// app.use(cors({ origin: 'http://localhost:5173' })); // Uncomment this line to restrict access

app.get('/', (_, res) => {
  res.send('Hello World from Guardian Sight Backend!');
});

app.listen(PORT, IPADDRESS, () => {
  console.log(`Server is running on http://${IPADDRESS}:${PORT}`);
});

// @ts-ignore
app.get('/scrape', async (req, res) => {
  const url = req.query.url as string;
  console.log(`Scraping ${url}... to retrieve text content!`);


  if (!url) {
    return res.status(400).send({ error: 'URL query parameter is required.' });
  }

  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const domainParts = hostname.split('.');
    const baseDomain = domainParts.slice(-2).join('.');

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForLoadState();

    const textContent = await page.evaluate(() => document.body.innerText);

    await mkdir('scraped-content', { recursive: true }).then(() =>
      writeFile(join('scraped-content', `${baseDomain}-privacy-document.txt`), textContent, 'utf-8')
    );


    await browser.close();

    res.status(200).send({
      message: 'Content scraped and saved to privacy_policy.txt',
      extractedText: textContent,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send({ error: 'An error occurred during scraping.' });
  }
});

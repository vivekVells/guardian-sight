import { SCRAPE_URL_CADDY } from "./constants";

// Function to retrieve unique privacy URLs
export const getUniquePrivacyLinks = () => {
  const links = document.querySelectorAll("a");
  const privacyLinks = new Set();
  let foundPrivacyText = false;

  links.forEach((link) => {
    const linkText = link.innerText;
    if (linkText.toLowerCase().includes("privacy")) {
      foundPrivacyText = true;
      privacyLinks.add(link.href);
    }
  });

  return foundPrivacyText ? Array.from(privacyLinks) : [];
};

// Mock function to determine if a scrape should be initiated
const shouldInitiateScrape = (url: string = "") => {
  console.log({ url });

  return true;
};

// Function to process unique privacy URLs
export const processPrivacyUrls = async () => {
  const uniquePrivacyUrls = getUniquePrivacyLinks();

  for (const privacyURL of uniquePrivacyUrls) {
    console.log(`privacyURL: ${privacyURL} being checked...`);

    if (shouldInitiateScrape(privacyURL as string)) {
      try {
        const url = `${SCRAPE_URL_CADDY}${privacyURL}`;
        console.log("Initiating url call: ", url);

        const response = await fetch(url);
        const data = await response.json();
        console.log(`Data for ${privacyURL}:`, data);
        return data?.extractedText;
      } catch (error) {
        console.error(`Error fetching data for ${privacyURL}:`, error);
      }
    } else {
      console.info(`Scrape fetch call is not initiated for ${privacyURL}`);
      return null;
    }
  }
};

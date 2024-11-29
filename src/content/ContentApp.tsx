import { useState, useEffect } from "react";
import { processPrivacyUrls } from "../utils/privacy-utils";
import { run_privacy_checker } from "../ai/privacy_checker";
const PRIVACY_CHCEKER_TEXT =
  "Privacy Statement Cookie Statement Terms of Use Expedia, Inc. is not responsible for content on external Web sites.";

function ContentApp() {
  const [scrapedData, setScrapedData] = useState("");

  useEffect(() => {
    const fetchScrapeData = async () => {
      try {
        const data = await processPrivacyUrls();
        setScrapedData(data);
      } catch (error) {
        console.error("Error fetching to scrape text content data:", error);
      }
    };
    fetchScrapeData();

    // Invoke the createAISession method when the component mounts
    run_privacy_checker(PRIVACY_CHCEKER_TEXT, { reuse_session: false })
      .then((response) => {
        console.log("Privacy checker says:", response);
      })
      .catch((error) => {
        console.error("Privacy checker says:", error);
      });
  }, []);

  return (
    <div>
      <h1>Scrapped content</h1>
      <p>{scrapedData}</p>
    </div>
  );
}

export default ContentApp;

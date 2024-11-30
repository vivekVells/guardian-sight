// import { useState, useEffect } from "react";
// import {
//   getSentencesAndUrlsContainingKeyword,
//   // @ts-ignore
//   processPrivacyUrls,
//   shouldInitiateScrape,
// } from "../utils/privacy-utils";
// import { run_privacy_checker } from "../ai/privacy_checker";
// import { SCRAPE_URL_CADDY } from "../utils/constants";
// const PRIVACY_CHCEKER_TEXT =
//   "Privacy Statement Cookie Statement Terms of Use Expedia, Inc. is not responsible for content on external Web sites.";

// // Define an interface for the props
// interface PrivacyDataDisplayProps {
//   extractedText: string; // Define the type for extractedText
// }

// const PrivacyDataDisplay: React.FC<PrivacyDataDisplayProps> = ({
//   extractedText,
// }) => {
//   return (
//     <div>
//       <h3>Extracted Privacy Text:</h3>
//       <p>{extractedText}</p>
//     </div>
//   );
// };

// function ContentApp() {
//   const [scrapedData, setScrapedData] = useState<string[]>([]);

//   // Example function to simulate scraping data
//   const simulateDataFetch = () => {
//     // Replace this with your actual data fetching logic
//     const fetchedData = ["Sample Privacy Text 1", "Sample Privacy Text 2"]; // Example data
//     setScrapedData(fetchedData);
//   };

//   const processPrivacyUrlsNN = async () => {
//     const privacyStatements = getSentencesAndUrlsContainingKeyword("privacy");

//     if (privacyStatements.length === 0) {
//       return null;
//     }

//     for (const { sentence, url } of privacyStatements) {
//       console.log(
//         `Privacy statement: "${sentence}" with URL: ${url} being checked...`
//       );

//       if (shouldInitiateScrape(url)) {
//         try {
//           const scrapeUrl = `${SCRAPE_URL_CADDY}${url}`;
//           console.log("Initiating URL call: ", scrapeUrl);

//           const response = await fetch(scrapeUrl);
//           const data = await response.json();
//           console.log(`Data for ${url}:`, data);

//           // Update state with extracted text if available
//           if (data?.extractedText) {
//             setScrapedData((prevTexts) => [...prevTexts, data.extractedText]); // Add new text to the array
//           }
//         } catch (error) {
//           console.error(`Error fetching data for ${url}:`, error);
//         }
//       } else {
//         console.info(`Scrape fetch call is not initiated for ${url}`);
//       }
//     }
//   };

//   useEffect(() => {
//     processPrivacyUrlsNN();

//     const fetchScrapeData = async () => {
//       try {
//         const data = await processPrivacyUrls();
//         setScrapedData(data);
//       } catch (error) {
//         console.error("Error fetching to scrape text content data:", error);
//       }
//     };
//     fetchScrapeData();

//     // Invoke the createAISession method when the component mounts
//     run_privacy_checker(PRIVACY_CHCEKER_TEXT, { reuse_session: false })
//       .then((response) => {
//         console.log("Privacy checker says:", response);
//       })
//       .catch((error) => {
//         console.error("Privacy checker says:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Privacy Policy Scraper</h1>
//       <button onClick={simulateDataFetch}>Fetch Data</button>{" "}
//       {/* Button to simulate data fetch */}
//       {Array.isArray(scrapedData) && scrapedData.length > 0 ? (
//         scrapedData.map((text, index) => (
//           <PrivacyDataDisplay key={index} extractedText={text} />
//         ))
//       ) : (
//         <p>No extracted texts available yet.</p>
//       )}
//     </div>
//   );
// }

// export default ContentApp;

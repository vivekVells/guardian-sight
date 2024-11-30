// import { SCRAPE_URL_CADDY } from "./constants";

export interface PrivacyInfo {
  id: number;
  statement: string;
  url: string;
}

/**
 * Retrieves unique statements containing a specified keyword and their associated URLs.
 *
 * This function searches all anchor (<a>) elements on the page for links that include
 * the specified keyword. It traces up to the closest parent <div> to extract the full
 * statement containing the keyword, removes HTML tags, and ensures only unique statements
 * are returned, each paired with the corresponding URL. The result is an array of objects,
 * each containing a unique statement and its URL.
 *
 * @param {string} keyword - The keyword to search for within the statements.
 * @returns {PrivacyInfo[]} - An array of objects with unique statements and their URLs.
 */
export const getStatementAndUrlsContainingKeyword = (
  keyword: string
): PrivacyInfo[] => {
  const links = document.querySelectorAll<HTMLAnchorElement>("a");
  const seenStatements = new Set<string>(); // Set to track unique statements
  const result: PrivacyInfo[] = []; // Array to store the results
  let idCounter = 1; // Initialize ID counter

  links.forEach((link) => {
    const linkText = link.innerText.toLowerCase();
    if (linkText.includes(keyword.toLowerCase())) {
      // Trace up the DOM hierarchy to the first <div>
      let parentElement: HTMLDivElement | null = link.closest(
        "div"
      ) as HTMLDivElement;
      if (!parentElement) {
        // If no <div> is found, try the closest parent in the hierarchy
        let tempElement: HTMLElement | null = link.parentElement;
        while (tempElement && tempElement.tagName.toLowerCase() !== "div") {
          tempElement = tempElement.parentElement;
        }
        parentElement = tempElement as HTMLDivElement; // Type assertion
      }
      if (parentElement) {
        // Use innerHTML to maintain formatting and replace line breaks with spaces
        let statement = parentElement.innerHTML
          .replace(/<br\s*\/?>/g, " ") // Replace line breaks with spaces
          .replace(/<\/?[^>]+(>|$)/g, " ") // Remove HTML tags while preserving spaces
          .replace(/\s+/g, " ") // Replace multiple spaces with a single space
          .trim(); // Trim leading and trailing spaces

        // Check if the statement is unique
        if (!seenStatements.has(statement)) {
          seenStatements.add(statement); // Add the unique statement to the Set
          result.push({ id: idCounter++, statement, url: link.href }); // Push the object with ID to result
        }
      }
    }
  });

  return result; // Return the array of unique sentences and URLs
};

export const normalizePrivacyStatements = (statements: PrivacyInfo[]): string =>
  statements.map((item) => `${item.id}. ${item.statement}`).join("\n");

/**
 * Retrieves unique sentences from the DOM that contain a specified keyword.
 *
 * This function searches through all anchor (<a>) elements on the page to find
 * those that include the specified keyword (case insensitive). For each matching
 * link, it traces up the DOM hierarchy to the closest parent <div> element. It
 * then extracts the inner HTML of that <div>, removes HTML tags and line breaks,
 * and normalizes whitespace to construct the full sentence.
 *
 * The sentences are collected in a Set to ensure that only unique entries are
 * returned, eliminating any duplicates. The final result is returned as an array
 * of unique sentences containing the specified keyword.
 *
 * @param {string} keyword - The keyword to search for within the sentences.
 * @returns {string[]} - An array of unique sentences that contain the keyword.
 */
export const getSentencesContainingKeyword = (keyword: string): string[] => {
  const links = document.querySelectorAll<HTMLAnchorElement>("a");
  const matchingSentences = new Set<string>();

  links.forEach((link) => {
    const linkText = link.innerText.toLowerCase();
    if (linkText.includes(keyword.toLowerCase())) {
      // Trace up the DOM hierarchy to the first <div>
      let parentElement: HTMLDivElement | null = link.closest(
        "div"
      ) as HTMLDivElement;
      if (!parentElement) {
        // If no <div> is found, try the closest parent in the hierarchy
        let tempElement: HTMLElement | null = link.parentElement;
        while (tempElement && tempElement.tagName.toLowerCase() !== "div") {
          tempElement = tempElement.parentElement;
        }
        parentElement = tempElement as HTMLDivElement; // Type assertion
      }
      if (parentElement) {
        // Use innerHTML to maintain formatting and replace line breaks with spaces
        let sentence = parentElement.innerHTML
          .replace(/<br\s*\/?>/g, " ") // Replace line breaks with spaces
          .replace(/<\/?[^>]+(>|$)/g, " ") // Remove HTML tags while preserving spaces
          .replace(/\s+/g, " ") // Replace multiple spaces with a single space
          .trim(); // Trim leading and trailing spaces
        matchingSentences.add(sentence);
      }
    }
  });

  // Convert Set to Array and return
  return Array.from(matchingSentences);
};

// // Function to retrieve unique privacy URLs
// const getUniquePrivacyLinks = () => {
//   const links = document.querySelectorAll("a");
//   const privacyLinks = new Set();
//   let foundPrivacyText = false;

//   links.forEach((link) => {
//     const linkText = link.innerText;
//     if (linkText.toLowerCase().includes("privacy")) {
//       foundPrivacyText = true;
//       privacyLinks.add(link.href);
//     }
//   });

//   return foundPrivacyText ? Array.from(privacyLinks) : [];
// };

// Mock function to determine if a scrape should be initiated
// export const shouldInitiateScrape = (statements: string[] = []) => {
//   console.log({ statements });

//   return statements[0];
// };

// // Mock function to determine if a scrape should be initiated
// // Function would detect and return the sign up statement if available among provided statements, else, null.
// export const findSignUpStatementUrl = (
//   statements: string[],
//   signUpStatement: string
// ) => {
//   const mockedUrl = "https://www.facebook.com/about/privacy/update";

//   return mockedUrl;
// };

// // Mock function to determine if a scrape should be initiated
// // Function would detect and return the sign up statement if available among provided statements, else, null.
// export const findSignUpStatement = (statements: string[] = []) => {
//   console.log({ statements });

//   return statements[0];
// };

// Function to process unique privacy URLs
// export const processPrivacyUrls = async () => {
//   const uniquePrivacyUrls = getUniquePrivacyLinks();

//   for (const privacyURL of uniquePrivacyUrls) {
//     console.log(`privacyURL: ${privacyURL} being checked...`);

//     if (shouldInitiateScrape(privacyURL as string)) {
//       try {
//         const url = `${SCRAPE_URL_CADDY}${privacyURL}`;
//         console.log("Initiating url call: ", url);

//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(`Data for ${privacyURL}:`, data);
//         return data?.extractedText;
//       } catch (error) {
//         console.error(`Error fetching data for ${privacyURL}:`, error);
//       }
//     } else {
//       console.info(`Scrape fetch call is not initiated for ${privacyURL}`);
//       return null;
//     }
//   }
// };

// export const processPrivacyUrlsNew = async (): Promise<string | null> => {
//   // Retrieve privacy statements containing the keyword "privacy"
//   const privacyStatements = getSentencesAndUrlsContainingKeyword("privacy");

//   // Check if the array is empty and return null if it is
//   if (privacyStatements.length === 0) {
//     return null;
//   }

//   const statements = privacyStatements.map((statement) => statement.sentence);
//   const signUpStatement = findSignUpStatement(statements);

//   if (!signUpStatement) {
//     return null;
//   }

//   const signUpStatementUrl = findSignUpStatementUrl(
//     statements,
//     signUpStatement
//   );

//   console.log({ signUpStatement, signUpStatementUrl });

//   try {
//     const scrapeUrl = `${SCRAPE_URL_CADDY}${signUpStatementUrl}`; // Encode the URL for safety
//     console.log("Initiating URL call: ", scrapeUrl);

//     const response = await fetch(scrapeUrl);
//     const data = await response.json();
//     console.log(`Data for ${signUpStatementUrl}:`, data);
//     return data?.extractedText; // Return extracted text from the API response
//   } catch (error) {
//     console.error(`Error fetching data for ${signUpStatementUrl}:`, error);
//     return null;
//   }
// };

/*

Under privacy directory

1. getStatements
2. findStatement
3. findStatementUrl
4. getStatementContents
5. generateSummaries
6. Display the generated summaries

*/

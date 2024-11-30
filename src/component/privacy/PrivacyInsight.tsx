import { useEffect, useState } from "react";
import {
  getStatementAndUrlsContainingKeyword,
  normalizePrivacyStatements,
  PrivacyInfo,
} from "../../utils/privacy-utils";
import { SCRAPE_URL_CADDY } from "../../utils/constants";
import { run_privacy_checker } from "../../ai/privacy_checker";

const PrivacyInsight = () => {
  const [summary, setSummary] = useState<string>("");

  const findSignUpStatement = async (
    statements: PrivacyInfo[]
  ): Promise<PrivacyInfo | null> => {
    // send statements to LLM. find statement or null. if statement, return statement, else null.
    try {
      console.log("Calling LLM as judge...");

      const normalizedStatements = normalizePrivacyStatements(statements);
      console.log({ normalizePrivacyStatements });

      // LLM is currently prompted to respond the number which is mapped to the statement if present, else 0
      let mappedStatementId = 0;

      try {
        mappedStatementId = Number(
          await run_privacy_checker(normalizedStatements, {
            reuse_session: false,
          })
        );
      } catch (error) {
        console.log("Number conversion of LLM response failed...", error);
      }

      if (!mappedStatementId) {
        return null;
      }

      return statements.find(
        ({ id }) => id === mappedStatementId
      ) as PrivacyInfo;
    } catch (error) {
      console.error(
        `Calling LLM to judge sign up statement failed for statements: ${statements} `,
        error
      );
      return null;
    }
  };

  const findSignUpStatementUrl = async () => {
    const statements = getStatementAndUrlsContainingKeyword("privacy");
    const signUpStatement = await findSignUpStatement(statements);

    console.log({ statements, signUpStatement });

    // Directly return the URL or null if signUpStatement is null
    return signUpStatement ? signUpStatement.url : null;
  };

  const getStatementContents = async () => {
    const signUpStatementUrl = await findSignUpStatementUrl();
    console.log({ signUpStatementUrl });

    if (!signUpStatementUrl) {
      return null;
    }

    try {
      const scrapeUrl = `${SCRAPE_URL_CADDY}${signUpStatementUrl}`;
      console.log("Initiating URL call: ", scrapeUrl);

      const response = await fetch(scrapeUrl);
      const data = await response.json();
      console.log(`Data for ${signUpStatementUrl}:`, data);

      // Update state with extracted text if available
      if (data?.extractedText) {
        return data?.extractedText;
      }
    } catch (error) {
      console.error(`Error fetching data for ${signUpStatementUrl}:`, error);
      return "";
    }
  };

  const generateSummary = (contents: string) => {
    console.info("Generating summaries for text content: \n", contents);
    // setSummary("MOCKED SUMMARY");
  };

  const getSummary = async () => {
    const contents = await getStatementContents();
    setSummary(contents);
    generateSummary(contents);
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div>
      <h1>Guardian Insights</h1>
      <h2>Summaries</h2>
      <p>REPLACE: {summary}</p>
    </div>
  );
};

export default PrivacyInsight;

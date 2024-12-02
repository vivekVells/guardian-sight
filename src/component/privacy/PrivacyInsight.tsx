import { useEffect, useState } from "react";
import { SCRAPE_URL_CADDY } from "../../utils/constants";
import { run_privacy_checker } from "../../ai/privacy_checker";
import PrivacySummarizer from "../../ai/privacy_summarizer/summarize";
import Insights, {
  PrivacyPolicyStageKeys,
  SummaryContentsType,
} from "./Insights";
import {
  PrivacyInfo,
  normalizePrivacyStatements,
  getStatementAndUrlsContainingKeyword,
} from "../../utils/privacy-utils";

const PrivacyInsight = () => {
  const [summary, setSummary] = useState<SummaryContentsType[]>([]);
  const [privacyUrl, setPrivacyUrl] = useState<string>("");
  const [currentState, setCurrentState] =
    useState<PrivacyPolicyStageKeys>("DETECTING_SIGNUP");
  const [displayInsight, setDisplayInsight] = useState<boolean>(false);
  const privacySummarizer = new PrivacySummarizer();

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

      setDisplayInsight(true);
      setCurrentState("DETECTING_SIGNUP");

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
    setCurrentState("LOOKING_FOR_POLICY");

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
    setCurrentState("POLICY_FOUND");
    setPrivacyUrl(signUpStatementUrl);

    try {
      const scrapeUrl = `${SCRAPE_URL_CADDY}${signUpStatementUrl}`;
      console.log("Initiating URL call: ", scrapeUrl);

      const response = await fetch(scrapeUrl);
      const data = await response.json();
      console.log(`Data for ${signUpStatementUrl}:`, data);

      if (data?.extractedText) {
        return data?.extractedText;
      }
    } catch (error) {
      console.error(`Error fetching data for ${signUpStatementUrl}:`, error);
      return "";
    }
  };

  const generateSummary = async (contents: string) => {
    setCurrentState("SUMMARIZING_POINTS");
    const processed_contents =
      await privacySummarizer.summarizePrivacyPolicy(contents);
    console.info("Generating summaries for text content: \n", contents);
    console.log({ processed_contents });
    try {
      const parsedContents = JSON.parse(
        processed_contents
      ) as SummaryContentsType[];
      console.log("Parsed contents: ", parsedContents);
      return parsedContents;
    } catch (error) {
      console.error("Error parsing processed contents: ", error);
      return [{}];
    }
  };

  // @ts-ignore
  const getSummary = async () => {
    const contents = await getStatementContents();
    if (!contents) {
      return;
    }
    setCurrentState("RETRIEVED_PRIVACY_CONTENTS");
    const generatedSummary = (await generateSummary(
      contents
    )) as unknown as SummaryContentsType[];
    setSummary(generatedSummary);
    setCurrentState("SUMMARY_READY");
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div>
      <Insights
        summaryContents={summary}
        privacyUrl={privacyUrl}
        shouldShow={displayInsight}
        currentState={currentState}
      />
    </div>
  );
};

export default PrivacyInsight;

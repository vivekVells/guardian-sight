import React, { useEffect, useState } from "react";
import { Button, Drawer, Space, Typography, Progress } from "antd";
import MarkdownTypewriter from "./TypeWriter";
import {
  getRandomPrivacyImportancePoint,
  renderMarkdown,
} from "../../utils/privacy-utils";

// Define the stages for the privacy policy analysis
export const PRIVACY_POLICY_STAGE_MAPPED_MSG = {
  DETECTING_SIGNUP: "Detecting sign-up flow...",
  LOOKING_FOR_POLICY: "Looking for the privacy policy...",
  POLICY_FOUND: "Found privacy policy: https://example.com/privacy-policy",
  RETRIEVED_PRIVACY_CONTENTS: "Retrieved the privacy contents",
  ANALYZE_CONTENT: "Analyzing the privacy policy content...",
  SUMMARIZING_POINTS: "Summarizing key points...",
  SUMMARY_READY: "Here’s what you’re signing up for:",
} as const; // 'as const' makes the object readonly and infers literal types

// Define the type for the keys of the mapping
export type PrivacyPolicyStageKeys =
  keyof typeof PRIVACY_POLICY_STAGE_MAPPED_MSG;

interface InsightsProps {
  shouldShow?: boolean;
  summaryMock: string;
  currentState: PrivacyPolicyStageKeys; // Accepting a single key from the mapping
}

const Insights: React.FC<InsightsProps> = ({
  shouldShow = false,
  summaryMock,
  currentState, // Adding currentState as a prop
}) => {
  const [open, setOpen] = useState(shouldShow);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [summary, setSummary] = useState<string>("");

  // Generate steps based on the keys of the currentState
  const steps = Object.keys(PRIVACY_POLICY_STAGE_MAPPED_MSG).map(
    (key) => PRIVACY_POLICY_STAGE_MAPPED_MSG[key as PrivacyPolicyStageKeys]
  );

  summaryMock = summaryMock ?? "LOADING>>>>>>....";
  summaryMock = ` ${summaryMock}`;
  console.log({ summaryMock });

  const onOpen = () => {
    setOpen(true);
    // Reset the state whenever the drawer is opened
    setSummary("");
  };

  const onClose = () => {
    setOpen(false);
    setCurrentStep(0);
    setSummary("");
    setLoading(false);
  };

  // Determine the loading state based on currentState
  useEffect(() => {
    const loadingStates = [
      "DETECTING_SIGNUP",
      "LOOKING_FOR_POLICY",
      "POLICY_FOUND",
    ];
    setLoading(loadingStates.includes(currentState));
    setCurrentStep(
      Object.keys(PRIVACY_POLICY_STAGE_MAPPED_MSG).indexOf(currentState)
    );
  }, [currentState]);

  // useEffect(() => {
  //   const loadingStates = [
  //     "DETECTING_SIGNUP",
  //     "LOOKING_FOR_POLICY",
  //     "POLICY_FOUND",
  //   ];

  //   let timer = null;

  //   if (loadingStates.includes(currentState)) {
  //     let currentIndex = loadingStates.indexOf(currentState);

  //     const advanceState = () => {
  //       if (currentIndex < loadingStates.length - 1) {
  //         currentIndex++;
  //         setCurrentStep(currentIndex);
  //         setTimeout(advanceState, 2000); // Schedule the next state change
  //       } else {
  //         setLoading(false); // Finish loading when states are complete
  //       }
  //     };

  //     setLoading(true);
  //     setCurrentStep(currentIndex);
  //     timer = setTimeout(advanceState, 2000); // Start advancing the states
  //   } else {
  //     setLoading(false);
  //   }

  //   return () => {
  //     if (timer) clearTimeout(timer); // Clear the timeout if the component unmounts
  //   };
  // }, [currentState]);

  // useEffect(() => {
  //   setSummary(summaryMock);
  // }, [summaryMock]);

  useEffect(() => {
    setOpen(shouldShow);
  }, [shouldShow]);

  useEffect(() => {
    setSummary(summaryMock);
  }, [summaryMock]);

  return (
    <>
      <Button type="primary" onClick={onOpen}>
        Analyze Privacy Policy
      </Button>
      <Drawer
        title="Guardian Sight 🚀"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </Space>
        }
      >
        <Typography.Title>Current Status: {currentState}</Typography.Title>
        {loading ? (
          <>
            <Typography.Paragraph>{steps[currentStep]}</Typography.Paragraph>
            <Progress
              percent={Math.round(((currentStep + 1) / steps.length) * 100)}
              status="active"
              showInfo={false}
            />
            <div>
              <Space>{renderMarkdown(getRandomPrivacyImportancePoint())}</Space>
            </div>
          </>
        ) : (
          <div>
            <Typography.Paragraph>
              {steps[steps.length - 1]}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <MarkdownTypewriter speed={50} content={summary} />
            </Typography.Paragraph>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Insights;

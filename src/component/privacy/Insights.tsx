import React, { useEffect, useState } from "react";
import { Button, Drawer, Space, Typography, Spin } from "antd";
import MarkdownTypewriter from "./TypeWriter";
import ProgressTimeline from "./ProgressTimeline";

// Define the stages for the privacy policy analysis
export const PRIVACY_POLICY_STAGE_MAPPED_MSG = {
  DETECTING_SIGNUP: "Detecting sign-up flow...",
  LOOKING_FOR_POLICY: "Looking for the privacy policy...",
  POLICY_FOUND: "Found privacy policy: https://example.com/privacy-policy",
  RETRIEVED_PRIVACY_CONTENTS: "Retrieved the privacy contents",
  ANALYZE_CONTENT: "Analyzing the privacy policy content...",
  SUMMARIZING_POINTS: "Summarizing key points...",
  SUMMARY_READY: "Here’s what you’re signing up for:",
} as const;

// Define the type for the keys of the mapping
export type PrivacyPolicyStageKeys =
  keyof typeof PRIVACY_POLICY_STAGE_MAPPED_MSG;

interface InsightsProps {
  shouldShow?: boolean;
  summaryContents: string;
  currentState: PrivacyPolicyStageKeys;
}

const Insights: React.FC<InsightsProps> = ({
  shouldShow = false,
  summaryContents,
  currentState,
}) => {
  const [open, setOpen] = useState(shouldShow);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>(summaryContents);

  const steps = Object.keys(PRIVACY_POLICY_STAGE_MAPPED_MSG).map(
    (key) => PRIVACY_POLICY_STAGE_MAPPED_MSG[key as PrivacyPolicyStageKeys]
  );
  console.log({ summaryContents });

  const onOpen = () => {
    setOpen(true);
    setSummary("");
  };

  const onClose = () => {
    setOpen(false);
    setSummary("");
    setLoading(false);
  };

  useEffect(() => {
    const loadingStates: PrivacyPolicyStageKeys[] = [
      "DETECTING_SIGNUP",
      "LOOKING_FOR_POLICY",
      "POLICY_FOUND",
      "RETRIEVED_PRIVACY_CONTENTS",
      "ANALYZE_CONTENT",
      "SUMMARIZING_POINTS",
    ];
    setLoading(loadingStates.includes(currentState));
  }, [currentState]);

  useEffect(() => {
    setOpen(shouldShow);
  }, [shouldShow]);

  useEffect(() => {
    setSummary(summaryContents);
  }, [summaryContents]);

  const currentStatusCard = () => (
    <div>
      <span style={{ marginLeft: 8 }}>
        <Spin />
      </span>
      &nbsp;&nbsp;&nbsp;
      <span>{PRIVACY_POLICY_STAGE_MAPPED_MSG[currentState]}</span>
    </div>
  );

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
        {loading ? (
          <>
            {currentStatusCard()}
            <br />
            <br />
            <ProgressTimeline />
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

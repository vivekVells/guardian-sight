import React, { useEffect, useState } from "react";
import { Button, Drawer, Space, Typography, Progress } from "antd";
import MarkdownTypewriter from "./TypeWriter";

interface InsightsProps {
  shouldShow?: boolean;
  summaryMock: string;
}

const Insights: React.FC<InsightsProps> = ({
  shouldShow = false,
  summaryMock,
}) => {
  const [open, setOpen] = useState(shouldShow);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [summary, setSummary] = useState<string | null>(null);

  const steps = [
    "Detecting sign-up flow...",
    "Looking for the privacy policy...",
    "Found privacy policy: https://example.com/privacy-policy",
    "Fetching and analyzing the privacy policy content...",
    "Summarizing key points...",
    "Here’s what you’re signing up for:",
  ];

  summaryMock = summaryMock ?? "LOADING>>>>>>....";
  // Add a line break to the first one
  // summaryMock = summaryMock.replace(/^(\* .*)/, "$1  ");
  // Add a line break to the first bullet point
  summaryMock = ` ${summaryMock}`;
  console.log({ summaryMock });

  const processSteps = async () => {
    setLoading(true);
    setSummary(null);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setSummary(summaryMock);
    setLoading(false);
  };

  const onOpen = () => {
    setOpen(true);
    processSteps();
  };

  const onClose = () => {
    setOpen(false);
    setCurrentStep(0);
    setSummary(null);
    setLoading(false);
  };

  useEffect(() => {
    setOpen(shouldShow);
  }, [shouldShow]);

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
            <Typography.Paragraph>{steps[currentStep]}</Typography.Paragraph>
            <Progress
              percent={Math.round(((currentStep + 1) / steps.length) * 100)}
              status="active"
              showInfo={false}
            />
          </>
        ) : summary ? (
          <div>
            <Typography.Paragraph>
              {steps[steps.length - 1]}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <MarkdownTypewriter speed={99} content={summary} />
            </Typography.Paragraph>
          </div>
        ) : (
          <Typography.Paragraph>
            Ready to analyze privacy policies.
          </Typography.Paragraph>
        )}
        <Typography.Title>FINAL EXPECTED OUTPUT</Typography.Title>
        <br />
        <br />
        <br />
        {summaryMock}
        <Typography.Paragraph>
          <MarkdownTypewriter speed={99} content={summaryMock} />
        </Typography.Paragraph>
      </Drawer>
    </>
  );
};

export default Insights;

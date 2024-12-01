import React, { useState } from "react";
import { Button, Drawer, Space, Typography, Progress } from "antd";
import MarkdownTypewriter from "./TypeWriter";

const Insights: React.FC = () => {
  const [open, setOpen] = useState(false);
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

  const summaryMock = `
* You can update settings to personalize your experience within Meta Products.
* The complete Privacy Policy is accessible at the end of this document.
* The policy covers a range of Meta Products, including Marketplace and Instagram.
* Learn more about privacy management within the Privacy Center.
* Meta collects information based on your product usage and provided information.
  `;

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
      </Drawer>
    </>
  );
};

export default Insights;

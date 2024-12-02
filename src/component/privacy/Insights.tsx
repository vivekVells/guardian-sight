import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Space,
  Typography,
  Spin,
  Skeleton,
  Col,
  Row,
  Popover,
} from "antd";
import MarkdownTypewriter from "./TypeWriter";
import ProgressTimeline from "./ProgressTimeline";
import ImpactStatementGenerator from "../../ai/impact_statement_generator/stage";
import "antd/dist/reset.css";
import {
  AudioOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  LockOutlined,
  PieChartOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const PRIVACY_POLICY_STAGE_MAPPED_MSG = {
  DETECTING_SIGNUP: "Detecting sign-up flow...",
  LOOKING_FOR_POLICY: "Looking for the privacy policy...",
  POLICY_FOUND: "Found privacy policy: https://example.com/privacy-policy",
  RETRIEVED_PRIVACY_CONTENTS: "Retrieved the privacy contents",
  ANALYZE_CONTENT: "Analyzing the privacy policy content...",
  SUMMARIZING_POINTS: "Summarizing key points...",
  SUMMARY_READY: "Here’s what you’re signing up for!",
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
  const [privacyImportanceStatements, setPrivacyImportanceStatements] =
    useState<Array<string>>([]);

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
    if (shouldShow) {
      const fetchImpactStatements = async () => {
        const generator = new ImpactStatementGenerator();
        const statements = await generator.generateImpactStatements();
        setPrivacyImportanceStatements(statements);
      };

      fetchImpactStatements();
    }
    setOpen(shouldShow);
  }, [shouldShow]);

  useEffect(() => {
    setSummary(summaryContents);
  }, [summaryContents]);
  privacyImportanceStatements;

  const currentStatusCard = () => (
    <div>
      <span style={{ marginLeft: 8 }}>
        <Spin />
      </span>
      &nbsp;&nbsp;&nbsp;
      <span>{PRIVACY_POLICY_STAGE_MAPPED_MSG[currentState]}</span>
    </div>
  );

  const scorePanel = () => {
    const iconStyle = {
      fontSize: "48px",
    };
    const items = [
      <div style={{ textAlign: "center" }}>
        <Popover
          content={
            <div>
              <p>SCORE CARD: 100</p>
              <p>Description</p>
            </div>
          }
          title="Info"
        >
          <LockOutlined key="privacy" style={iconStyle} />

          <Typography.Title level={4}>Privacy</Typography.Title>
        </Popover>
      </div>,
      <AudioOutlined key="audio" style={iconStyle} />,
      <VideoCameraOutlined key="video" style={iconStyle} />,
      <DollarOutlined key="advertisement" style={iconStyle} />,
      <PieChartOutlined key="cookie" style={iconStyle} />,
      <EnvironmentOutlined key="location" style={iconStyle} />,
    ];

    return (
      <div>
        <Row gutter={[0, 0]} style={{ margin: 0, padding: 0 }}>
          {items.map((item, index) => (
            // @ts-ignore
            <Col key={item} span={8} style={{ padding: "0.5em" }}>
              <div
                style={{
                  backgroundColor: [0, 2, 4].includes(index)
                    ? "#CBD6FF"
                    : "#f0f0f0",
                  height: "8em",
                  width: "10em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  fontSize: "1.5em",
                  paddingRight: "0 !important",
                }}
              >
                {item}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
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
            {currentStatusCard()}
            <br />
            <br />
            {privacyImportanceStatements.length > 0 ? (
              <ProgressTimeline statements={privacyImportanceStatements} />
            ) : (
              <Skeleton active />
            )}
          </>
        ) : (
          <>
            <div>{scorePanel()}</div>
            <br />
            <div>
              <Typography.Title level={3}>
                {steps[steps.length - 1]}
              </Typography.Title>
              <Typography.Paragraph>
                <MarkdownTypewriter speed={50} content={summary} />
              </Typography.Paragraph>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default Insights;

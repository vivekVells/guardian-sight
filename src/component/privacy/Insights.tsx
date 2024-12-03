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
  Card,
  Image,
} from "antd";
import ProgressTimeline from "./ProgressTimeline";
import ImpactStatementGenerator from "../../ai/impact_statement_generator/stage";
import "antd/dist/reset.css";
import {
  AudioOutlined,
  CloseOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  LockOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import privacyImg from "../../assets/icons/privacy_simplified.png";
import FinalSummaryHeader from "./FinalSummaryHeader";

const PRIVACY_POLICY_STAGE_MAPPED_MSG = {
  DETECTING_SIGNUP: "Detecting sign-up flow...",
  LOOKING_FOR_POLICY: "Looking for the privacy policy...",
  POLICY_FOUND: "Found privacy policy...",
  RETRIEVED_PRIVACY_CONTENTS: "Retrieved the privacy contents",
  ANALYZE_CONTENT: "Analyzing the privacy policy content...",
  SUMMARIZING_POINTS: "Summarizing key points...",
  SUMMARY_READY: "Here’s what you’re signing up for!",
} as const;

export type PrivacyPolicyStageKeys =
  keyof typeof PRIVACY_POLICY_STAGE_MAPPED_MSG;

export type SummaryContentsType = {
  key: string;
  title: string;
  content: string;
  score_color: string;
};

interface InsightsProps {
  shouldShow?: boolean;
  privacyUrl: string;
  summaryContents: SummaryContentsType[];
  insightsContents: string;
  currentState: PrivacyPolicyStageKeys;
}

const Insights: React.FC<InsightsProps> = ({
  shouldShow = false,
  privacyUrl = "",
  summaryContents,
  insightsContents,
  currentState,
}) => {
  const [open, setOpen] = useState(shouldShow);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] =
    useState<SummaryContentsType[]>(summaryContents);
  const [privacyImportanceStatements, setPrivacyImportanceStatements] =
    useState<Array<string>>([]);
  const { Paragraph, Link, Title } = Typography;

  // Resolve the image URL using chrome.runtime.getURL for Chrome extensions, with a fallback to privacyImg
  const privacyImgUrl =
    chrome?.runtime?.getURL(`assets/${privacyImg.split("/").pop()}`) ??
    privacyImg;

  console.log({ summaryContents });

  const onClose = () => {
    setOpen(false);
    setSummary([] as SummaryContentsType[]);
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
    const panelItems = [
      {
        key: "privacy",
        icon: <LockOutlined />,
        title: "Privacy",
        description:
          "Manage your personal data protection settings and control how your information is collected and used.",
      },
      {
        key: "audio",
        icon: <AudioOutlined />,
        title: "Audio",
        description:
          "Configure audio input, output, and permissions for microphone access across applications.",
      },
      {
        key: "video",
        icon: <VideoCameraOutlined />,
        title: "Video",
        description:
          "Adjust camera settings, permissions, and video-related preferences for your device.",
      },
      {
        key: "advertisement",
        icon: <DollarOutlined />,
        title: "Advertisement",
        description:
          "Manage ad preferences, personalization settings, and data used for targeted advertising.",
      },
      {
        key: "cookie",
        icon: <LockOutlined />,
        title: "Cookie",
        description:
          "Control cookie settings, manage website tracking, and adjust data retention preferences.",
      },
      {
        key: "location",
        icon: <EnvironmentOutlined />,
        title: "Location",
        description:
          "Manage location services, GPS permissions, and location-based app access.",
      },
    ];

    const scoreColorMap: any = summary.reduce((acc, { key, score_color }) => {
      // @ts-ignore
      acc[key] = score_color;
      return acc;
    }, {});

    return (
      <div>
        <Row gutter={[0, 0]} style={{ margin: 0, padding: 0 }}>
          {panelItems.map(({ key, icon, title, description }) => {
            const backgroundColor = (() => {
              switch (scoreColorMap[key]) {
                case "green":
                  return "#81C784";
                case "yellow":
                  return "#FFD54F";
                case "red":
                  return "#D32F2F";
                case "grey":
                  return "#9E9E9E";
                default:
                  return "#A0A0A0";
              }
            })();

            return (
              <Col key={key} span={8} style={{ padding: "0.5em" }}>
                <Popover
                  content={
                    <div>
                      <ul>
                        <li>
                          <Paragraph>{description}</Paragraph>
                        </li>
                        <li>
                          <Paragraph strong>Privacy Inference</Paragraph>
                          <Paragraph>
                            {(() => {
                              switch (scoreColorMap[key]) {
                                case "green":
                                  return "🟢 Minimal privacy concerns. Data well-protected.";
                                case "yellow":
                                  return "🟡 Moderate privacy risks. Exercise caution.";
                                case "red":
                                  return "🔴 Significant privacy concerns. High data risk.";
                                default:
                                  return "⚪ No relevant data found for this category.";
                              }
                            })()}
                          </Paragraph>
                        </li>
                      </ul>
                    </div>
                  }
                  title={
                    <Title level={3} style={{ margin: 0, fontSize: "1.75em" }}>
                      {title}
                    </Title>
                  }
                >
                  <div
                    style={{
                      backgroundColor,
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
                    <div style={{ textAlign: "center" }}>
                      {React.cloneElement(icon, { style: iconStyle })}
                      <Title level={4} style={{ marginLeft: "8px" }}>
                        {title}
                      </Title>
                    </div>
                  </div>
                </Popover>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  const constructSummary = () => {
    return summaryContents.map(({ title: summaryTitle, content }) => (
      <>
        <Card title={summaryTitle} bordered={false} style={{ width: "100%" }}>
          <p>{content}</p>
        </Card>
        <br />
      </>
    ));
  };

  const constructPrivacyUrl = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <LinkOutlined style={{ marginRight: 8 }} />
      <Paragraph style={{ margin: 0 }} italic>
        Insights based on this URL:{" "}
        <Link href={privacyUrl} target="_blank">
          {privacyUrl}
        </Link>
      </Paragraph>
    </div>
  );

  const TitleComponent = () => (
    <div>
      <Title level={2} style={{ margin: 0 }}>
        Guardian Sight
      </Title>
    </div>
  );

  return (
    <>
      <Drawer
        title={<TitleComponent />}
        styles={{ header: { textAlign: "center" } }}
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        closeIcon={null}
        extra={
          <Space>
            <Button
              onClick={onClose}
              disabled={false}
              type="primary"
              shape="circle"
              icon={<CloseOutlined />}
            />
          </Space>
        }
        destroyOnClose={true}
        keyboard={false}
        footer={
          <Typography.Text>
            Insights powered by Chrome's{" "}
            <Typography.Link
              href="https://developer.chrome.com/docs/ai/built-in"
              target="_blank"
            >
              built-in AI.
            </Typography.Link>{" "}
            Please verify your{" "}
            <Typography.Link href={privacyUrl} target="_blank">
              privacy policy
            </Typography.Link>
            , as AI may not always be accurate.
          </Typography.Text>
        }
      >
        {loading ? (
          <>
            {privacyUrl && constructPrivacyUrl()}
            <br />
            {currentStatusCard()}
            <br />
            <br />
            {privacyImportanceStatements.length > 0 ? (
              <ProgressTimeline statements={privacyImportanceStatements} />
            ) : (
              <Skeleton active paragraph={{ rows: 8 }} />
            )}
            <br />
            <br />

            <div>
              <Image
                src={privacyImgUrl}
                alt="User Journey Image of Guardian Sight"
                width={"100%"}
                preview={true}
              />
            </div>
          </>
        ) : (
          <>
            {privacyUrl && constructPrivacyUrl()}
            <br />
            {summaryContents.length > 0 ? (
              <FinalSummaryHeader contents={insightsContents} />
            ) : (
              <Skeleton active paragraph={{ rows: 5 }} />
            )}
            <br />
            <Typography.Title level={5}>
              Here's What You Signed Up For
            </Typography.Title>

            {scorePanel()}
            <br />
            {constructSummary()}
          </>
        )}
      </Drawer>
    </>
  );
};

export default Insights;

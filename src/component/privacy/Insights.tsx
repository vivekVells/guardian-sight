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

type SummaryContentsType = {
  key: string;
  title: string;
  content: string;
  score_color: string;
};

interface InsightsProps {
  shouldShow?: boolean;
  privacyUrl: string;
  summaryContents: SummaryContentsType[];
  currentState: PrivacyPolicyStageKeys;
}

const Insights: React.FC<InsightsProps> = ({
  shouldShow = false,
  privacyUrl = "",
  summaryContents,
  currentState,
}) => {
  const [open, setOpen] = useState(shouldShow);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] =
    useState<SummaryContentsType[]>(summaryContents);
  const [privacyImportanceStatements, setPrivacyImportanceStatements] =
    useState<Array<string>>([]);
  const { Paragraph, Link, Text, Title } = Typography;

  console.log({ summaryContents });

  const onOpen = () => {
    setOpen(true);
    setSummary([] as SummaryContentsType[]);
  };

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
      { key: "privacy", icon: <LockOutlined />, title: "Privacy" },
      { key: "audio", icon: <AudioOutlined />, title: "Audio" },
      { key: "video", icon: <VideoCameraOutlined />, title: "Video" },
      {
        key: "advertisement",
        icon: <DollarOutlined />,
        title: "Advertisement",
      },
      { key: "cookie", icon: <LockOutlined />, title: "Cookie" },
      { key: "location", icon: <EnvironmentOutlined />, title: "Location" },
    ];

    const scoreColorMap: any = summary.reduce((acc, { key, score_color }) => {
      // @ts-ignore
      acc[key] = score_color;
      return acc;
    }, {});

    return (
      <div>
        <Row gutter={[0, 0]} style={{ margin: 0, padding: 0 }}>
          {panelItems.map(({ key, icon, title }) => {
            const backgroundColor = scoreColorMap[key] || "#f0f0f0"; // Default to light grey if key not found

            return (
              <Col key={key} span={8} style={{ padding: "0.5em" }}>
                <Popover
                  content={
                    <div>
                      <p>SCORE CARD: 100</p>
                      <p>{summary.find((item) => item.key === key)?.content}</p>
                    </div>
                  }
                  title={title}
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
                      <Typography.Title level={4} style={{ marginLeft: "8px" }}>
                        {title}
                      </Typography.Title>
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

  return (
    <>
      <Button type="primary" onClick={onOpen}>
        Analyze Privacy Policy
      </Button>
      <Drawer
        title="Guardian Sight 🚀"
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
              <Skeleton active />
            )}
            <br />
            <br />

            <Image.PreviewGroup
              items={["src/assets/icons/privacy_simplified.png"]}
            >
              <Image src={privacyImg} />
            </Image.PreviewGroup>
          </>
        ) : (
          <>
            {privacyUrl && constructPrivacyUrl()}
            <br />
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

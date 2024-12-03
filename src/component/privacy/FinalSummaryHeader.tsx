import { Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import HeaderSummarizer from "../../ai/summarizer_presenter/summarize_header";

interface FinalSummaryHeaderProps {
  contents: string;
}

const FinalSummaryHeader: React.FC<FinalSummaryHeaderProps> = ({
  contents,
}) => {
  const [insightsSummary, setInsightsSummary] = useState("");

  useEffect(() => {
    const fetchInsightsSummarizer = async () => {
      console.log("Calling ai header summary for contents: ", { contents });

      if (!contents) {
        return null;
      }

      const summary = await new HeaderSummarizer().summarize(contents);
      console.log("#$kev: summary", summary);

      setInsightsSummary(summary);
    };
    fetchInsightsSummarizer();
  }, []);

  return (
    <div>
      {insightsSummary ? (
        <>
          <Typography.Title level={5}>Insights Summary</Typography.Title>
          <Typography.Paragraph>{insightsSummary}</Typography.Paragraph>
        </>
      ) : (
        <Skeleton active paragraph={{ rows: 5 }} />
      )}
    </div>
  );
};

export default FinalSummaryHeader;

import React from "react";
import { Carousel } from "antd";
import { Card } from "antd";
import { renderMarkdown } from "../../utils/privacy-utils";

const { Meta } = Card;

interface ProgressTimelineProps {
  statements: string[];
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  statements = [],
}) => {
  console.log("ProgressTimeline: ", { statements });

  return (
    <div>
      <Carousel autoplay effect="fade" dots={false} autoplaySpeed={3000} fade>
        {statements.map((statement, index) => (
          <div key={index}>
            <Card
              hoverable
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                wordWrap: "break-word",
              }}
            >
              <img
                alt="example"
                src="https://images.pexels.com/photos/113726/pexels-photo-113726.jpeg"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "16px", flex: 1 }}>
                <Meta description={renderMarkdown(statement)} />
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProgressTimeline;

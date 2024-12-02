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
                // width: "100%",
                margin: "0 auto",
                height: "100%",
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                wordWrap: "break-word",
              }}
              cover={
                <img
                  alt="example"
                  src="https://images.pexels.com/photos/113726/pexels-photo-113726.jpeg"
                  style={{
                    height: "200px",
                    width: "300px",
                    // objectFit: "cover",
                  }}
                />
              }
            >
              <Meta
                // title="Privacy Importance"
                description={renderMarkdown(statement)}
              />
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProgressTimeline;

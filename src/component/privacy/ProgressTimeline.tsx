import React from "react";
import { Carousel } from "antd";
import { Card } from "antd";
import { renderMarkdown } from "../../utils/privacy-utils";

const { Meta } = Card;

// Change the array to hold strings instead of objects
export const PRIVACY_IMPORTANCE_STATEMENTS = [
  "🔒 **Consumer Trust**: 79% of consumers are concerned about how companies use their personal data. [Source: Pew Research Center](https://www.pewresearch.org/fact-tank/2019/09/05/the-privacy-paradox/)",
  "📊 **Data Breaches**: The average cost of a data breach is estimated to be $4.35 million. Organizations must prioritize privacy to mitigate financial risks. [Source: IBM](https://www.ibm.com/security/data-breach)",
  "🛡️ **Identity Theft Prevention**: 1 in 15 people in the U.S. have been victims of identity theft, highlighting the need for robust privacy measures. [Source: Javelin Strategy & Research](https://www.javelinstrategy.com/press-release/new-report-identity-fraud-hits-14-4-million-us-consumers-2020)",
  "📉 **Brand Reputation**: 87% of consumers will take their business elsewhere if they feel their data is not secure. [Source: IBM](https://www.ibm.com/security/data-breach)",
  "🌐 **Digital Footprint**: 92% of consumers believe they have lost control over how their personal information is collected and used by companies. [Source: Pew Research Center](https://www.pewresearch.org/internet/2020/01/23/the-privacy-and-security-concerns-of-americans-in-the-digital-age/)",
];

// // Function to render Markdown content
// export const renderMarkdown = (contents: any) => {
//   return (
//     <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
//       {contents}
//     </ReactMarkdown>
//   );
// };

const ProgressTimeline: React.FC = () => (
  <div>
    <Carousel autoplay effect="fade" dotPosition="bottom">
      {PRIVACY_IMPORTANCE_STATEMENTS.map((statement, index) => (
        <div key={index}>
          <Card
            hoverable
            style={{
              width: "100%",
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
                style={{ height: "200px", objectFit: "cover" }}
              />
            }
          >
            <Meta
              title="Privacy Importance"
              description={renderMarkdown(statement)}
            />
          </Card>
        </div>
      ))}
    </Carousel>
  </div>
);

export default ProgressTimeline;

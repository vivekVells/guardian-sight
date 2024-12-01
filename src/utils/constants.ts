export const SCRAPE_URL_CADDY =
  "https://guardian-sight-api.adityakarnam.me/scrape?url=";
export const SCRAPE_URL_IP = "http://144.126.222.111:3005/scrape?url=";

export interface PrivacyPolicyStage {
  key: string; // The unique key for each stage
  message: string; // The corresponding message for that stage
}

// Define the array type based on the interface
export type PrivacyPolicyStagesArray = PrivacyPolicyStage[];

// Example of the array with the defined type
export const PRIVACY_POLICY_STAGE_MAPPED_MSG: PrivacyPolicyStagesArray = [
  { key: "DETECT_SIGNUP", message: "Detecting the sign-up flow..." },
  {
    key: "SEARCH_PRIVACY_POLICY",
    message: "Searching for the relevant privacy policy...",
  },
  {
    key: "FOUND_PRIVACY_POLICY",
    message:
      "Privacy policy found: [https://example.com/privacy-policy](https://example.com/privacy-policy)",
  },
  {
    key: "RETRIEVE_POLICY_CONTENT",
    message: "Retrieving the privacy policy content...",
  },
  {
    key: "ANALYZE_CONTENT",
    message: "Analyzing the retrieved content for key insights...",
  },
  {
    key: "EXTRACT_KEY_POINTS",
    message: "Extracting key points for your review...",
  },
  { key: "SUMMARY_INTRO", message: "Summary of what you're signing up for:" },
];

export const PRIVACY_IMPORTANCE_STATEMENTS = [
  {
    point:
      "🔒 **Consumer Trust**: 79% of consumers are concerned about how companies use their personal data. [Source: Pew Research Center](https://www.pewresearch.org/fact-tank/2019/09/05/the-privacy-paradox/)",
  },
  {
    point:
      "📊 **Data Breaches**: The average cost of a data breach is estimated to be $4.35 million. Organizations must prioritize privacy to mitigate financial risks. [Source: IBM](https://www.ibm.com/security/data-breach)",
  },
  {
    point:
      "🛡️ **Identity Theft Prevention**: 1 in 15 people in the U.S. have been victims of identity theft, highlighting the need for robust privacy measures. [Source: Javelin Strategy & Research](https://www.javelinstrategy.com/press-release/new-report-identity-fraud-hits-14-4-million-us-consumers-2020)",
  },
  {
    point:
      "📉 **Brand Reputation**: 87% of consumers will take their business elsewhere if they feel their data is not secure. [Source: IBM](https://www.ibm.com/security/data-breach)",
  },
  {
    point:
      "🌐 **Digital Footprint**: 92% of consumers believe they have lost control over how their personal information is collected and used by companies. [Source: Pew Research Center](https://www.pewresearch.org/internet/2020/01/23/the-privacy-and-security-concerns-of-americans-in-the-digital-age/)",
  },
  {
    point:
      "👥 **Informed Consent**: 66% of consumers say they want more control over their personal information and the way it is collected and used. [Source: Microsoft](https://www.microsoft.com/en-us/security/blog/2021/04/22/the-data-privacy-implications-of-the-pandemic/)",
  },
  {
    point:
      "🔍 **Transparency Matters**: 74% of consumers are more likely to buy from brands that provide clear and accessible privacy information. [Source: Accenture](https://www.accenture.com/us-en/insights/strategy/consumer-privacy)",
  },
  {
    point:
      "💡 **Data Sharing Concerns**: 79% of Americans believe they have little to no control over the data companies collect about them. [Source: Pew Research Center](https://www.pewresearch.org/fact-tank/2019/11/15/americans-and-digital-privacy/)",
  },
  {
    point:
      "📈 **Increased Demand for Privacy**: 81% of consumers said they would stop doing business with a company if they had a data breach. [Source: IBM](https://www.ibm.com/security/data-breach)",
  },
  {
    point:
      "🧩 **Complexity of Privacy Regulations**: Businesses must navigate a patchwork of state and federal privacy laws, making compliance challenging. [Source: IAPP](https://iapp.org/news/a/2020/01/the-2020-privacy-and-data-protection-landscape/)",
  },
  {
    point:
      "🌍 **Global Standards**: Privacy regulations like GDPR and CCPA set a new standard for data protection that is influencing global policies. [Source: DLA Piper](https://www.dlapiper.com/en/us/insights/publications/2021/03/global-data-privacy-laws/)",
  },
  {
    point:
      "👁️‍🗨️ **Surveillance Concerns**: 54% of Americans feel that their personal data is being used for surveillance without their consent. [Source: Pew Research Center](https://www.pewresearch.org/fact-tank/2019/11/15/americans-and-digital-privacy/)",
  },
  {
    point:
      "🔗 **Interconnected Data**: The average consumer is connected to 9 different online accounts, increasing the risk of data exposure. [Source: Cisco](https://www.cisco.com/c/en/us/about/press/internet-protocol-journal/blogs/2019/1/30/whats-the-value-of-your-data.html)",
  },
  {
    point:
      "🏦 **Financial Security**: Financial data breaches can have severe consequences, including identity theft and fraud. [Source: Experian](https://www.experian.com/blogs/news/2021/01/new-data-breach-report/)",
  },
  {
    point:
      "🤝 **Trust is Crucial**: 75% of consumers expect businesses to be trustworthy in handling their data. [Source: Edelman](https://www.edelman.com/trust/2021-trust-barometer)",
  },
  {
    point:
      "📉 **Impact on Business**: 60% of businesses report losing customers due to concerns over data privacy. [Source: Forrester](https://go.forrester.com/blogs/5-data-privacy-predictions-for-2021/)",
  },
  {
    point:
      "🔄 **Data Control**: Consumers want the ability to control their data, with 90% desiring a way to access and manage their personal information. [Source: Microsoft](https://www.microsoft.com/en-us/security/blog/2021/04/22/the-data-privacy-implications-of-the-pandemic/)",
  },
  {
    point:
      "📋 **Privacy Policies Matter**: 91% of consumers believe it’s important to read privacy policies, yet only 20% do. [Source: TrustArc](https://trustarc.com/resources/blog/the-importance-of-privacy-notices-in-the-digital-age/)",
  },
  {
    point:
      "🌐 **Evolving Landscape**: Privacy concerns are evolving, with 58% of consumers worried about how their data is used by AI systems. [Source: PwC](https://www.pwc.com/gx/en/services/governance-risk-compliance/data-privacy.html)",
  },
  {
    point:
      "🤖 **AI and Privacy**: 66% of people are concerned about how AI could violate their privacy. [Source: PwC](https://www.pwc.com/gx/en/services/governance-risk-compliance/data-privacy.html)",
  },
  {
    point:
      "💻 **Remote Work Risks**: Remote work has increased the number of potential data breaches, making privacy more critical than ever. [Source: Verizon](https://enterprise.verizon.com/resources/reports/dbir/)",
  },
  {
    point:
      "🛡️ **Proactive Measures**: Companies that invest in privacy measures can enhance customer loyalty and brand reputation. [Source: IBM](https://www.ibm.com/security/data-breach)",
  },
  {
    point:
      "📱 **Mobile Privacy**: 87% of consumers use their smartphones to manage sensitive information, highlighting the need for mobile privacy protections. [Source: Pew Research Center](https://www.pewresearch.org/internet/2020/05/05/the-state-of-online-dating-2020/)",
  },
  {
    point:
      "🔄 **Data Breach Notifications**: 47 states have laws requiring companies to notify consumers about data breaches, emphasizing accountability. [Source: National Conference of State Legislatures](https://www.ncsl.org/research/telecommunications-and-information-technology/data-breach-notification-laws.aspx)",
  },
  {
    point:
      "📈 **Data Demand**: 60% of consumers are willing to share personal information for a better service, indicating a need for trust. [Source: Accenture](https://www.accenture.com/us-en/insights/strategy/consumer-privacy)",
  },
  {
    point:
      "🚀 **Future of Privacy**: As technology evolves, so do privacy concerns; adapting is crucial for businesses to thrive in a digital world. [Source: Deloitte](https://www2.deloitte.com/us/en/insights/industry/technology/media-and-telecommunications/2021-global-tech-trends-report.html)",
  },
];

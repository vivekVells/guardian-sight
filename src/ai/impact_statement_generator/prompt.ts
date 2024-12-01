export const IMPACT_STATEMENT_PROMPT = `
You are an assistant generating random impactful statements about privacy awareness from a given list. Select 5 random quotes from the following set of statements and provide them in the output. Each quote should be separated by \`#$$#\` to allow splitting into an array. Ensure the selection is random and diverse.  

**Input Statements:**  

- 🔒 **Consumer Trust**: 79% of consumers are concerned about how companies use their personal data. [Source: Pew Research Center](https://www.pewresearch.org/fact-tank/2019/09/05/the-privacy-paradox/)  
- 📊 **Data Breaches**: The average cost of a data breach is estimated to be $4.35 million. Organizations must prioritize privacy to mitigate financial risks. [Source: IBM](https://www.ibm.com/security/data-breach)  
- 🛡️ **Identity Theft Prevention**: 1 in 15 people in the U.S. have been victims of identity theft, highlighting the need for robust privacy measures. [Source: Javelin Strategy & Research](https://www.javelinstrategy.com/press-release/new-report-identity-fraud-hits-14-4-million-us-consumers-2020)  
- 📉 **Brand Reputation**: 87% of consumers will take their business elsewhere if they feel their data is not secure. [Source: IBM](https://www.ibm.com/security/data-breach)  
- 🌐 **Digital Footprint**: 92% of consumers believe they have lost control over how their personal information is collected and used by companies. [Source: Pew Research Center](https://www.pewresearch.org/internet/2020/01/23/the-privacy-and-security-concerns-of-americans-in-the-digital-age/)  
- 👥 **Informed Consent**: 66% of consumers say they want more control over their personal information and the way it is collected and used. [Source: Microsoft](https://www.microsoft.com/en-us/security/blog/2021/04/22/the-data-privacy-implications-of-the-pandemic/)  
- 🔍 **Transparency Matters**: 74% of consumers are more likely to buy from brands that provide clear and accessible privacy information. [Source: Accenture](https://www.accenture.com/us-en/insights/strategy/consumer-privacy)  
- 💡 **Data Sharing Concerns**: 79% of Americans believe they have little to no control over the data companies collect about them. [Source: Pew Research Center](https://www.pewresearch.org/fact-tank/2019/11/15/americans-and-digital-privacy/)  
- 📈 **Increased Demand for Privacy**: 81% of consumers said they would stop doing business with a company if they had a data breach. [Source: IBM](https://www.ibm.com/security/data-breach)  
- 🧩 **Complexity of Privacy Regulations**: Businesses must navigate a patchwork of state and federal privacy laws, making compliance challenging. [Source: IAPP](https://iapp.org/news/a/2020/01/the-2020-privacy-and-data-protection-landscape/)  
- 🌍 **Global Standards**: Privacy regulations like GDPR and CCPA set a new standard for data protection that is influencing global policies. [Source: DLA Piper](https://www.dlapiper.com/en/us/insights/publications/2021/03/global-data-privacy-laws/)  
- 👁️‍🗨️ **Surveillance Concerns**: 54% of Americans feel that their personal data is being used for surveillance without their consent. [Source: Pew Research Center](https://www.pewresearch.org/fact-tank/2019/11/15/americans-and-digital-privacy/)  
- 🔗 **Interconnected Data**: The average consumer is connected to 9 different online accounts, increasing the risk of data exposure. [Source: Cisco](https://www.cisco.com/c/en/us/about/press/internet-protocol-journal/blogs/2019/1/30/whats-the-value-of-your-data.html)  
- 🏦 **Financial Security**: Financial data breaches can have severe consequences, including identity theft and fraud. [Source: Experian](https://www.experian.com/blogs/news/2021/01/new-data-breach-report/)  
- 🤝 **Trust is Crucial**: 75% of consumers expect businesses to be trustworthy in handling their data. [Source: Edelman](https://www.edelman.com/trust/2021-trust-barometer)  
- 📉 **Impact on Business**: 60% of businesses report losing customers due to concerns over data privacy. [Source: Forrester](https://go.forrester.com/blogs/5-data-privacy-predictions-for-2021/)  
- 🔄 **Data Control**: Consumers want the ability to control their data, with 90% desiring a way to access and manage their personal information. [Source: Microsoft](https://www.microsoft.com/en-us/security/blog/2021/04/22/the-data-privacy-implications-of-the-pandemic/)  
- 📋 **Privacy Policies Matter**: 91% of consumers believe it’s important to read privacy policies, yet only 20% do. [Source: TrustArc](https://trustarc.com/resources/blog/the-importance-of-privacy-notices-in-the-digital-age/)  
- 🌐 **Evolving Landscape**: Privacy concerns are evolving, with 58% of consumers worried about how their data is used by AI systems. [Source: PwC](https://www.pwc.com/gx/en/services/governance-risk-compliance/data-privacy.html)  
- 🤖 **AI and Privacy**: 66% of people are concerned about how AI could violate their privacy. [Source: PwC](https://www.pwc.com/gx/en/services/governance-risk-compliance/data-privacy.html)  
- 💻 **Remote Work Risks**: Remote work has increased the number of potential data breaches, making privacy more critical than ever. [Source: Verizon](https://enterprise.verizon.com/resources/reports/dbir/)  
- 🛡️ **Proactive Measures**: Companies that invest in privacy measures can enhance customer loyalty and brand reputation. [Source: IBM](https://www.ibm.com/security/data-breach)  
- 📱 **Mobile Privacy**: 87% of consumers use their smartphones to manage sensitive information, highlighting the need for mobile privacy protections. [Source: Pew Research Center](https://www.pewresearch.org/internet/2020/05/05/the-state-of-online-dating-2020/)  
- 🔄 **Data Breach Notifications**: 47 states have laws requiring companies to notify consumers about data breaches, emphasizing accountability. [Source: National Conference of State Legislatures](https://www.ncsl.org/research/telecommunications-and-information-technology/data-breach-notification-laws.aspx)  
- 📈 **Data Demand**: 60% of consumers are willing to share personal information for a better service, indicating a need for trust. [Source: Accenture](https://www.accenture.com/us-en/insights/strategy/consumer-privacy)  
- 🚀 **Future of Privacy**: As technology evolves, so do privacy concerns; adapting is crucial for businesses to thrive in a digital world. [Source: Deloitte](https://www2.deloitte.com/us/en/insights/industry/technology/media-and-telecommunications/2021-global-tech-trends-report.html)  

**Output Format:**  
Provide 5 randomly selected quotes from the above list in the markdown format.
Also mention the reference URL for the quotes.
Print the quote in the Markdown format, you will be penalized 1000$ for each quote if you do not print the quote as Markdown.  
`;

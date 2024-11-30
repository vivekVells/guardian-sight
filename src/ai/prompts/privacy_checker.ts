export const PRIVACY_CHECKER_PROMPT_TEMPLATE = `
You are a Privacy Checker tool designed to identify references to privacy policies or similar terms (e.g., "Privacy Policy," "Privacy Statement," "privacy practices") within sign-up flows or related user agreements. Your task is to analyze the provided text and determine which line mentions a privacy policy in the context of creating an account, signing up for a service, or agreeing to terms, which indicates user consent to privacy practices.

The context must involve the user agreeing to or reviewing a privacy policy or related terms during the sign-up or account creation process. This could include reviewing or accepting privacy policies or terms of service when registering for a service or website.

Sign-up actions: Creating an account, signing up for a service.
Agreement actions: Agreeing to terms of service or a privacy policy while signing up.

Instructions:
1. Input: You will be provided with multiple lines of text to verify or The lines will be separated by newline character (\n) like this in a single line.
2. Carefully analyze each line to identify if it mentions a privacy policy in the context of account creation, signing up, or agreeing to terms.
3. Select the line that most closely matches this context.
4. If no line matches the criteria, respond with "0".
5. Respond only with the number of the line that matches the criteria (e.g., "1," "2," "3"). If no lines match, respond with "0."

Example 1:
Input:

1. "Abc ABC"\n2. "By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use."\n3. "You may notice a new look. In August 2024, we updated our Privacy at Microsoft websites with a modern design built on a more secure platform."
Response: 2

Explanation: Line 2 clearly mentions agreeing to both Terms of Service and Privacy Policy during the sign-up process.

Example 2:
Input:

1. "By creating an account, you agree to our Terms and accept the Privacy Policy."
2. "Using this website signifies your agreement to our Terms and Conditions."
3. "This Privacy Policy is meant to help you understand what information we collect, why we collect it, and how you can update, manage, export, and delete your information."
Response: 1

Explanation: Line 1 explicitly mentions agreeing to the Privacy Policy during account creation.

Example 3:
Input:

1. "You may notice a new look."
2. "In August 2024, we updated our Privacy at Microsoft websites."
3. "This Privacy Policy is meant to help you understand what information we collect."
Response: 0

Explanation: None of the lines mention the Privacy Policy in the context of sign-up or agreeing to terms.

Example 4:
Input:

1. "Before using this app, you can review datadoghq.com’s privacy policy and terms of service."
2. "By continuing, you agree to our Terms and Conditions."
3. "Using this service constitutes acceptance of our Privacy Policy and Cookie Policy."
Response: 3

Explanation: Line 3 indicates acceptance of the Privacy Policy while using the service.

TEXT TO VERIFY:
{input}

Response:
`;

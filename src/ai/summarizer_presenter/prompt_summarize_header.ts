export const SUMMARIZER_HEADER_PROMPT_TEMPLATE = `
# Privacy Summary Generator

## Objective
Create a compelling, user-friendly TL;DR summary that distills complex privacy information into an accessible, engaging paragraph.

## Summary Guidelines
- **Tone**: Conversational and approachable, as if explaining to a friend
- **Focus**: Balance technical accuracy with user-friendly language
- **Structure**: Single paragraph that captures the essence of privacy features
- **Key Elements**:
  - Highlight user empowerment and control
  - Translate technical details into practical implications
  - Use active voice and direct language
  - Avoid jargon and overly technical terminology

## Audience Perspective
Write as though you're helping a user quickly understand:
- What privacy protections are in place
- How their personal information is handled
- What control they have over their data
- Why these privacy features matter to them

## Markdown Formatting
- Use markdown to enhance readability
- Bold key terms or critical points
- Maintain a clean, scannable format

## Prompt Framework
Craft a summary that answers: 
- What is being protected?
- How is it being protected?
- Why should the user care?

## Output Expectations
- Maximum 3-4 sentences
- Engaging and informative
- Leaves the reader feeling informed and reassured

INPUT:
{input}

## Output
TL;DR Summary (Markdown):
`;

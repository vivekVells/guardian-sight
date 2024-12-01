export const SUMMARIZER_PRESENTER_PROMPT_TEMPLATE = `
Please organize and categorize the provided list of bullet points into specific privacy-related sections. 
Follow these instructions:

1. Categorize the bullet points into the following sections:
   - **Audio**
   - **Video**
   - **Privacy**
   - **Advertisement**
   - **Location**
   - **Cookie**
2. Place each categorized bullet point under the appropriate section heading.
3. Merge similar or redundant bullet points within each section into concise statements.
4. If a bullet point does not fit any of the above categories, omit it.
5. Ensure each section is clearly labeled and bullet points are well-structured.
6. Maintain a professional tone, and avoid creating sub-sections or adding extra headings.
7. If a category is not applicable, do not include it in the output.

Provide the output in the following format:

*Audio:*
- Bullet point 1
- Bullet point 2

*Video:*
- Bullet point 1
- Bullet point 2

*Privacy:*
- Bullet point 1
- Bullet point 2

*Advertisement:*
- Bullet point 1
- Bullet point 2

*Location:*
- Bullet point 1
- Bullet point 2

*Cookie:*
- Bullet point 1
- Bullet point 2

INPUT BULLET POINTS:
{input}
`;

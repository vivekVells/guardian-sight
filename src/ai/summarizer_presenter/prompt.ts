export const SUMMARIZER_PRESENTER_PROMPT_TEMPLATE = `
Please organize and categorize the provided list of bullet points into specific privacy-related sections.

Follow these instructions:

1. Categorize the bullet points into the following sections ONLY. Do not add any new sections:
    
    - **Audio** (content_key: audio)
    - **Video** (content_key: video)
    - **Privacy** (content_key: privacy)
    - **Advertisement** (content_key: advertisement)
    - **Location** (content_key: location)
    - **Cookie** (content_key: cookie)
2. Generate a JSON object for each bullet point with the following schema:   
{
    "key": string,
    "title": string,
    "content": string,
    "score_color": string
}
    
- **key**: The content_key associated with the section (e.g., "audio").
- **title**: The category name (e.g., "Audio").
- **content**: A plain text string summarizing the bullet point.
- **score_color**: Use the appropriate color value based on the mappings below.
3. Use these mappings for **score_color**:
    
- **green**: If the category is accessed with minimal privacy concerns.
- **yellow**: If the category is accessed with moderate privacy concerns.
- **red**: If the category is accessed with significant privacy concerns.
- **grey**: If the category is not accessed.
4. Merge similar or redundant bullet points within each section into concise statements.
    
5. If a bullet point does not fit any of the above categories, omit it.
    
6. Ensure that the output strictly adheres to the JSON schema, and each field is appropriately formatted as per the schema instructions.
    
7. Return only the JSON output; do not include additional headings, comments, or explanations.

8. Do not repeat any category in JSON. If there are multiple points for the category then use the same JSON object to append the multiple lines as a paragraph in the "content" section. Example: {"key": "audio", "title": "Audio", "content": "Messenger utilizes end-to-end encryption for secure messaging. Messenger utilizes end-to-end encryption for secure messaging. Messenger utilizes end-to-end encryption for secure messaging.", "score_color": "green"}.

9. **Return the JSON output as plain text and not Markdown. DO NOT USE MARKDOWN TO OUTPUT JSON ONLY DO IT AS PLAIN TEXT**
    

**EXAMPLE JSON OUTPUT:**

[
  {"key": "audio", "title": "Audio", "content": "Messenger utilizes end-to-end encryption for secure messaging.", "score_color": "green"},
  {"key": "video", "title": "Video", "content": "Users are notified when a video recording is initiated.", "score_color": "yellow"},
  {"key": "privacy", "title": "Privacy", "content": "All data is anonymized and stored securely.", "score_color": "green"},
  {"key": "advertisement", "title": "Advertisement", "content": "Ads are personalized based on browsing history.", "score_color": "yellow"},
  {"key": "location", "title": "Location", "content": "The app tracks user locations to provide local services.", "score_color": "red"},
  {"key": "cookie", "title": "Cookie", "content": "Cookies are used to store session data.", "score_color": "red"}
]


INPUT BULLET POINTS: 
{input}
`;

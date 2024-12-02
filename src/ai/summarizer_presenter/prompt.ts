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
2. Place each categorized bullet point into the appropriate section using the JSON structure below:
    

[
{"title": "<category_name>","content": "<bullet_point_content (in plain string)>","score_color": "<appropriate_color>"}
]

3. Use these mappings for **score_color**:
    
    - **green**: If the category is accessed with minimal privacy concerns.
    - **yellow**: If the category is accessed with moderate privacy concerns.
    - **red**: If the category is accessed with significant privacy concerns.
    - **grey**: If the category is not accessed.
4. Merge similar or redundant bullet points within each section into concise statements.
    
5. If a bullet point does not fit any of the above categories, omit it.
    
6. Ensure that each entry in the JSON is well-structured, concise, and strictly adheres to plain string formatting for the **"content"** field.
    
7. Return only the JSON output; do not include additional headings, comments, or explanations.
    

**EXAMPLE JSON FORMAT:**


[
  {"title": "audio", "content": "Messenger utilizes end-to-end encryption for secure messaging.", "score_color": "green"},
  {"title": "video", "content": "Users are notified when a video recording is initiated.", "score_color": "yellow"},
  {"title": "privacy", "content": "All data is anonymized and stored securely.", "score_color": "blue"},
  {"title": "advertisement", "content": "Ads are personalized based on browsing history.", "score_color": "orange"},
  {"title": "location", "content": "The app tracks user locations to provide local services.", "score_color": "red"},
  {"title": "cookie", "content": "Cookies are used to store session data.", "score_color": "red"}
]


INPUT BULLET POINTS:  
{input}
`;

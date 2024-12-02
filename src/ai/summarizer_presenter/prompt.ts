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
2. Place each categorized bullet point into the appropriate section using the JSON structure below:
    
    
    [
    {"key": "<content_key>", "title": "<category_name>", "content": "<bullet_point_content>", "score_color": "<appropriate_color>"}
    ]

    
3. Use these mappings for **score_color**:
    
    - **green**: If the category is accessed with minimal privacy concerns.
    - **yellow**: If the category is accessed with moderate privacy concerns.
    - **red**: If the category is accessed with significant privacy concerns.
    - **grey**: If the category is not accessed.
4. Merge similar or redundant bullet points within each section into concise statements.
    
5. If a bullet point does not fit any of the above categories, omit it.
    
6. Ensure that each entry in the JSON is well-structured, concise, and uses plain text strings for the **"content"** field.
    
7. Return only the JSON output; do not include additional headings, comments, or explanations.
   
8. <bullet_point_content> should be a minimum of at least 2-3 sentences. If there are more than one bullet points related to category then summarize all of them into one paragraph. 
    

**EXAMPLE JSON FORMAT:**


[
  {"key": "audio", "title": "Audio", "content": "Messenger utilizes end-to-end encryption for secure messaging.", "score_color": "green"},
  {"key": "video", "title": "Video", "content": "Users are notified when a video recording is initiated.", "score_color": "yellow"},
  {"key": "privacy", "title": "Privacy", "content": "All data is anonymized and stored securely.", "score_color": "blue"},
  {"key": "advertisement", "title": "Advertisement", "content": "Ads are personalized based on browsing history.", "score_color": "orange"},
  {"key": "location", "title": "Location", "content": "The app tracks user locations to provide local services.", "score_color": "red"},
  {"key": "cookie", "title": "Cookie", "content": "Cookies are used to store session data.", "score_color": "red"}
]

INPUT BULLET POINTS:  
{input}
`;

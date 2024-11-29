import React, { useEffect } from 'react'; // Import useEffect
import { run_privacy_checker } from '../ai/privacy_checker';
const PRIVACY_CHCEKER_TEXT = "Privacy Statement Cookie Statement Terms of Use Expedia, Inc. is not responsible for content on external Web sites.";

function ContentApp() { // start building your content view here, like any other normal react app
  
  useEffect(() => {
    // Invoke the createAISession method when the component mounts
    run_privacy_checker(PRIVACY_CHCEKER_TEXT, { reuse_session: false })
      .then((response) => {
        console.log('Privacy checker says:', response);
      })
      .catch((error) => {
        console.error('Privacy checker says:', error);
      });
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <>
      <h1>This is my content</h1>
    </>
  )
}

export default ContentApp

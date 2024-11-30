import { useEffect } from 'react'; // Import useEffect
import { run_privacy_checker } from '../ai/privacy_checker';
import { Notyf } from 'notyf'; // Import Notyf
import 'notyf/notyf.min.css'; // Import the Notyf CSS for styling

const PRIVACY_CHCEKER_TEXT = "Privacy Statement Cookie Statement Terms of Use Expedia, Inc. is not responsible for content on external Web sites.";

const ContentApp = () => {
  useEffect(() => {
    // Create a new instance of Notyf for notifications
    const notyf = new Notyf();

    // Invoke the createAISession method when the component mounts
    run_privacy_checker(PRIVACY_CHCEKER_TEXT, { reuse_session: false })
      .then((response) => {
        console.log("Privacy checker says:", response);
        // Show success notification when privacy check is successful
        notyf.success('Privacy check completed successfully!');
      })
      .catch((error) => {
        console.error("Privacy checker says:", error);
        // Show error notification when privacy check fails
        notyf.error('Privacy check failed. Please try again.');
      });
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <>
      <h1>This is my content</h1>
    </>
  );
}

export default ContentApp;

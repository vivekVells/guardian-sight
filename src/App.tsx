import "./App.css";
import guardian_sight_logo from "./assets/icons/gaurdian_sight_logo.png";

import PrivacyInsight from "./component/privacy/PrivacyInsight";

function App() {
  return (
    <div className="popup-container">
      <img src={guardian_sight_logo} />
      <h1 className="text-3xl font-bold">Guardian Sight</h1>
      <a href="https://www.facebook.com/privacy/center">privacy statement</a>
      <PrivacyInsight />
    </div>
  );
}

export default App;

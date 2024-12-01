import "./App.css";
import guardian_sight_logo from "./assets/icons/gaurdian_sight_logo.png";
import Insights from "./component/privacy/Insights";

function App() {
  return (
    <div className="popup-container">
      <img src={guardian_sight_logo} />
      <h1 className="text-3xl font-bold">Guardian Sight</h1>
      <Insights />
    </div>
  );
}

export default App;

import "./App.css";
import ScrollingText from "./ScrollingText";
import EmptyBlock from "./EmptyBlock";
import CircularSlider from "./CircularSlider";

function App() {
  return (
    <div className="App">
      <h1>gsap test</h1>
      <EmptyBlock />
      <ScrollingText text="this is react app for test gsap library this is react app for test gsap library" />
      <EmptyBlock />
      <CircularSlider />
      <EmptyBlock />
    </div>
  );
}

export default App;

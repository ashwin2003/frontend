import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Hero from "./Components/Hero";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="sidebar-hero-container">
        <Sidebar />
        <Hero />
      </div>
    </div>
  );
}

export default App;

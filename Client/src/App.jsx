import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecordVideo from "./Pages/RecordVideo";
import NotFound from "./Pages/NotFound";
import RecordScreen from "./Pages/RecordScreen";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record-video" element={<RecordVideo />} />
        <Route path="/record-screen" element={<RecordScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

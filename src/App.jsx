import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Weather from "./components/Weather";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

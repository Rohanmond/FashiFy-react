import { Route, Routes } from "react-router-dom";

import Mockman from "mockman-js";
import { Nav } from "./components";
import { Home } from "./pages";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/mock-man" element={<Mockman />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import GlobalLayout from "./layouts/GlobalLayout";

function App() {
  return (
    <GlobalLayout>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </GlobalLayout>
  );
}

export default App;

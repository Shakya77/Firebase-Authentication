import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import { routes } from "./routes";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.authentication} element={<Authentication />} />
    </Routes>
  );
}

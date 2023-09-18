import { BrowserRouter, Routes, Route } from "react-router-dom";
import { rootRouter } from "./routes";
import { useMediaQuery } from "react-responsive";
import { UnavailablePage } from "./pages/unavailablePage";

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  return isMobile ? (
    <UnavailablePage />
  ) : (
    <BrowserRouter>
      <Routes>
        {rootRouter.map((v) => (
          <Route key={v.path} path={v.path} element={v.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

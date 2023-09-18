import { MainPage } from "../pages/mainPage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { DevicePage } from "../pages/devicePage";

interface RouterType {
  path: string;
  element: JSX.Element | JSX.Element[];
}

export const rootRouter: RouterType[] = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/device",
    element: <DevicePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];

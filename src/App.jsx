import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/SignUp/SignUpPage";
import CreatorFeed from "./pages/CreatorFeed/CreatorFeed";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StoreProvider } from "./utils/Store";
import WagmiProvider from "./utils/WagmiProvider";
import Redirect from "./pages/Redirect/Redirect";
import Home from "./pages/Home/Home";
import Anon from "./pages/Anon/Anon";
import Discover from "./pages/Discover/Discover";
import SignUpCreatorPage from "./pages/SignUp/SignUpCreatorPage";
import RedirectCreator from "./pages/Redirect/RedirectCreator";
import Dashboard from "./pages/Dashboard/Dashboard";
import CryptsPage from "./pages/CryptsPage/CryptsPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import Chats from "./pages/Chats/Chats";
import PushVideoCall from "./pages/Chats/PushVideoCall";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { OktoProvider, BuildType } from "okto-sdk-react";

const App = () => {
  const OKTO_CLIENT_API_KEY = process.env.REACT_APP_OKTO_CLIENT_API_KEY;
  const [authToken, setAuthToken] = useState(null);

  const handleLogout = () => {
    console.log("Setting auth token to null");
    setAuthToken(null); // Clear the authToken
  };

  // Define router paths and components
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/anon",
      element: <Anon />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/signup",
      element: (
        <SignUpPage
          setAuthToken={setAuthToken}
          authToken={authToken}
          handleLogout={handleLogout}
        />
      ),
    },
    {
      path: "/signupCreator",
      element: (
        <SignUpCreatorPage
          setAuthToken={setAuthToken}
          authToken={authToken}
          handleLogout={handleLogout}
        />
      ),
    },
    {
      path: "/discover",
      element: <Discover />,
    },
    {
      path: "/creator/:id",
      element: <CreatorFeed />,
    },
    {
      path: "/redirect",
      element: <Redirect />,
    },
    {
      path: "/redirectCreator",
      element: <RedirectCreator />,
    },
    {
      path: "/crypts",
      element: <CryptsPage />,
    },
    {
      path: "/chats/:id",
      element: <Chats />,
    },
    {
      path: "/videoCall/:id",
      element: <PushVideoCall />,
    },
  ]);

  // Main App Component

  return (
    <AnonAadhaarProvider _appName="Anon Aadhaar">
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <StoreProvider>
          <WagmiProvider>
            <RouterProvider router={router} />
          </WagmiProvider>
        </StoreProvider>
      </OktoProvider>
    </AnonAadhaarProvider>
  );
};

export default App;

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import NotFoundPage from "./routes/errorPage/NotFoundPage";
import { ThemeProvider } from "../@/components/providers/theme-provider";
import SignInPage from "./routes/auth/SignIn/SignIn";
import SignUpPage from "./routes/auth/SignUp/SignUp";
import InitialModal from "./routes/initial-modal/InitialModal";
import ProfilePage from "./routes/profilePage/ProfilePage";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        
        {/* /test */}
        <Route
          path="/test"
          element={
            <>
              <SignedIn>
                <InitialModal />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        {/* <Route
          path="/user-profile"
          element={
            <>
              <SignedIn>
                <UserProfilePage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        /> */}
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

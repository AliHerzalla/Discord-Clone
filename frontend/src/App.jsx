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
import { useEffect } from "react";
import { cn } from "../@/lib/utils";
import InitialModal from "./routes/initial-modal/InitialModal";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function PublicPage() {
  return (
    <>
      <h1>Public page</h1>
      <a href="/">Go to protected page</a>
    </>
  );
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/public" element={<PublicPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route
          path="/"
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
  useEffect(() => {
    // Add a class to the body element
    // document.body.classList.add(cn("bg-white"));
    // document.body.classList.add(cn("dark:bg-[#313338]"));
    document.body.className = cn("bg-white dark:bg-[#313338]");
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

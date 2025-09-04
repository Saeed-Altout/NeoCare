import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import { AuthLayout } from "@/layouts/auth";
import { SignInPage } from "@/pages/auth/sign-in";
import { SignUpPage } from "@/pages/auth/sign-up";

// Website Pages
import { WebsiteLayout } from "@/layouts/website";
import { HomePage } from "@/pages/website/home";

// Dashboard Pages
import { DashboardLayout } from "@/layouts/dashboard";
import { DashboardPage } from "@/pages/dashboard";
import { JaundiceOverviewPage } from "@/pages/dashboard/jaundice-overview";
import { PatientsPage } from "@/pages/dashboard/patients";
import { SessionsPage } from "@/pages/dashboard/sessions";
import { ArduinoControlPage } from "@/pages/dashboard/arduino-control";

// Not Found Page
import { NotFoundPage } from "@/pages/not-found";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<JaundiceOverviewPage />} />
          <Route path="overview" element={<JaundiceOverviewPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="arduino" element={<ArduinoControlPage />} />
          <Route path="legacy" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

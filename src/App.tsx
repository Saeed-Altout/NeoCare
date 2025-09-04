import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Components
import { AuthGuard } from "@/components/auth-guard";
import { AdminRoute } from "@/components/protected-route";
import { GuestRoute } from "@/components/guest-route";

// Auth Pages
import { AuthLayout } from "@/layouts/auth";
import { SignInPage } from "@/pages/auth/sign-in";
import { SignUpPage } from "@/pages/auth/sign-up";

// Website Pages
import { WebsiteLayout } from "@/layouts/website";
import { HomePage } from "@/pages/website/home";
import { AboutPage } from "@/pages/website/about";
import { FeaturesPage } from "@/pages/website/features";
import { TechnologyPage } from "@/pages/website/technology";

// Dashboard Pages
import { DashboardLayout } from "@/layouts/dashboard";
import { DashboardPage } from "@/pages/dashboard";
import { JaundiceOverviewPage } from "@/pages/dashboard/jaundice-overview";
import { PatientsPage } from "@/pages/dashboard/patients";
import { SessionsPage } from "@/pages/dashboard/sessions";
import SessionDetailsPage from "@/pages/dashboard/session-details";
import { ArduinoControlPage } from "@/pages/dashboard/arduino-control";
import { SettingsPage } from "@/pages/dashboard/settings";
import AccountPage from "@/pages/dashboard/account";
import NotificationsPage from "@/pages/dashboard/notifications";

// Not Found Page
import { NotFoundPage } from "@/pages/not-found";

export default function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="technology" element={<TechnologyPage />} />
          </Route>
          <Route
            path="/auth"
            element={
              <GuestRoute>
                <AuthLayout />
              </GuestRoute>
            }
          >
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <DashboardLayout />
              </AdminRoute>
            }
          >
            <Route index element={<JaundiceOverviewPage />} />
            <Route path="overview" element={<JaundiceOverviewPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route
              path="sessions/:sessionId"
              element={<SessionDetailsPage />}
            />
            <Route path="arduino" element={<ArduinoControlPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="legacy" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

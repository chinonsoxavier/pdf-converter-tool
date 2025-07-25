import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/landing_page";
import SignInPage from "./pages/signin/signin_page";
import SignUpPage from "./pages/signup/signup_page";
import ForgotPasswordPage from "./pages/forgot-password/forgot_password_page";
import { ThemeProvider } from "./components/theme_provider";
import PdfToWordConverter from "./pages/tools/pdf_to_word_converter";
import WordToPdfConverter from "./pages/tools/word_to_pdf_converter";
import DashboardOverviewMainView from "./pages/dashboard/overview/overview_main_view";
import DashboardLayoutView from "./pages/dashboard/dashboard_layout_view";
import DashboardUsersMainView from "./pages/dashboard/users/dashboard_users_main_view";
import DashboardToolsMainView from "./pages/dashboard/tools/dashboard_tools_main_view";
import DashboardSettingsMainView from "./pages/dashboard/settings/dashboard_settings_main_view";
import DashboardContentMainView from "./pages/dashboard/content/dashboard_content_main_view";
import DashboardAnalyticsMainView from "./pages/dashboard/analytics/dashboard_analytics_main_view";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardLayoutView />}>
          <Route index element={<DashboardOverviewMainView />} />
          <Route path="/dashboard/users" element={<DashboardUsersMainView />} />
          <Route path="/dashboard/tools" element={<DashboardToolsMainView />} />
          <Route
            path="/dashboard/settings"
            element={<DashboardSettingsMainView />}
          />
          <Route
            path="/dashboard/content"
            element={<DashboardContentMainView />}
          />
          <Route
            path="/dashboard/analytics"
            element={<DashboardAnalyticsMainView />}
          />
        </Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/pdf_to_word" element={<PdfToWordConverter />} />
        <Route path="/word_to_pdf" element={<WordToPdfConverter />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

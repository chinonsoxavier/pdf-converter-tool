import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/landing_page";
import SignInPage from "./pages/signin/signin_page";
import SignUpPage from "./pages/signup/signup_page";
import ForgotPasswordPage from "./pages/forgot-password/forgot_password_page";
import { ThemeProvider } from "./components/theme_provider";
import PdfToWordConverter from "./pages/tools/pdf_to_word/pdf_to_word_converter";
import WordToPdfConverter from "./pages/tools/word_to_pdf/word_to_pdf_converter";
import DashboardOverviewMainView from "./pages/dashboard/overview/overview_main_view";
import DashboardLayoutView from "./pages/dashboard/dashboard_layout_view";
import DashboardUsersMainView from "./pages/dashboard/users/dashboard_users_main_view";
import DashboardToolsMainView from "./pages/dashboard/tools/dashboard_tools_main_view";
import DashboardSettingsMainView from "./pages/dashboard/settings/dashboard_settings_main_view";
import DashboardContentMainView from "./pages/dashboard/content/dashboard_content_main_view";
import DashboardAnalyticsMainView from "./pages/dashboard/analytics/dashboard_analytics_main_view";
import ScrollManager from "./components/scroll_manager";
import ToolDownloadLayout from "./components/tools/layout_types/tool_download_layout";
import MergePdf from "./pages/tools/merge_pdf/merge_pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// Set workerSrc to the imported worker=
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ScrollManager smoothRestore={true} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* auth routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* end of auth routes */}
        {/* admin routes */}
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
        {/* end of auth routes */}
        {/* tools routes */}
        {/* pfd to word routes */}
        <Route path="/pdf_to_word" element={<PdfToWordConverter />} />
        <Route
          path="/pdf_to_word/download/:id"
          element={
            <ToolDownloadLayout label="PDF file has been converted to WORD" />
          }
        />
        {/* end of pdt to word routes */}

        {/* merge pdf */}
        <Route path="/merge_pdf" element={<MergePdf />} />
        <Route
          path="/merge_pdf/download/:id"
          element={<ToolDownloadLayout label="Pdf files has been merged" />}
        />
        {/* end of merge pdf */}

        {/* split pdf */}
        <Route path="/split_pdf" element={<PdfToWordConverter />} />
        <Route
          path="/split_pdf/download/:id"
          element={<ToolDownloadLayout label="Pdf files has been split" />}
        />
        {/* end of split pdf */}
        {/* word to pdf */}
        <Route path="/word_to_pdf" element={<WordToPdfConverter />} />
        <Route
          path="/word_to_pdf/download/:id"
          element={
            <ToolDownloadLayout label="Word files has been converted to PDF" />
          }
        />
        {/* end of word to pdf */}

        {/* end of split pdf */}
        {/* word to pdf */}
        <Route path="/split_word" element={<WordToPdfConverter />} />
        <Route
          path="/split_pdf/download/:id"
          element={
            <ToolDownloadLayout label="Word files has been converted to PDF" />
          }
        />
        {/* end of word to pdf */}

        {/* end of tools routes */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;

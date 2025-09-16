import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/landing_page";
import SignInPage from "./pages/(auth)/signin/signin_page";
import SignUpPage from "./pages/(auth)/signup/signup_page";
import ForgotPasswordPage from "./pages/(auth)/forgot-password/forgot_password_page";
// import { ThemeProvider } from "./components/theme_provider";
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
import SplitPdf from "./pages/tools/split_pdf/split_pdf";
import CompressPdf from "@/pages/tools/compress_pdf/compress_pdf";
import PdfToJpg from "@/pages/tools/pdf_to_jpg/pdf_to_jpg";
import JpgToPdf from "@/pages/tools/jpg_to_pdf/jpg_to_pdf";
import RotatePdf from "@/pages/tools/rotate_pdf/rotate_pdf";
import OrganisePdf from "./pages/tools/organise_pdf/organise_pdf";
import AppThemeProvider from "./components/theme_provider";
import ExtractPdf from "./pages/tools/extract_pdf/extract_pdf";
import useToolsStore from "./pages/tools/tools_store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AddPdfPageNumber from "./pages/tools/add_pdf_page_number/add_pdf_page_number";
import AddHeaderFooter from "./pages/tools/add_header_footer/add_header_footer";
import PreviewPdf from "./pages/tools/preview_pdf/preview_pdf";
import Terms from "./pages/terms/terms";
import AboutUs from "./pages/about_us/about_us";
import ContactUs from "./pages/contact-us/contact_us";
import {SnackbarProvider} from "notistack";
import ResetPasswordPage from "./pages/(auth)/reset_password/reset_password";
import useAuthStore from "./pages/(auth)/auth_store";
import VerifyEmailPage from "./pages/(auth)/verify_email/verify_email";
import VerifyEmailTokenPage from "./pages/(auth)/verify_email_token/verify_email_token";
import DeletePdfPages from "./pages/tools/delete_pdf_pages/delete_pdf_pages";
import axios from "axios";
import OcrPdf from "./pages/tools/ocr_pdf/ocr_pdf";
import EditPdf from "./pages/tools/edit_pdf/edit_pdf";
const App = () => {

  const location = useLocation();
  const { resetStore } = useToolsStore();
  function EmailVerificationTokenRouteWrapper() {
    const { authStatus, userAuthEmail } = useAuthStore();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const hasLinkQuery = query.has("link");
// alert("has link")
    if (hasLinkQuery || (authStatus === "email sent" || userAuthEmail)) {
      return <VerifyEmailTokenPage />;
    }

    return <Navigate to="/signin" />;
  }


    function EmailVerificationRouteWrapper() {
      const { authStatus, userAuthEmail } = useAuthStore();
      const location = useLocation();
      const query = new URLSearchParams(location.search);
      const hasLinkQuery = query.has("link");
      // alert("has link")
      if (hasLinkQuery || authStatus === "email sent" || userAuthEmail) {
        return <VerifyEmailPage />;
      }

      return <Navigate to="/signin" />;
    }
  
  

  const { resetErrorMsg, user } = useAuthStore();
  useEffect(() => {
    const pingServer = async () => {
      await axios.get('/');
    };
    pingServer();
    resetStore();
    resetErrorMsg({status:''});
  }, [location.pathname]);

  return (
    <AppThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SnackbarProvider />
      <ScrollManager smoothRestore={true} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* auth routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/verify-email"
          element={<EmailVerificationRouteWrapper />}
        />
        <Route
          path="/verify-email/:token"
          element={<EmailVerificationTokenRouteWrapper />}
        />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        {/* end of auth routes */}
        {/* admin routes */}
        <Route
          path="/dashboard"
          element={
            user?.isAdmin ? <DashboardLayoutView /> : <Navigate to="/" />
          }
        >
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

        {/* terma route */}
        <Route path="/terms-and-privacy" element={<Terms />} />
        {/* privacy route */}
        <Route path="privacy" element={<div>Privacy Policy</div>} />
        {/* about route */}
        <Route path="/about-us" element={<AboutUs />} />
        {/* contact route */}
        <Route path="/contact-us" element={<ContactUs />} />
        {/* blog route */}
        <Route path="/blog" element={<div>Blog</div>} />
        {/* end of blog route */}

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
        <Route path="/split_pdf" element={<SplitPdf />} />
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
        {/* compress pdf */}
        <Route path="/compress_pdf" element={<CompressPdf />} />
        <Route
          path="/compress_pdf/download/:id"
          element={<ToolDownloadLayout label="Pdf files has been compressed" />}
        />
        {/* end of compress pdf */}
        {/* pdf to jpg */}
        <Route path="/pdf_to_jpg" element={<PdfToJpg />} />
        <Route
          path="/pdf_to_jpg/download/:id"
          element={
            <ToolDownloadLayout label="Pdf files has been converted to jpg" />
          }
        />
        {/* end of pdf to jpg */}
        {/* jpg to pdf */}
        <Route path="/jpg_to_pdf" element={<JpgToPdf />} />
        <Route
          path="/jpg_to_pdf/download/:id"
          element={
            <ToolDownloadLayout label="Pdf files has been converted to jpg" />
          }
        />
        {/* end of jpg to pdf */}
        {/*rotate pdf pages */}
        <Route path="/rotate_pdf" element={<RotatePdf />} />
        <Route
          path="/rotate_pdf/download/:id"
          element={
            <ToolDownloadLayout label="Pdf files has been rotated successfully" />
          }
        />
        {/* end of rotate pdf pages */}
        {/* organise pages */}
        <Route path="/organise_pdf" element={<OrganisePdf />} />
        <Route
          path="/organise_pdf/download/:id"
          element={
            <ToolDownloadLayout label="Pdf files has been organised successfully" />
          }
        />
        {/* end of organise pages */}

        {/* extract pages */}
        <Route path="/extract_pdf_pages" element={<ExtractPdf />} />
        <Route
          path="/extract_pdf_pages/download/:id"
          element={
            <ToolDownloadLayout label="Pdf pages has been extracted successfully" />
          }
        />
        {/* end of extract pages */}

        {/* delete pages */}
        <Route path="/delete_pdf_pages" element={<DeletePdfPages />} />
        <Route
          path="/delete_pdf_pages/download/:id"
          element={
            <ToolDownloadLayout label="Pdf pages has been deleted successfully" />
          }
        />
        {/* end of delete pages */}

        {/* add pages pages */}
        <Route path="/add_pdf_page_numbers" element={<AddPdfPageNumber />} />
        <Route
          path="/add_pdf_page_numbers/download/:id"
          element={
            <ToolDownloadLayout label="Pdf pages number has been added!" />
          }
        />
        {/* end of add pages pages */}

        {/* add headers/footers pages */}
        <Route path="/add_header_footer" element={<AddHeaderFooter />} />
        <Route
          path="/add_header_footer/download/:id"
          element={
            <ToolDownloadLayout label="Pdf header/footer has been added" />
          }
        />
        {/* end of add headers/footers pages */}

        {/* add headers/footers pages */}
        <Route path="/ocr" element={<OcrPdf />} />
        <Route
          path="/ocr_pdf/download/:id"
          element={
            <ToolDownloadLayout label="Pdf is now selectable" />
          }
        />
        {/* end of add headers/footers pages */}

        {/* preview pages */}
        <Route path="/preview_pdf" element={<PreviewPdf />} />
        {/* end of preview pages */}

        {/* edit pdf */}
        <Route path="/edit_pdf" element={<EditPdf/>} />
        {/* end of edit pdf */}

        {/* end of tools routes */}
      </Routes>
    </AppThemeProvider>
  );
};

export default App;

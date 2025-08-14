import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, NavLink } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="text-2xl font-bold text-blue-600">
              <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-1">
                <span className="bg-gradient-to-r from-primary-foreground to-gray-400 text-transparent bg-clip-text">
                  PDF
                </span>
                <span className="text-red-500 drop-shadow-md">Plug</span>
              </h1>
            </NavLink>
            <NavLink to="/">
              <Button variant="outline">Back to Home</Button>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="sm:text-4xl text-3xl font-bold text-primary-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="sm:text-lg text-secondary-foreground">
            Please read these terms carefully before using our services.
          </p>
        </div>

        <div className="space-y-8">
          {/* Terms of Use */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">
                1. Terms of Use
              </CardTitle>
              <p className="text-sm text-secondary-foreground">
                Last updated: [Insert Date]
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-secondary-foreground mb-4">
                  Welcome to <strong>PDFPlug.com</strong> ("the Website"). By
                  using this website, you agree to the following terms. If you
                  do not agree, please discontinue use immediately.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  1.1 Services Provided
                </h3>
                <p className="text-secondary-foreground mb-2">
                  PDFPlug.com offers online PDF-related tools, including but not
                  limited to file conversion, compression, and merging.
                </p>
                <p className="text-secondary-foreground">
                  We may also feature affiliate links to third-party services
                  and advertisements.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  1.2 User Responsibilities
                </h3>
                <ul className="list-disc list-inside text-secondary-foreground space-y-1">
                  <li>
                    You must only upload files you own or have the legal right
                    to use.
                  </li>
                  <li>
                    You must not use the Website for any illegal or prohibited
                    purpose.
                  </li>
                  <li>
                    You must ensure that any use complies with applicable laws
                    in your jurisdiction.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  1.3 Intellectual Property
                </h3>
                <p className="text-secondary-foreground">
                  All trademarks, logos, and content on this site are the
                  property of PDFPlug.com or respective owners. Unauthorized
                  copying or reproduction is prohibited.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  1.4 Limitation of Liability
                </h3>
                <p className="text-secondary-foreground">
                  We provide services "as is" without warranties. We are not
                  liable for data loss, file corruption, or damages arising from
                  use.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  1.5 Third-Party Services
                </h3>
                <p className="text-secondary-foreground">
                  Some services and ads are provided by third parties. We are
                  not responsible for their actions, policies, or content.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  1.6 Changes to Terms
                </h3>
                <p className="text-secondary-foreground">
                  We may update these terms at any time. Continued use after
                  updates means acceptance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">
                2. Privacy Policy
              </CardTitle>
              <p className="text-sm text-secondary-foreground">
                Last updated: [Insert Date]
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  2.1 Information We Collect
                </h3>
                <ul className="list-disc list-inside text-secondary-foreground space-y-2">
                  <li>
                    <strong>Non-personal data:</strong> Browser type, IP
                    address, device type, and usage statistics.
                  </li>
                  <li>
                    <strong>Personal data</strong> (only if voluntarily
                    provided): Email for support or newsletter.
                  </li>
                  <li>
                    <strong>File data:</strong> Uploaded files are processed
                    temporarily and deleted automatically within [X hours].
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  2.2 How We Use Data
                </h3>
                <ul className="list-disc list-inside text-secondary-foreground space-y-1">
                  <li>To operate and improve our services.</li>
                  <li>To comply with legal obligations.</li>
                  <li>To display personalized ads through Google AdSense.</li>
                  <li>
                    To recommend affiliate products relevant to user needs.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  2.3 Cookies & Tracking
                </h3>
                <p className="text-secondary-foreground">
                  We use cookies for analytics, security, and personalized
                  advertising. Users can disable cookies in browser settings.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  2.4 Data Security
                </h3>
                <p className="text-secondary-foreground">
                  We use SSL encryption and secure hosting to protect user
                  information. However, no online service is 100% secure.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  2.5 Third-Party Links & Ads
                </h3>
                <p className="text-secondary-foreground">
                  Affiliate and ad links may lead to third-party websites with
                  their own privacy policies.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  2.7 Contact
                </h3>
                <p className="text-secondary-foreground">
                  For privacy concerns, contact:{" "}
                  <a
                    href="mailto:support@pdfplug.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@pdfplug.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">
                3. Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  General Disclaimer
                </h3>
                <p className="text-secondary-foreground">
                  PDFPlug.com provides tools and information for general use. We
                  make no guarantees regarding the accuracy, completeness, or
                  reliability of services.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  Affiliate Disclaimer
                </h3>
                <p className="text-secondary-foreground">
                  Some links are affiliate links, meaning we may earn a
                  commission if you make a purchase at no extra cost to you.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  Advertising Disclaimer
                </h3>
                <p className="text-secondary-foreground">
                  We display ads from third-party networks like Google AdSense.
                  Ad content is the responsibility of the advertiser.
                </p>
              </div>

              <div>
                <h3 className="sm:text-lg font-semibold text-primary-foreground mb-3">
                  File Handling Disclaimer
                </h3>
                <p className="text-secondary-foreground">
                  Uploaded files are processed automatically and deleted within
                  [X hours]. We are not responsible for any data loss, breach,
                  or damage from uploaded content.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-secondary-foreground mb-4">
            If you have any questions about these terms, please contact us at{" "}
            <a
              href="mailto:support@pdfplug.com"
              className="text-blue-600 hover:underline"
            >
              support@pdfplug.com
            </a>
          </p>
          <Link to="/">
            <Button>Return to PDFPlug.com</Button>
          </Link>
        </div>
          </main>
          
          {/* footer */}
          <Footer/>
    </div>
  );
}

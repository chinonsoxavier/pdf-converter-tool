import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Smartphone, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            About PDFPlug.com
          </h1>
          <p className="sm:text-xl text-lg text-secondary-foreground max-w-2xl mx-auto">
            Your Free & Secure Online PDF Tools
          </p>
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">
              Welcome to PDFPlug.com
            </CardTitle>
            <CardDescription className="text-lg">
              The all-in-one platform for free and premium PDF tools trusted by
              users worldwide
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-secondary-foreground leading-relaxed">
              Our goal is to make{" "}
              <strong>PDF management simple, fast, and secure</strong> for
              everyone — whether you're a student, business professional, or
              casual user.
            </p>

            <div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-4">
                Complete Range of Online PDF Solutions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">
                      PDF
                    </Badge>
                    <div>
                      <h4 className="font-medium text-primary-foreground">
                        PDF Converter
                      </h4>
                      <p className="text-sm text-secondary-foreground">
                        Convert PDF to Word, Excel, PowerPoint, JPG, and more
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">
                      EDIT
                    </Badge>
                    <div>
                      <h4 className="font-medium text-primary-foreground">PDF Editor</h4>
                      <p className="text-sm text-secondary-foreground">
                        Edit text, add images, and make changes directly to your
                        PDFs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">
                      SIZE
                    </Badge>
                    <div>
                      <h4 className="font-medium text-primary-foreground">
                        PDF Compressor
                      </h4>
                      <p className="text-sm text-secondary-foreground">
                        Reduce file size while maintaining quality
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">
                      MERGE
                    </Badge>
                    <div>
                      <h4 className="font-medium text-primary-foreground">
                        PDF Merger & Splitter
                      </h4>
                      <p className="text-sm text-secondary-foreground">
                        Combine multiple files or split large PDFs instantly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary" className="mt-1">
                      SECURE
                    </Badge>
                    <div>
                      <h4 className="font-medium text-primary-foreground">
                        PDF Security Tools
                      </h4>
                      <p className="text-sm text-secondary-foreground">
                        Add passwords, watermark files, and protect your
                        documents
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary p-6 rounded-lg border border">
              <p className="text-secondary-foreground leading-relaxed">
                At <strong>PDFPlug.com</strong>, many of our tools are{" "}
                <strong>completely free</strong> and can be used without
                registration. For advanced features and unlimited usage, we
                offer <strong>affordable premium plans</strong> designed to give
                you even more power and flexibility.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Why Different Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">
              Why PDFPlug.com is Different
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-2">
                    Free & Accessible
                  </h4>
                  <p className="text-secondary-foreground">
                    Use our PDF tools anytime, anywhere, with no installation
                    required
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-2">
                    Mobile-Friendly
                  </h4>
                  <p className="text-secondary-foreground">
                    Works perfectly on desktop, tablet, and smartphone
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-2">
                    Privacy First
                  </h4>
                  <p className="text-secondary-foreground">
                    Files are processed securely and automatically deleted after
                    use
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-2">
                    Global Reach
                  </h4>
                  <p className="text-secondary-foreground">
                    Available to users in all countries, in multiple languages
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-lg text-secondary-foreground leading-relaxed">
                We believe everyone should have{" "}
                <strong>easy access to professional PDF tools</strong> without
                high costs or complicated software. That's why we keep most
                features free while providing optional premium upgrades for
                power users.
              </p>
              <p className="text-secondary-foreground">
                Whether you need to <strong>convert PDFs online</strong>,{" "}
                <strong>compress large files</strong>, or{" "}
                <strong>edit documents securely</strong>, PDFPlug.com is here to
                make your work easier.
              </p>
              <div className="pt-4">
                <Badge variant="outline" className="text-lg whitespace-break-spaces px-4 py-2">
                  PDFPlug.com – Free Online PDF Tools You Can Trust
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
          </div>
          
          {/* footer */}
          <Footer/>
    </div>
  );
}

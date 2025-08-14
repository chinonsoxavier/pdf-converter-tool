import { useState, useCallback } from "react";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import Footer from "@/components/layout/footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContainerLayout from "@/components/layout/container_layout";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async () => {
    //   e.preventDefault();
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

         await response.json();
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } catch (err) {
        // setError(err.message);
        console.error("Contact form error:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const isFormValid = formData.name && formData.email && formData.message;

  return (
        <div className="min-h-screen bg-secondary">
      <ContainerLayout className="flex-col px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-secondary-foreground max-w-2xl mx-auto">
            Have a question or want to get in touch? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-primary rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-primary-foreground mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    // onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    // onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                //   onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

             {/* Success Message */}
              {success && (
                <div className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Thank you! Your message has been sent successfully. We'll
                    get back to you soon.
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-primary rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-primary-foreground mb-6">
                Get in touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-foreground">Email</h3>
                    <p className="text-secondary-foreground">hello@yourcompany.com</p>
                    <p className="text-sm text-secondary-foreground mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-foreground">Phone</h3>
                    <p className="text-secondary-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-secondary-foreground mt-1">
                      Mon-Fri 9am-6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-foreground">Office</h3>
                    <p className="text-secondary-foreground">
                      123 Business Street
                      <br />
                      Suite 100
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-primary rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-primary-foreground mb-6">
                Quick Questions?
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-primary-foreground mb-2">
                    How quickly do you respond?
                  </h3>
                  <p className="text-sm text-secondary-foreground">
                    We typically respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-primary-foreground mb-2">
                    What information should I include?
                  </h3>
                  <p className="text-sm text-secondary-foreground">
                    Please provide as much detail as possible about your inquiry
                    to help us assist you better.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-primary-foreground mb-2">
                    Do you offer phone support?
                  </h3>
                  <p className="text-sm text-secondary-foreground">
                    Yes! Call us during business hours or send us a message to
                    schedule a call.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
          </ContainerLayout>
          <Footer/>
    </div>
  );
}

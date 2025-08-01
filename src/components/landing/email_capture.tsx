import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useState } from "react";
import ContainerLayout from "../layout/container_layout";
import { motion } from "motion/react";

export const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate email capture
  
  };

     const variants1 = {
       inactive: {
         y: 110,
         opacity: 0,
       },
       active: {
         y: 0,
         opacity: 1,
         transition: { duration: 1.5 },
       },
     };

    return (
      <ContainerLayout>
        <motion.div
          variants={variants1}
          initial={"inactive"}
          whileInView={"active"}
          viewport={{ once: true }}
          className="w-full mb-12 sm:mb-20"
        >
          <Card className="p-6 mt-12 sm:mt-20 mx-auto bg-secondary w-full">
            <div className="flex flex-col md:flex-row items-center justify-between  gap-4">
              <div className="flex items-start w-full gap-3">
                <div className="w-10 h-10 min-w-10 bg-accent rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Stay Updated</h3>
                  <p className="text-muted-foreground text-sm">
                    Get PDF tips, tool updates, and exclusive features
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 w-full md:w-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="md:w-64 border-muted-foreground"
                  required
                />
                <Button
                  size="sm"
                  type="submit"
                  variant="default"
                  disabled={isSubmitting}
                  className="shrink-0"
                >
                  {isSubmitting ? "Adding..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>
      </ContainerLayout>
    );
};

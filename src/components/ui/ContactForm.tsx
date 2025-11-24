import React, { useState } from "react";
import {
  HeroUIProvider,
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider
} from "@heroui/react";

interface ContactFormProps {
  className?: string;
}

function ContactFormContent({ className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert("Message sent! We'll get back to you as soon as possible.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader className="flex flex-col items-start px-6 pt-6 pb-0">
        <h2 className="text-2xl font-bold">Send us a message</h2>
        <p className="text-sm text-default-500 mt-2">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </CardHeader>
      <Divider className="my-4" />
      <CardBody className="px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              variant="bordered"
              isRequired
              classNames={{
                label: "text-sm font-medium",
                input: "text-base",
              }}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              variant="bordered"
              isRequired
              classNames={{
                label: "text-sm font-medium",
                input: "text-base",
              }}
            />
          </div>
          
          <Input
            label="Subject"
            placeholder="What's this about?"
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            variant="bordered"
            isRequired
            classNames={{
              label: "text-sm font-medium",
              input: "text-base",
            }}
          />
          
          <Textarea
            label="Message"
            placeholder="Tell us more about your inquiry..."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            variant="bordered"
            isRequired
            minRows={5}
            classNames={{
              label: "text-sm font-medium",
              input: "text-base",
            }}
          />
          
          <Button
            type="submit"
            color="primary"
            size="lg"
            isLoading={isSubmitting}
            isDisabled={!isFormValid}
            className="w-full md:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <HeroUIProvider>
      <ContactFormContent {...props} />
    </HeroUIProvider>
  );
}
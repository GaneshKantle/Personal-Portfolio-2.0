import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { isValidEmail } from "../lib/utils";
import { useToast } from "../hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmailForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      toast({
        title: "Valid email is required",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Message is required",
        description: "Please enter your message",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const validateWhatsAppForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Message is required",
        description: "Please enter your message",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSendEmail = async () => {
    if (!validateEmailForm()) return;

    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send an email via API
      // For this demo, we'll open the mail client
      const mailtoLink = `mailto:ganeshkantle@gmail.com?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}`;
      window.open(mailtoLink);
      
      toast({
        title: "Email client opened",
        description: "Your message has been prepared in your default email client.",
      });
    } catch (error) {
      toast({
        title: "Error sending email",
        description: "There was an error preparing your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsApp = () => {
    if (!validateWhatsAppForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would put your actual WhatsApp number here
      const whatsappNumber = '8861435167';
      const whatsappText = `Hi, I'm ${formData.name}. ${formData.message}`;
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappLink);
      
      toast({
        title: "WhatsApp opened",
        description: "Your message has been prepared in WhatsApp.",
      });
    } catch (error) {
      toast({
        title: "Error opening WhatsApp",
        description: "There was an error preparing your WhatsApp message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Section Separator */}
      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <div className="mx-3 sm:mx-4 w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>
        </div>
      </div>
      
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              Get In <span className="text-primary">Touch</span>
            </motion.h2>
            <motion.div
              className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            />
            <motion.p
              className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Hey Human feel free to reach me!.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              className="relative z-10 bg-card p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-border"
              initial={{ opacity: 0, x: -60, rotate: -1 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Send me a message</h3>
              
              <form>
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="name" className="block text-muted-foreground mb-2 font-medium text-sm sm:text-base">Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-card text-foreground border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all duration-300 ease-in-out text-sm sm:text-base" 
                    placeholder="Your name" 
                  />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="email" className="block text-muted-foreground mb-2 font-medium text-sm sm:text-base">Email</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-card text-foreground border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all duration-300 ease-in-out text-sm sm:text-base" 
                    placeholder="Your email" 
                  />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="message" className="block text-muted-foreground mb-2 font-medium text-sm sm:text-base">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5} 
                    className="w-full bg-card text-foreground border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all duration-300 ease-in-out text-sm sm:text-base" 
                    placeholder="Your message" 
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSendEmail}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
                  >
                    <i className="fas fa-envelope mr-1 sm:mr-2"></i> Send Email
                  </Button>
                  
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSendWhatsApp}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
                  >
                    <i className="fab fa-whatsapp mr-1 sm:mr-2"></i> WhatsApp
                  </Button>
                </div>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              className="lg:pl-8 xl:pl-12"
              initial={{ opacity: 0, x: 60, rotate: 1 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Contact Information</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2.5 sm:p-3 rounded-full text-primary mr-3 sm:mr-4 border border-primary/20">
                      <i className="fas fa-envelope text-sm sm:text-base"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground text-sm sm:text-base">Email</h4>
                      <p className="text-muted-foreground text-sm sm:text-base">ganeshkantle@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2.5 sm:p-3 rounded-full text-primary mr-3 sm:mr-4 border border-primary/20">
                      <i className="fas fa-map-marker-alt text-sm sm:text-base"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground text-sm sm:text-base">Location</h4>
                      <p className="text-muted-foreground text-sm sm:text-base">Bangalore, India</p>
                    </div>
                  </div>
             
                </div>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">Let's build something amazing together</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  I'm always interested in hearing about new projects and opportunities. Whether you need a web application, smart contract development, or technical consultation, I'm here to help.
                </p>
                <div className="text-xs sm:text-sm text-primary">
                  <span className="block mb-1"><span className="text-muted-foreground">{'>'}</span> Currently available for freelance projects</span>
                  <span className="block"><span className="text-muted-foreground">{'>'}</span> Open to full time work opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

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
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-3 sm:mx-4 w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>
      
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              Get In <span className="text-blue-600">Touch</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] px-4">
              Hey Human feel free to reach me!.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div 
              className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Send me a message</h3>
              
              <form>
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="name" className="block text-gray-600 mb-2 font-medium text-sm sm:text-base">Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-sm sm:text-base" 
                    placeholder="Your name" 
                  />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="email" className="block text-gray-600 mb-2 font-medium text-sm sm:text-base">Email</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-sm sm:text-base" 
                    placeholder="Your email" 
                  />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label htmlFor="message" className="block text-gray-600 mb-2 font-medium text-sm sm:text-base">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5} 
                    className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-sm sm:text-base" 
                    placeholder="Your message" 
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSendEmail}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
                  >
                    <i className="fas fa-envelope mr-1 sm:mr-2"></i> Send Email
                  </Button>
                  
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSendWhatsApp}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
                  >
                    <i className="fas fa-whatsapp mr-1 sm:mr-2"></i> WhatsApp
                  </Button>
                </div>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              className="lg:pl-8 xl:pl-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Contact Information</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2.5 sm:p-3 rounded-full text-blue-600 mr-3 sm:mr-4 border border-blue-200">
                      <i className="fas fa-envelope text-sm sm:text-base"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-900 text-sm sm:text-base">Email</h4>
                      <p className="text-gray-600 text-sm sm:text-base">ganeshkantle@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2.5 sm:p-3 rounded-full text-blue-600 mr-3 sm:mr-4 border border-blue-200">
                      <i className="fas fa-map-marker-alt text-sm sm:text-base"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-900 text-sm sm:text-base">Location</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Karnataka, India</p>
                    </div>
                  </div>
             
                </div>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Let's build something amazing together</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  I'm always interested in hearing about new projects and opportunities. Whether you need a web application, smart contract development, or technical consultation, I'm here to help.
                </p>
                <div className="font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] text-xs sm:text-sm text-blue-600">
                  <span className="block mb-1"><span className="text-gray-500">{'>'}</span> Currently available for freelance projects</span>
                  <span className="block"><span className="text-gray-500">{'>'}</span> Open to remote work opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
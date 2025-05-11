import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isValidEmail } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const socialProfiles = [
  { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "#" },
  { name: "GitHub", icon: "fab fa-github", url: "#" },
  { name: "Twitter", icon: "fab fa-twitter", url: "#" },
  { name: "Medium", icon: "fab fa-medium", url: "#" },
];

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

  const validateForm = () => {
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

  const handleSendEmail = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send an email via API
      // For this demo, we'll open the mail client
      const mailtoLink = `mailto:contact@yourname.dev?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}`;
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
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would put your actual WhatsApp number here
      const whatsappNumber = '1234567890';
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
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out to me through any of these channels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            className="bg-background p-6 sm:p-8 rounded-xl shadow-lg border border-border"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-display">Send me a message</h3>
            
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-muted-foreground mb-2">Name</label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-card text-foreground border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Your name" 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-muted-foreground mb-2">Email</label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-card text-foreground border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Your email" 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-muted-foreground mb-2">Message</label>
                <Textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5} 
                  className="w-full bg-card text-foreground border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Your message" 
                />
              </div>
              
              <div className="flex gap-4">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSendEmail}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <i className="fas fa-envelope mr-2"></i> Send Email
                </Button>
                
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSendWhatsApp}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <i className="fab fa-whatsapp mr-2"></i> WhatsApp
                </Button>
              </div>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            className="lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 font-display">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-full text-primary mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-muted-foreground">contact@yourname.dev</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-full text-primary mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Location</h4>
                    <p className="text-muted-foreground">San Francisco, California</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-full text-primary mr-4">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Social Profiles</h4>
                    <div className="flex space-x-3 mt-2">
                      {socialProfiles.map((profile, index) => (
                        <motion.a 
                          key={index}
                          href={profile.url} 
                          className="bg-card p-2 rounded-full hover:bg-primary/20 transition-colors"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className={profile.icon}></i>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 font-display">Let's build something amazing together</h3>
              <p className="text-muted-foreground mb-6">
                I'm always interested in hearing about new projects and opportunities. Whether you need a web application, smart contract development, or technical consultation, I'm here to help.
              </p>
              <div className="font-mono text-sm text-primary">
                <span className="block"><span className="text-muted-foreground">{'>'}</span> Currently available for freelance projects</span>
                <span className="block"><span className="text-muted-foreground">{'>'}</span> Open to remote work opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

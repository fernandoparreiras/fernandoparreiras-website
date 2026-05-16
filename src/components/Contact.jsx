import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Youtube, MessageCircle } from 'lucide-react';

const Contact = () => {
  const line1Links = [
    { 
      icon: Mail, 
      label: 'Email', 
      url: 'mailto:fernando@fernandoparreiras.com.br' 
    },
    { 
      icon: MessageCircle, 
      label: 'WhatsApp', 
      url: 'https://wa.me/5531992789574' 
    }
  ];

  const line2Links = [
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/fernandoparreiras/' 
    },
    { 
      icon: Instagram, 
      label: 'Instagram', 
      url: 'https://www.instagram.com/parreiras.fernando/' 
    },
    { 
      icon: Youtube, 
      label: 'YouTube', 
      url: 'https://www.youtube.com/@sertalks' 
    }
  ];

  const Button = ({ link, index, delayOffset = 0 }) => (
    <motion.a
      key={link.label}
      href={link.url}
      target={link.label === 'Email' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index + delayOffset) * 0.1 }}
      className="flex items-center gap-3 bg-[#2a2b2d] border border-white/10 px-8 py-4 hover:border-[#d8ff57]/50 hover:bg-[#d8ff57]/10 transition-all duration-300 group cursor-pointer rounded-sm min-w-[200px] justify-center"
    >
      <link.icon className="w-5 h-5 text-[#d8ff57] group-hover:scale-110 transition-transform duration-300" />
      <span className="font-medium text-white">{link.label}</span>
    </motion.a>
  );

  return (
    <section id="contact" className="py-24 bg-black border-t border-[#d8ff57]/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Vamos <span className="text-[#d8ff57]">conversar?</span>
          </h2>
          
          <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
            Estou sempre aberto a conversas significativas sobre negócios, liderança e transformação. 
            Entre em contato através dos canais abaixo.
          </p>

          <div className="flex flex-col items-center gap-4 mb-12">
            {/* Line 1: Email & WhatsApp */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {line1Links.map((link, index) => (
                <Button key={link.label} link={link} index={index} delayOffset={0} />
              ))}
            </div>

            {/* Line 2: Social Media */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {line2Links.map((link, index) => (
                <Button key={link.label} link={link} index={index} delayOffset={2} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/50 text-sm"
          >
            <p>Respondo pessoalmente a todas as mensagens relevantes.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
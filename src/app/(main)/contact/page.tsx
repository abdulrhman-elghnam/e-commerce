"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Truck, 
  RefreshCcw,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is your delivery time frame?",
    answer: "Orders placed before 2:00 PM are typically delivered same-day or next-day across major metropolitan areas. Standard delivery takes 1-3 business days nationwide.",
  },
  {
    question: "How can I return an item?",
    answer: "We offer a hassle-free 14-day return policy for unopened and fresh items. Contact our customer support team or initiate a return from your account dashboard with your order ID.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, MasterCard) through our secure Stripe-powered gateway, as well as Cash on Delivery (COD) for supported delivery zones.",
  },
  {
    question: "Is there a minimum order amount for free delivery?",
    answer: "Yes! All orders over 500 EGP qualify for 100% Free Shipping nationwide. For orders under 500 EGP, a flat nominal delivery fee applies.",
  },
  {
    question: "How do I track my order status?",
    answer: "Once your order is placed, you can track its live progress anytime from the 'My Orders' section in your account dashboard. You'll also receive updates via email.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Thank you! Your message has been sent. Our team will contact you within 24 hours.");
      setName("");
      setEmail("");
      setSubject("");
      setOrderId("");
      setMessage("");
    } catch {
      toast.error("Failed to send message. Please try again or reach us by phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] pb-24 font-['Exo']">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#052e16] via-[#166534] to-[#15803d] text-white pt-12 pb-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="app-container relative z-10">
          <nav className="flex items-center gap-2 text-sm text-emerald-200 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact & Support</span>
          </nav>
          
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-sm">
              <MessageSquare size={14} /> Here to help 24/7
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              We&apos;re always ready to help you.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              Have a question about an order, shipping, or need assistance? Reach out to our dedicated support specialists anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="app-container -mt-10 relative z-20">
        {/* Support Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Phone Support</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mon–Sun from 8am to 10pm</p>
            </div>
            <Link href="tel:+18001234567" className="text-sm font-semibold text-[#16A34A] hover:underline mt-auto">
              +1 (800) 123-4567
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Email Us</h3>
              <p className="text-xs text-slate-500 mt-0.5">We reply within 4 hours</p>
            </div>
            <Link href="mailto:support@freshcart.com" className="text-sm font-semibold text-[#16A34A] hover:underline mt-auto">
              support@freshcart.com
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Store Location</h3>
              <p className="text-xs text-slate-500 mt-0.5">Cairo & Giza distribution hubs</p>
            </div>
            <span className="text-sm font-medium text-slate-700 mt-auto">
              123 Commerce St, Cairo, Egypt
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Working Hours</h3>
              <p className="text-xs text-slate-500 mt-0.5">Open every day of the week</p>
            </div>
            <span className="text-sm font-semibold text-emerald-800 mt-auto">
              24/7 Online Store
            </span>
          </div>
        </div>

        {/* Main Grid: Form + FAQs */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
              <p className="text-sm text-slate-500 mt-1">
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Subject
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Order inquiry, refund..."
                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Order ID (Optional)
                  </label>
                  <Input
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. #12345"
                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  How can we help? <span className="text-rose-500">*</span>
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question or feedback in detail..."
                  rows={5}
                  required
                  className="rounded-xl border-slate-200 focus-visible:ring-emerald-500 resize-none text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold rounded-xl gap-2 shadow-sm transition-all mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* FAQs & Trust Badges */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-[#16A34A]">
                <HelpCircle size={20} />
                <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
              </div>

              <div className="divide-y divide-slate-100">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={faq.question} className="py-3.5 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-3 text-left font-semibold text-slate-800 hover:text-[#16A34A] transition-colors text-sm"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp size={16} className="text-[#16A34A] shrink-0" />
                        ) : (
                          <ChevronDown size={16} className="text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="bg-[#f0fdf4] rounded-2xl p-6 border border-emerald-200 flex flex-col gap-3">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="text-[#16A34A]" size={18} /> FreshCart Guarantee
              </h3>
              <p className="text-xs text-emerald-900/80 leading-relaxed">
                We are committed to delivering the freshest grocery items and top brands right to your door with 100% money-back security.
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-emerald-200/60 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="text-[#16A34A]" size={16} />
                  <span className="text-[11px] font-semibold text-emerald-950">Fast Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCcw className="text-[#16A34A]" size={16} />
                  <span className="text-[11px] font-semibold text-emerald-950">14-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="text-[#16A34A]" size={16} />
                  <span className="text-[11px] font-semibold text-emerald-950">Secure Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoadingSpinner = () => (
  <svg
    className="inline-block w-5 h-5 ml-2 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
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
);

/**
 * Sanitize environment variable values by trimming whitespace
 * and stripping accidental surrounding quotes.
 */
const sanitize = (val) => {
  if (typeof val !== "string") return val;
  let clean = val.trim();
  if (
    (clean.startsWith('"') && clean.endsWith('"')) ||
    (clean.startsWith("'") && clean.endsWith("'"))
  ) {
    clean = clean.substring(1, clean.length - 1);
  }
  return clean.trim();
};

/**
 * Get sanitized EmailJS keys from environment variables.
 * Supports both VITE_EMAILJS_* and VITE_APP_EMAILJS_* prefixes.
 */
const getEmailJSKeys = () => {
  const v1_service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const v1_template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const v1_public = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const v2_service = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
  const v2_template = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
  const v2_public = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

  return {
    serviceId: sanitize(v2_service || v1_service),
    templateId: sanitize(v2_template || v1_template),
    publicKey: sanitize(v2_public || v1_public),
  };
};

/**
 * Direct fetch fallback — bypasses the SDK entirely and calls
 * the EmailJS REST API using the browser fetch() API.
 */
const sendEmailDirectFetch = async (serviceId, templateId, publicKey, templateParams) => {
  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: templateParams,
  };

  console.log("📡 [Fallback] Sending via direct fetch to EmailJS API...");

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  if (response.ok) {
    return { status: response.status, text };
  }

  const error = new Error(`EmailJS direct fetch failed: ${response.status} ${text}`);
  error.status = response.status;
  error.text = text;
  throw error;
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Initialize EmailJS SDK on mount
  useEffect(() => {
    const { serviceId, templateId, publicKey } = getEmailJSKeys();

    console.log("EmailJS Environment Variable Configuration:");
    console.log("SERVICE_ID exists:", !!serviceId, "| length:", serviceId?.length);
    console.log("TEMPLATE_ID exists:", !!templateId, "| length:", templateId?.length);
    console.log("PUBLIC_KEY exists:", !!publicKey, "| length:", publicKey?.length);

    const missing = [];
    if (!serviceId) missing.push("SERVICE_ID");
    if (!templateId) missing.push("TEMPLATE_ID");
    if (!publicKey) missing.push("PUBLIC_KEY");

    if (missing.length > 0) {
      console.warn(
        `⚠️ EmailJS configuration is incomplete. Missing: ${missing.join(
          ", "
        )}. Please configure them as VITE_EMAILJS_* or VITE_APP_EMAILJS_* environment variables.`
      );
    } else {
      console.log("✅ EmailJS configuration loaded successfully.");
      try {
        // v4 SDK uses object-based init
        emailjs.init({
          publicKey: publicKey,
        });
        console.log("🔑 EmailJS SDK v4 initialized successfully.");
      } catch (err) {
        console.error("❌ Failed to initialize EmailJS SDK:", err);
      }
    }
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    setStatusMessage(null);

    const { serviceId, templateId, publicKey } = getEmailJSKeys();

    console.log("📧 EmailJS Submission Config Check:");
    console.log("  SERVICE_ID:", serviceId ? `${serviceId.substring(0, 8)}...` : "MISSING");
    console.log("  TEMPLATE_ID:", templateId ? `${templateId.substring(0, 9)}...` : "MISSING");
    console.log("  PUBLIC_KEY:", publicKey ? `${publicKey.substring(0, 5)}...` : "MISSING");

    if (!serviceId || !templateId || !publicKey) {
      const missing = [];
      if (!serviceId) missing.push("SERVICE_ID");
      if (!templateId) missing.push("TEMPLATE_ID");
      if (!publicKey) missing.push("PUBLIC_KEY");

      console.error("❌ EmailJS submission failed — missing:", missing.join(", "));
      setStatusMessage({
        type: "error",
        text: "❌ Contact form is not configured. Please try again later.",
      });
      setLoading(false);
      return;
    }

    const templateParams = {
      from_name: form.name,
      to_name: "Ravi Ranjan Kumar",
      from_email: form.email,
      to_email: "raviranjan.cse2003@gmail.com",
      message: form.message,
    };

    try {
      // Attempt 1: Use the EmailJS SDK (v4 — object-based options)
      console.log("📡 [SDK] Attempting to send via EmailJS SDK v4...");
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey: publicKey,
        }
      );

      console.log("✅ [SDK] Email sent successfully:", response.status, response.text);
      setLoading(false);
      setStatusMessage({
        type: "success",
        text: "✅ Thanks for reaching out! Your message has been sent successfully. I'll get back to you as soon as possible.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (sdkError) {
      console.error("❌ [SDK] EmailJS SDK send failed:");
      console.error("  Status:", sdkError?.status);
      console.error("  Text:", sdkError?.text);
      console.error("  Message:", sdkError?.message);
      console.error("  Full error:", sdkError);

      // Attempt 2: Direct fetch fallback
      try {
        console.log("🔄 [Fallback] SDK failed, trying direct fetch...");
        const fallbackResponse = await sendEmailDirectFetch(
          serviceId,
          templateId,
          publicKey,
          templateParams
        );

        console.log("✅ [Fallback] Email sent successfully:", fallbackResponse.status, fallbackResponse.text);
        setLoading(false);
        setStatusMessage({
          type: "success",
          text: "✅ Thanks for reaching out! Your message has been sent successfully. I'll get back to you as soon as possible.",
        });
        setForm({ name: "", email: "", message: "" });
      } catch (fetchError) {
        console.error("❌ [Fallback] Direct fetch also failed:");
        console.error("  Status:", fetchError?.status);
        console.error("  Text:", fetchError?.text);
        console.error("  Message:", fetchError?.message);
        console.error("  Full error:", fetchError);
        setLoading(false);
        setStatusMessage({
          type: "error",
          text: "❌ Something went wrong. Please try again later.",
        });
      }
    }
  };

  return (
    <div
      className={`xl:mt-6 flex xl:flex-row flex-col-reverse gap-8 items-stretch overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-6 rounded-2xl flex flex-col justify-center'
      >
        <p className="text-[13px] text-secondary uppercase tracking-wider">Get in touch</p>
        <h3 className="text-white font-black md:text-[40px] sm:text-[34px] text-[28px] leading-tight mt-1">
          Let's Build Something Together 🚀
        </h3>
        <p className='mt-1.5 text-secondary text-[14px] leading-relaxed'>
          Have a project, internship opportunity, or just want to say hello? Reach out today!
        </p>

        {statusMessage && (
          <div
            className={`mt-3 p-3 rounded-lg text-[13px] font-medium status-message-animate ${
              statusMessage.type === "success"
                ? "bg-green-900/30 text-green-300 border border-green-700/50"
                : "bg-red-900/30 text-red-300 border border-red-700/50"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-5 flex flex-col gap-4'
        >
          <label className='flex flex-col'>
            <span className='text-white text-[14px] font-medium mb-1.5'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className={`bg-tertiary py-3 px-5 placeholder:text-secondary text-white text-[14px] rounded-lg outline-none font-medium input-focus-ring h-[48px] ${
                errors.name ? "border border-red-500" : "border-none"
              }`}
            />
            {errors.name && (
              <span className='text-red-400 text-[12px] mt-1'>{errors.name}</span>
            )}
          </label>
          <label className='flex flex-col'>
            <span className='text-white text-[14px] font-medium mb-1.5'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className={`bg-tertiary py-3 px-5 placeholder:text-secondary text-white text-[14px] rounded-lg outline-none font-medium input-focus-ring h-[48px] ${
                errors.email ? "border border-red-500" : "border-none"
              }`}
            />
            {errors.email && (
              <span className='text-red-400 text-[12px] mt-1'>{errors.email}</span>
            )}
          </label>
          <label className='flex flex-col'>
            <span className='text-white text-[14px] font-medium mb-1.5'>Your Message</span>
            <textarea
              rows={4}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className={`bg-tertiary py-3 px-5 placeholder:text-secondary text-white text-[14px] rounded-lg outline-none font-medium input-focus-ring resize-none h-[140px] ${
                errors.message ? "border border-red-500" : "border-none"
              }`}
            />
            {errors.message && (
              <span className='text-red-400 text-[12px] mt-1'>{errors.message}</span>
            )}
          </label>

          <button
            type='submit'
            disabled={loading}
            className={`bg-tertiary py-2.5 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary btn-hover text-[14px] mt-1 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                Sending...
                <LoadingSpinner />
              </span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[480px] h-[300px] flex items-center justify-center'
      >
        <div className="w-full h-full min-h-[300px] xl:min-h-[480px]">
          <EarthCanvas />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

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

  const getEmailJSKeys = useCallback(() => {
    const sanitize = (val) => {
      if (typeof val !== 'string') return val;
      let clean = val.trim();
      if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
        clean = clean.substring(1, clean.length - 1);
      }
      return clean.trim();
    };

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
      raw: {
        v1_service,
        v1_template,
        v1_public,
        v2_service,
        v2_template,
        v2_public,
      }
    };
  }, []);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  useEffect(() => {
    const { serviceId, templateId, publicKey, raw } = getEmailJSKeys();

    console.log("EmailJS Environment Variable Configuration:");
    console.log("VITE_EMAILJS_SERVICE_ID exists:", !!raw.v1_service);
    console.log("VITE_EMAILJS_TEMPLATE_ID exists:", !!raw.v1_template);
    console.log("VITE_EMAILJS_PUBLIC_KEY exists:", !!raw.v1_public);
    console.log("VITE_APP_EMAILJS_SERVICE_ID exists:", !!raw.v2_service);
    console.log("VITE_APP_EMAILJS_TEMPLATE_ID exists:", !!raw.v2_template);
    console.log("VITE_APP_EMAILJS_PUBLIC_KEY exists:", !!raw.v2_public);

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
        emailjs.init(publicKey);
        console.log("🔑 EmailJS SDK initialized successfully with public key.");
      } catch (err) {
        console.error("❌ Failed to initialize EmailJS SDK:", err);
      }
    }
  }, [getEmailJSKeys]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    setStatusMessage(null);

    const { serviceId, templateId, publicKey } = getEmailJSKeys();

    console.log("EmailJS Submission Config Check:");
    console.log("SERVICE_ID exists:", !!serviceId);
    console.log("TEMPLATE_ID exists:", !!templateId);
    console.log("PUBLIC_KEY exists:", !!publicKey);

    // Detailed safe inspection of keys (verifying types, quotes, spaces, etc.)
    console.log("--- EmailJS Environment Variables Properties ---");
    const logKeyInfo = (name, value) => {
      if (value === undefined) {
        console.log(`${name}: undefined (type: undefined)`);
      } else if (value === null) {
        console.log(`${name}: null (type: object)`);
      } else {
        console.log(`${name}:`);
        console.log(`  - Type: ${typeof value}`);
        console.log(`  - Length: ${value.length}`);
        console.log(`  - Is literal "undefined": ${value === "undefined"}`);
        console.log(`  - Is literal "null": ${value === "null"}`);
        console.log(`  - Has quotes: ${(/^["'].*["']$/).test(value)}`);
        console.log(`  - Has leading/trailing spaces: ${value !== value.trim()}`);
        console.log(`  - First 3 chars: ${JSON.stringify(value.substring(0, 3))}`);
        console.log(`  - Last 3 chars: ${JSON.stringify(value.substring(value.length - 3))}`);
      }
    };
    logKeyInfo("SERVICE_ID", serviceId);
    logKeyInfo("TEMPLATE_ID", templateId);
    logKeyInfo("PUBLIC_KEY", publicKey);
    console.log("-------------------------------------------------");

    if (!serviceId || !templateId || !publicKey) {
      const missing = [];
      if (!serviceId) missing.push("SERVICE_ID");
      if (!templateId) missing.push("TEMPLATE_ID");
      if (!publicKey) missing.push("PUBLIC_KEY");

      console.error("❌ EmailJS submission failed due to missing configuration:", missing.join(", "));
      setStatusMessage({
        type: "error",
        text: "❌ Contact form is not configured. Please try again later.",
      });
      setLoading(false);
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Ravi Ranjan Kumar",
          from_email: form.email,
          to_email: "raviranjan.cse2003@gmail.com",
          message: form.message,
        },
        publicKey
      )
      .then(
        (response) => {
          setLoading(false);
          setStatusMessage({
            type: "success",
            text: "✅ Thanks for reaching out! Your message has been sent successfully. I'll get back to you as soon as possible.",
          });
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error("❌ EmailJS Send Failed Details:");
          console.error("1. Full Error Object:", error);
          console.error("2. Status Code:", error?.status || (error && typeof error === 'object' && 'status' in error ? error.status : "N/A"));
          console.error("3. Text Response / Error Body:", error?.text || (error && typeof error === 'object' && 'text' in error ? error.text : "N/A"));
          console.error("4. Message:", error?.message || (typeof error === 'string' ? error : "N/A"));
          console.error("5. Response:", error?.response || "N/A");
          console.error("6. Stack Trace:", error?.stack || "N/A");
          console.error("7. Config used at call time:", {
            serviceIdLength: serviceId?.length,
            templateIdLength: templateId?.length,
            publicKeyLength: publicKey?.length,
          });
          setStatusMessage({
            type: "error",
            text: "❌ Something went wrong. Please try again later.",
          });
        }
      );
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

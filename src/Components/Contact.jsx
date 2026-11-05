import img from "../assets/img20.png";
import { useState, useRef } from "react";

import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";

import PhoneInput from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import flags from "react-phone-number-input/flags";

import ReCAPTCHA from "react-google-recaptcha";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";

/* =========================================================
   CUSTOM COUNTRY SELECT
   ========================================================= */

const CountrySelect = ({ value, onChange }) => {
  const selectedCountry = value || "IN";
  const Flag = flags[selectedCountry];

  return (
    <div className="relative h-full w-full">
      <select
        value={selectedCountry}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select country"
        className="absolute inset-0 z-20 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        {getCountries().map((country) => (
          <option key={country} value={country}>
            {en[country]} +{getCountryCallingCode(country)}
          </option>
        ))}
      </select>

      <div className="pointer-events-none flex h-full w-full items-center gap-2 px-3">
        {Flag && (
          <Flag
            title={en[selectedCountry]}
            className="h-[16px] w-[24px] shrink-0 overflow-hidden rounded-[2px] object-cover"
          />
        )}

        <span className="whitespace-nowrap text-[12px] font-medium text-[#333]">
          +{getCountryCallingCode(selectedCountry)}
        </span>

        <ChevronDown
          size={14}
          className="ml-auto shrink-0 text-[#34506d]"
        />
      </div>
    </div>
  );
};

/* =========================================================
   COMPONENT
   ========================================================= */

const Contact = () => {
  const recaptchaRef = useRef(null);

  // Detect React Snap / headless prerendering.
  const isPrerendering =
    typeof navigator !== "undefined" &&
    /ReactSnap|HeadlessChrome/i.test(navigator.userAgent);

  const recaptchaSiteKey =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
    "6LdQnKYtAAAAAJkOhWSSnhScrzUBMtq-k_REKsc3";

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    phoneCountry: "IN",
    inquiry: "",
    country: "",
    comments: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [statusMessage, setStatusMessage] = useState({
    type: "",
    text: "",
  });

  /* =========================================================
     INPUT HANDLERS
     ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneCountryChange = (newCountry) => {
    setFormData((prev) => ({
      ...prev,
      phoneCountry: newCountry,
      phone: "",
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || "",
    }));
  };

  /* =========================================================
     CAPTCHA HANDLER
     ========================================================= */

  const handleCaptchaChange = (token) => {
    if (token) {
      setStatusMessage({
        type: "",
        text: "",
      });
    }
  };

  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setStatusMessage({
      type: "",
      text: "",
    });

    /* -------------------------
       REQUIRED FIELD VALIDATION
       ------------------------- */

    const requiredFields = [
      { name: "name", label: "Name" },
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone number" },
      { name: "inquiry", label: "Inquiry type" },
      { name: "country", label: "Destination country" },
    ];

    const missingField = requiredFields.find(({ name }) => {
      return !String(formData[name] || "").trim();
    });

    if (missingField) {
      const message = `${missingField.label} is required.`;

      setStatusMessage({
        type: "error",
        text: message,
      });

      toast.error(message);
      return;
    }

    /* -------------------------
       EMAIL VALIDATION
       ------------------------- */

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      const message = "Please enter a valid email address.";

      setStatusMessage({
        type: "error",
        text: message,
      });

      toast.error(message);
      return;
    }

    /* -------------------------
       PHONE VALIDATION
       ------------------------- */

    const fullPhoneNumber = String(formData.phone || "").trim();

    const phoneDigits = fullPhoneNumber.replace(/\D/g, "");

    if (!fullPhoneNumber || phoneDigits.length < 7) {
      const message = "Please enter a valid phone number.";

      setStatusMessage({
        type: "error",
        text: message,
      });

      toast.error(message);
      return;
    }

    /* -------------------------
       CAPTCHA VALIDATION
       ------------------------- */

    const tokenFromCaptcha =
      !isPrerendering && recaptchaRef.current
        ? recaptchaRef.current.getValue()
        : "";

    if (!isPrerendering && recaptchaSiteKey && !tokenFromCaptcha) {
      const message = "Please verify the captcha before submitting.";

      setStatusMessage({
        type: "error",
        text: message,
      });

      toast.warn(message);
      return;
    }

    /* -------------------------
       START SUBMISSION
       ------------------------- */

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhoneNumber,
        visaType: formData.inquiry || "General Inquiry",
        message: `[Destination Country: ${formData.country || "Not Specified"}] ${formData.comments || ""}`.trim(),
        captchaToken: tokenFromCaptcha || "",
        source: "Website Hero Form",
      };

      const apiBaseUrl = "https://global-murex.vercel.app";

      const response = await fetch(`${apiBaseUrl}/api/lead`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      let result = {};

      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            "The server returned an invalid response. Please try again later."
          );
        }
      }

      /* -------------------------
         SUCCESS HANDLING
         ------------------------- */

      if (response.ok && result.success) {
        const successMessage =
          result.message ||
          "Thank you! Our team will contact you shortly.";

        setStatusMessage({
          type: "success",
          text: successMessage,
        });

        toast.success(successMessage);

        // Reset form
        setFormData(initialFormData);

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        const errorMessage =
          result.message ||
          result.error ||
          `Server error: ${response.status}`;

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Form Submission Error:", error);

      const errorMessage =
        error && error.message
          ? error.message
          : "An error occurred while submitting. Please try again.";

      setStatusMessage({
        type: "error",
        text: errorMessage,
      });

      toast.error(errorMessage);

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     JSX
     ========================================================= */

  return (
    <div
      className="w-full min-h-[727px] md:min-h-[900px] lg:min-h-[900px] py-12 px-4 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat sm:px-6"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <h2 className="text-[24px] sm:text-[30px] font-bold text-teal-800 text-center mb-4 mt-0 sm:mb-6 sm:mt-[-80px]">
        Get In Touch With Us
      </h2>

      <div
        className="w-full max-w-[456px] rounded-[20px] p-[16px] sm:p-[30px] mx-auto mb-35 lg:mb-30"
        style={{
          backgroundColor: "#FFFFFFA8",
          boxShadow: "0px 0px 24px 4px #B2AFAF40",
          backdropFilter: "blur(4px)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-3"
        >
          {/* NAME AND EMAIL */}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-[36px] w-full rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] text-sky-800 outline-none transition placeholder:text-gray-400 focus:border-[#69b99e]"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-[36px] w-full rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] text-sky-800 outline-none transition placeholder:text-gray-400 focus:border-[#69b99e]"
            />
          </div>

          {/* PHONE NUMBER */}

          <div className="flex w-full gap-2">
            <div className="h-[36px] w-[115px] shrink-0 rounded-[9px] border border-[#e0e4e8] bg-white sm:w-[120px]">
              <CountrySelect
                value={formData.phoneCountry}
                onChange={handlePhoneCountryChange}
              />
            </div>

            <div className="min-w-0 flex-1">
              <PhoneInput
                country={formData.phoneCountry}
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Contact Number"
                required
                className="phone-number-input h-[36px] w-full rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] text-[#333] outline-none transition placeholder:text-gray-400 focus:border-[#69b99e]"
              />
            </div>
          </div>

          {/* INQUIRY TYPE */}

          <div className="relative">
            <select
              name="inquiry"
              value={formData.inquiry}
              onChange={handleChange}
              required
              className={`h-[36px] w-full appearance-none rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] outline-none focus:border-[#69b99e] ${
                formData.inquiry
                  ? "text-sky-800"
                  : "text-gray-400"
              }`}
            >
              <option value="">Inquiry for</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Work Visa">Work Visa</option>
              <option value="Visitor Visa">Visitor Visa</option>
              <option value="Migration">Migration</option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#34506d]"
            />
          </div>

          {/* DESTINATION COUNTRY */}

          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className={`h-[36px] w-full appearance-none rounded-[9px] border border-[#e0e4e8] bg-white px-4 text-[12px] outline-none focus:border-[#69b99e] ${
                formData.country
                  ? "text-sky-800"
                  : "text-gray-400"
              }`}
            >
              <option value="">Country</option>
              <option value="Australia">Australia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Dubai">Dubai</option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
              <option value="Georgia">Georgia</option>
              <option value="Russia">Russia</option>
              <option value="France">France</option>
              <option value="Europe">Europe</option>
              <option value="Singapore">Singapore</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#34506d]"
            />
          </div>

          {/* COMMENTS */}

          <textarea
            name="comments"
            placeholder="Your Comments"
            value={formData.comments}
            onChange={handleChange}
            rows="2"
            className="min-h-[60px] w-full resize-none rounded-[10px] border border-[#e0e4e8] bg-white px-4 py-2 text-[12px] text-sky-800 outline-none placeholder:text-gray-400 focus:border-[#69b99e]"
          />

          {/* RECAPTCHA - DISABLED DURING PRERENDERING */}

          {!isPrerendering && (
            <div className="flex justify-center overflow-x-auto py-1">
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                ref={recaptchaRef}
                onChange={handleCaptchaChange}
              />
            </div>
          )}

          {/* STATUS MESSAGE */}

          {statusMessage.text && (
            <div
              className={`rounded-md p-2 text-center text-[12px] font-medium ${
                statusMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {/* SUBMIT BUTTON */}

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="pointer-events-auto flex h-[42px] w-[140px] items-center justify-center rounded-full bg-[#214c83] text-[14px] font-semibold text-white transition hover:bg-[#173f68] disabled:cursor-not-allowed disabled:opacity-70 sm:h-[45px] sm:w-[150px]"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const otpInputVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

interface OTPVerificationFormProps {
  email: string;
  onBackToLogin: () => void;
  onOTPVerified: () => void;
}

export default function OTPVerificationForm({
  email,
  onBackToLogin,
  onOTPVerified,
}: OTPVerificationFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const t = useTranslations("login.otpVerification");

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    setLoading(true);

    // Simulate API call to verify OTP
    setTimeout(() => {
      setLoading(false);
      onOTPVerified();
    }, 1500);
  };

  const handleResendOTP = () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    setOtp(["", "", "", "", "", ""]);

    // Start countdown again
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const isOTPComplete = otp.every((digit) => digit !== "");

  return (
    <>
      <motion.div
        className="admin-login-header"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="logo" variants={itemVariants}>
          <Image
            src="/images/logo1.png"
            alt={"logo"}
            width={120}
            height={60}
            className="logo-image"
            priority
          />
        </motion.div>
        <motion.h1 className="title" variants={itemVariants}>
          {t("title")}
        </motion.h1>
        <motion.p className="subtitle" variants={itemVariants}>
          {t("subtitle")} <strong>{email}</strong>
          {t("subtitleEmail")}
        </motion.p>
      </motion.div>

      <motion.form
        className="admin-login-form"
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="form-group" variants={itemVariants}>
          <label>{t("otpLabel")}</label>
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                className={`otp-input ${digit ? "filled" : ""}`}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                variants={otpInputVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                whileFocus={{ scale: 1.1 }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div className="otp-resend" variants={itemVariants}>
          <span>{t("resendText")}</span>
          <motion.span
            className={`resend-link ${!canResend ? "disabled" : ""}`}
            onClick={handleResendOTP}
            whileHover={canResend ? { scale: 1.05 } : {}}
            whileTap={canResend ? { scale: 0.95 } : {}}
          >
            {canResend
              ? t("resendLink")
              : t("resendTimer", { seconds: resendTimer })}
          </motion.span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            className="submit-button"
            disabled={loading || !isOTPComplete}
          >
            {loading ? t("verifyingButton") : t("verifyButton")}
          </button>
        </motion.div>

        <motion.div
          className="back-link"
          variants={itemVariants}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackToLogin();
            }}
          >
            {t("backLink")}
          </a>
        </motion.div>
      </motion.form>
    </>
  );
}

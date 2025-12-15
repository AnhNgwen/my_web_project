"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      <div className="admin-login-header">
        <div className="logo">
          <Image
            src="/images/logo1.png"
            alt={"logo"}
            width={120}
            height={60}
            className="logo-image"
            priority
          />
        </div>
        <h1 className="title">{t("title")}</h1>
        <p className="subtitle">
          {t("subtitle")} <strong>{email}</strong>
          {t("subtitleEmail")}
        </p>
      </div>

      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t("otpLabel")}</label>
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
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
              />
            ))}
          </div>
        </div>

        <div className="otp-resend">
          <span>{t("resendText")}</span>
          <span
            className={`resend-link ${!canResend ? "disabled" : ""}`}
            onClick={handleResendOTP}
          >
            {canResend
              ? t("resendLink")
              : t("resendTimer", { seconds: resendTimer })}
          </span>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading || !isOTPComplete}
        >
          {loading ? t("verifyingButton") : t("verifyButton")}
        </button>

        <div className="back-link">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackToLogin();
            }}
          >
            {t("backLink")}
          </a>
        </div>
      </form>
    </>
  );
}

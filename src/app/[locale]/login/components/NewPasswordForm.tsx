"use client";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface NewPasswordFormProps {
  onBackToLogin: () => void;
  onPasswordSet: () => void;
}

interface PasswordRequirement {
  id: string;
  text: string;
  validator: (pwd: string) => boolean; // pwd parameter is used in validator functions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPasswordRequirements = (t: any): PasswordRequirement[] => [
  {
    id: "length",
    text: t("requirements.length"),
    validator: (pwd) => pwd.length >= 8,
  },
  {
    id: "uppercase",
    text: t("requirements.uppercase"),
    validator: (pwd) => /(?=.*[a-z])(?=.*[A-Z])/.test(pwd),
  },
  {
    id: "special",
    text: t("requirements.special"),
    validator: (pwd) => /(?=.*\d)(?=.*[@$!%*?&])/.test(pwd),
  },
];

export default function NewPasswordForm({
  onBackToLogin,
  onPasswordSet,
}: NewPasswordFormProps) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const t = useTranslations("login.newPassword");
  const passwordRequirements = getPasswordRequirements(t);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setLoading(true);

    // Simulate API call to set new password
    setTimeout(() => {
      setLoading(false);
      onPasswordSet();
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    const { password, confirmPassword } = formData;
    const allRequirementsMet = passwordRequirements.every((req) =>
      req.validator(password)
    );
    const passwordsMatch = password === confirmPassword && password.length > 0;
    return allRequirementsMet && passwordsMatch;
  };

  const getRequirementStatus = (requirement: PasswordRequirement) => {
    return requirement.validator(formData.password);
  };

  const passwordsNotMatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

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
        <p className="subtitle">{t("subtitle")}</p>
      </div>

      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="new-password">{t("newPassword")}</label>
          <Input.Password
            id="new-password"
            placeholder={t("newPasswordPlaceholder")}
            prefix={<LockOutlined style={{ color: "#999" }} />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">{t("confirmPassword")}</label>
          <Input.Password
            id="confirm-password"
            placeholder={t("confirmPasswordPlaceholder")}
            prefix={<LockOutlined style={{ color: "#999" }} />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            status={passwordsNotMatch ? "error" : undefined}
            required
          />
          {passwordsNotMatch && (
            <div
              style={{ color: "#ea4335", fontSize: "12px", marginTop: "4px" }}
            >
              {t("passwordMismatch")}
            </div>
          )}
        </div>

        <div className="password-requirements">
          <div className="requirements-title">{t("requirementsTitle")}</div>
          {passwordRequirements.map((requirement) => {
            const isValid = getRequirementStatus(requirement);
            return (
              <div
                key={requirement.id}
                className={`requirement-item ${isValid ? "valid" : "invalid"}`}
              >
                <div
                  className={`requirement-icon ${
                    isValid ? "valid" : "invalid"
                  }`}
                >
                  {isValid ? "✓" : "×"}
                </div>
                <span>{requirement.text}</span>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading || !isFormValid()}
        >
          {loading ? t("updatingButton") : t("completeButton")}
        </button>

        <div className="back-link">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackToLogin();
            }}
          >
            {t("backToLogin")}
          </a>
        </div>
      </form>
    </>
  );
}

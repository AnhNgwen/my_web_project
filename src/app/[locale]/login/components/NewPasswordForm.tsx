"use client";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

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

const requirementVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

interface NewPasswordFormProps {
  onBackToLogin: () => void;
  onPasswordSet: () => void;
}

interface PasswordRequirement {
  id: string;
  text: string;
  validator: (pwd: string) => boolean;
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
          {t("subtitle")}
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
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
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
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#ea4335", fontSize: "12px", marginTop: "4px" }}
            >
              {t("passwordMismatch")}
            </motion.div>
          )}
        </motion.div>

        <motion.div className="password-requirements" variants={itemVariants}>
          <div className="requirements-title">{t("requirementsTitle")}</div>
          {passwordRequirements.map((requirement, index) => {
            const isValid = getRequirementStatus(requirement);
            return (
              <motion.div
                key={requirement.id}
                className={`requirement-item ${isValid ? "valid" : "invalid"}`}
                variants={requirementVariants}
                custom={index}
                initial="hidden"
                animate="visible"
              >
                <div
                  className={`requirement-icon ${
                    isValid ? "valid" : "invalid"
                  }`}
                >
                  {isValid ? "✓" : "×"}
                </div>
                <span>{requirement.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            className="submit-button"
            disabled={loading || !isFormValid()}
          >
            {loading ? t("updatingButton") : t("completeButton")}
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
            {t("backToLogin")}
          </a>
        </motion.div>
      </motion.form>
    </>
  );
}

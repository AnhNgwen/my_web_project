"use client";

import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const { Title, Text } = Typography;

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

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onOTPSent: (email: string) => void;
}

interface ForgotPasswordData {
  email: string;
}

export default function ForgotPasswordForm({
  onBackToLogin,
  onOTPSent,
}: ForgotPasswordFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("login.forgotPassword");

  const handleSubmit = async (values: ForgotPasswordData) => {
    setLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      onOTPSent(values.email);
    }, 1500);
  };

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
        <motion.div variants={itemVariants}>
          <Title level={4} className="title">
            {t("title")}
          </Title>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Text className="subtitle">{t("subtitle")}</Text>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Form
          form={form}
          name="forgot-password"
          className="admin-login-form"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <motion.div variants={itemVariants}>
            <Form.Item
              label={t("emailOrPhone")}
              name="email"
              rules={[
                {
                  required: true,
                  message: t("validation.emailOrPhoneRequired"),
                },
                { type: "email", message: t("validation.emailInvalid") },
              ]}
            >
              <Input
                size="large"
                placeholder={t("emailOrPhonePlaceholder")}
                prefix={<MailOutlined style={{ color: "#999" }} />}
              />
            </Form.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="submit-button shadow-none border-none"
                block
              >
                {t("sendOtpButton")}
              </Button>
            </Form.Item>
          </motion.div>

          <motion.div
            className="back-link"
            variants={itemVariants}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Button type="link" onClick={onBackToLogin}>
              {t("backToLogin")}
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </>
  );
}

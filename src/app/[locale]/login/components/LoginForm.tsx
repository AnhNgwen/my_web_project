"use client";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountList from "./AccountList";

const { Title } = Typography;

interface LoginFormProps {
  onForgotPassword: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("login");
  const router = useRouter();

  const handleSubmit = async (values: LoginFormData) => {
    setLoading(true);
    console.log(values);
    router.replace("/user/home");
  };

  const handleAccountSelect = (email: string, password: string) => {
    form.setFieldsValue({
      email,
      password,
    });
  };

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
        <Title level={4} className="title">
          {t("title")}
        </Title>
      </div>

      <Form
        form={form}
        name="login"
        className="admin-login-form"
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label={t("email")}
          name="email"
          rules={[
            { required: true, message: t("validation.emailRequired") },
            { type: "email", message: t("validation.emailInvalid") },
          ]}
        >
          <Input
            size="large"
            placeholder={t("emailPlaceholder")}
            prefix={<MailOutlined style={{ color: "#999" }} />}
          />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[
            { required: true, message: t("validation.passwordRequired") },
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t("passwordPlaceholder")}
            prefix={<LockOutlined style={{ color: "#999" }} />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <div className="form-options">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("rememberMe")}</Checkbox>
          </Form.Item>
          <Button
            type="link"
            className="forgot-password-link"
            onClick={onForgotPassword}
          >
            {t("forgotPasswordLink")}
          </Button>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="submit-button"
            block
          >
            {t("loginButton")}
          </Button>
        </Form.Item>
      </Form>

      <AccountList onAccountSelect={handleAccountSelect} />
    </>
  );
}

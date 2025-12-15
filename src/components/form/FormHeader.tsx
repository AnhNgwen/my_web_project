import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import DraftButton from "@/components/shared/Button/FormHeader/DraftButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { LeftOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { SetStateAction } from "react";
import "./style.scss";

type BreadCrumbType = {
  label: string;
  link: string;
};

type FormHeaderProps = {
  setOpenDialog: React.Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  title: string;
  breadcrumbs: BreadCrumbType[];
  setSubmitType?: React.Dispatch<SetStateAction<string>>;
  setConfirmModalLink: React.Dispatch<SetStateAction<string>>;
  publicButtonTitle?: string;
  has_draft_button?: boolean;
};

export default function FormHeader({
  setOpenDialog,
  isLoading,
  title,
  setSubmitType,
  breadcrumbs,
  setConfirmModalLink,
  publicButtonTitle,
  has_draft_button = false,
}: FormHeaderProps) {
  const t = useTranslations("product.add-product");

  return (
    <Card className="w-full no__border__radius__card">
      <Flex
        justify="space-between"
        className="flex-col sm:flex-row sm:items-center gap-2"
      >
        <Flex gap="middle">
          <LeftOutlined
            size={27}
            onClick={() => {
              setOpenDialog((prev) => !prev);
              setConfirmModalLink(
                breadcrumbs.length === 1
                  ? breadcrumbs[0]?.link || "#"
                  : breadcrumbs[breadcrumbs.length - 2]?.link || "#"
              );
            }}
          />
          <Flex vertical gap="small">
            <Flex align="center" gap="small" className="hidden sm:flex">
              {breadcrumbs.map((breadcrumb, index) => {
                return index === breadcrumbs.length - 1 ? (
                  <Link
                    href={"#"}
                    onClick={() => {
                      setConfirmModalLink(breadcrumb.link);
                      setOpenDialog(true);
                    }}
                    className="text-base font-medium text-[#1A1A1A]"
                  >
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <div>
                    <>
                      <Link
                        href={"#"}
                        onClick={() => {
                          setConfirmModalLink(breadcrumb.link);
                          setOpenDialog(true);
                        }}
                        className=" font-normal text-base text-[#5A5A5A]"
                      >
                        {breadcrumb.label}
                      </Link>
                      <span className="text-gray-500">/</span>
                    </>
                  </div>
                );
              })}
            </Flex>
            <span className="font-semibold text-xl text-[#1A1A1A]">
              {title}
            </span>
          </Flex>
        </Flex>
        <Flex className="mx-auto sm:mx-0">
          <Flex gap="middle">
            <CancelButton
              title="Cancel"
              onClick={() => {
                setOpenDialog((prev) => !prev);
                setConfirmModalLink(
                  breadcrumbs.length === 1
                    ? breadcrumbs[0]?.link || "#"
                    : breadcrumbs[breadcrumbs.length - 2]?.link || "#"
                );
              }}
            />
            {has_draft_button && (
              <DraftButton
                title={t("button.draft")}
                isLoading={isLoading}
                onClick={() => setSubmitType?.("draft")}
              />
            )}{" "}
            <PublishButton
              title={publicButtonTitle}
              isLoading={isLoading}
              isSubmit={true}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import { useTranslations } from "next-intl";
type ConfirmModalProps = {
  onOk: () => void;
  onCancel: () => void;
  open: boolean;
};

export default function ConfirmModal({
  open,
  onOk,
  onCancel,
}: ConfirmModalProps) {
  const t = useTranslations("modal");

  return (
    <Modal
      centered
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      rootClassName="modal"
    >
      <Flex justify="center" vertical align="center" gap="middle">
        <ExclamationCircleFilled style={{ color: "#F29900", fontSize: 70 }} />
        <p className="text-sm font-normal text-center">{t("message")}</p>

        {/* Custom footer buttons */}
        <Flex justify="center" gap="small">
          <Button
            onClick={onCancel}
            type="default"
            style={{
              backgroundColor: "#f0f2f5",
              fontWeight: 500,
              fontSize: 16,
              padding: "16px",
              boxShadow: "none",
            }}
          >
            {t("stayButton")}
          </Button>
          <Button
            type="primary"
            onClick={onOk}
            style={{
              backgroundColor: "#2b6bb2",
              fontWeight: 500,
              fontSize: 16,
              padding: "16px",
              boxShadow: "none",
            }}
          >
            {t("exitButton")}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}

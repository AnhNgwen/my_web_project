import { Button } from 'antd';

type Props = {
  title?: string;
  isLoading?: boolean;
  onClick?: () => void;
  Icon?: React.ComponentType<{ className?: string }>;
};
export default function DangerButton({ title, isLoading, onClick, Icon }: Props) {
  return (
    <div className="form__header">
      <Button
        type="default"
        loading={isLoading}
        onClick={onClick}
        className="danger__button"
        danger
        icon={Icon && <Icon className="danger__icon" />}
      >
        {title}
      </Button>
    </div>
  );
}

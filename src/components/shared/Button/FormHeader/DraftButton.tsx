import { Button } from 'antd';
import './style.scss';

type Props = {
  title?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

export default function DraftButton({ title, isLoading, onClick }: Props) {
  return (
    <div className="form__header">
      <Button
        type="text"
        htmlType="submit"
        loading={isLoading}
        className="draft__button"
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  );
}

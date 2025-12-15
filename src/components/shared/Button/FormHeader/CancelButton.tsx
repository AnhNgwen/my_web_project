import { Button } from 'antd';
import './style.scss';

type Props = {
  title?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

export default function CancelButton({ title, isLoading, onClick }: Props) {
  return (
    <div className="form__header">
      <Button type="default" className="cancel__button" onClick={onClick} disabled={isLoading}>
        {title}
      </Button>
    </div>
  );
}

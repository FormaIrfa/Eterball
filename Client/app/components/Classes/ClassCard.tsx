import { ClassType } from '@/app/types/class';
import Image from 'next/image';

type Props = {
  data: ClassType;
  onClick: () => void;
};

export default function ClassCard({ data, onClick }: Props) {
  return (
    <button type="button" className="class-card" onClick={onClick}>
      <div className="class-card__image">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="class-card__img"
          priority
        />
      </div>

      <div className="class-card__footer">
        <h3>{data.name}</h3>
      </div>
    </button>
  );
}

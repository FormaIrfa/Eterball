import { ClassType } from '@/app/types/class';

type Props = {
  stats: ClassType['stats'];
};

export default function ClassStats({ stats }: Props) {
  return (
    <ul className="class-stats">
      {Object.entries(stats).map(([key, value]) => (
        <li key={key}>
          <span>{key}</span>
          <strong>{value}</strong>
        </li>
      ))}
    </ul>
  );
}

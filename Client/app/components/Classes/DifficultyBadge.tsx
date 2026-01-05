const map = {
  easy: 1,
  medium: 2,
  hard: 3,
  expert: 4,
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: keyof typeof map;
}) {
  const level = map[difficulty];

  return (
    <div className="difficulty-badge">
      {[...Array(4)].map((_, i) => (
        <span key={i} className={i < level ? 'active' : ''}>
          ★
        </span>
      ))}
    </div>
  );
}

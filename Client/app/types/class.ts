export type ClassType = {
  _id: string;
  name: string;
  slug: string;
  role: 'offense' | 'defense' | 'support' | 'hybrid';
  image: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    technique: number;
    stamina: number;
  };
  order?: number;
};

import { Leader } from '@/types';
import leadershipData from '../../leadership.json';

// Edit leadership.json (project root) to add/update leaders.
// `priority` controls display order (lower number shows first).
export const leaders: Leader[] = (leadershipData as Leader[])
  .slice()
  .sort((a, b) => a.priority - b.priority);

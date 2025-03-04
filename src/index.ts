import { evaluateHands } from './evaluator';
import { Hand, Score } from './types';

export function evaluatePokerHands(hands: Hand[]): Score[] {
  return evaluateHands(hands);
}

export * from './types';
export * from './evaluator';

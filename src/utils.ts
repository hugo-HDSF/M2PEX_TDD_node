import { Card, Hand, Rank, Suit } from './types';
import { getRank, getSuit, rankValue } from './evaluator';

/**
 * Gets the frequency of each rank in the hand
 * @param hand The poker hand
 * @returns Map of rank to frequency
 */
export function getRankFrequencies(hand: Hand): Map<Rank, number> {
  const frequencies = new Map<Rank, number>();
  
  hand.forEach(card => {
    const rank = getRank(card);
    frequencies.set(rank, (frequencies.get(rank) || 0) + 1);
  });
  
  return frequencies;
}

/**
 * Checks if all cards in the hand have the same suit
 * @param hand The poker hand
 * @returns True if all cards have the same suit
 */
export function isSameSuit(hand: Hand): boolean {
  const suit = getSuit(hand[0]);
  return hand.every(card => getSuit(card) === suit);
}

/**
 * Sorts cards by their rank in descending order
 * @param hand The poker hand
 * @returns Sorted hand
 */
export function sortByRank(hand: Hand): Hand {
  return [...hand].sort((a, b) => {
    const rankA = rankValue(getRank(a));
    const rankB = rankValue(getRank(b));
    return rankB - rankA; // Descending order
  }) as Hand;
}

/**
 * Checks if the hand forms a straight (sequential ranks)
 * @param hand The poker hand
 * @returns True if the hand is a straight
 */
export function isStraight(hand: Hand): boolean {
  const sortedHand = sortByRank(hand);
  const ranks = sortedHand.map(card => rankValue(getRank(card)));
  
  // Special case: A-5-4-3-2 straight
  if (ranks[0] === 14 && ranks[1] === 5 && ranks[2] === 4 &&
      ranks[3] === 3 && ranks[4] === 2) {
    return true;
  }
  
  // Regular straights
  for (let i = 1; i < ranks.length; i++) {
    if (ranks[i-1] !== ranks[i] + 1) {
      return false;
    }
  }
  
  return true;
}

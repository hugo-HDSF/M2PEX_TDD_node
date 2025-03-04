import { Card, Hand, Score, Rank, Suit } from './types';

/**
 * Evaluates poker hands and returns them with corresponding scores
 * @param hands Array of poker hands to evaluate
 * @returns Array of [hand, score] tuples
 */
export function evaluateHands(hands: Hand[]): Score[] {
	return hands.map(hand => [hand, evaluateHand(hand)]);
}

/**
 * Evaluates a single poker hand and returns its score
 * @param hand Poker hand to evaluate
 * @returns Score value
 */
export function evaluateHand(hand: Hand): number {
	// To be implemented
	return 0;
}

/**
 * Extracts the rank from a card
 * @param card The card
 * @returns The rank of the card
 */
export function getRank(card: Card): Rank {
	return card.slice(1) as Rank;
}

/**
 * Extracts the suit from a card
 * @param card The card
 * @returns The suit of the card
 */
export function getSuit(card: Card): Suit {
	return card[0] as Suit;
}

/**
 * Converts a card rank to its numerical value for comparison
 * @param rank Card rank to convert
 * @returns Numerical value
 */
export function rankValue(rank: Rank): number {
	switch (rank) {
		case 'a':
			return 14; // As
		case 'r':
			return 13; // Roi
		case 'd':
			return 12; // Dame
		case 'v':
			return 11; // Valet
		default:
			return parseInt(rank, 10);
	}
}

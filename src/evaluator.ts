import { Card, Hand, Score, HandType, Rank, Suit } from './types';
import {
	sortByRank
} from './utils';

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
	// For now, just evaluate high card
	return evaluateHighCard(hand);
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

/**
 * Evaluates a high card hand
 * @param hand The poker hand
 * @returns The score for the high card hand
 */
export function evaluateHighCard(hand: Hand): number {
	const sortedHand = sortByRank(hand);
	
	// Base score for high card is 0
	// Add each card's value as a fraction of the score for tiebreakers
	let score = HandType.HighCard;
	
	// Add values for tie-breaking (in descending order of importance)
	sortedHand.forEach((card, index) => {
		const value = rankValue(getRank(card));
		// Scale each card based on position (first card most important)
		score += value / Math.pow(100, index);
	});
	
	return score;
}

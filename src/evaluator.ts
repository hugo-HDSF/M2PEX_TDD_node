import { Card, Hand, Score, HandType, Rank, Suit } from './types';
import {
	getRankFrequencies,
	isSameSuit,
	isStraight,
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
	const frequencies = getRankFrequencies(hand);
	const pairs = Array.from(frequencies.entries()).filter(([_, count]) => count === 2);
	const threes = Array.from(frequencies.entries()).filter(([_, count]) => count === 3);
	
	if (threes.length === 1 && pairs.length === 1) {
		return evaluateFullHouse(hand);
	}
	if (isSameSuit(hand)) {
		return evaluateFlush(hand);
	}
	if (isStraight(hand)) {
		return evaluateStraight(hand);
	}
	if (threes.length === 1) {
		return evaluateThreeOfAKind(hand);
	}
	if (pairs.length === 2) {
		return evaluateTwoPair(hand);
	}
	if (pairs.length === 1) {
		return evaluateOnePair(hand);
	}
	
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
	
	// Base value for hand type (0-9) * 10^14 to ensure hand types don't overlap
	let score = HandType.HighCard * 10 ** 14;
	
	// Add values for tie-breaking (in descending order of importance)
	for (let i = 0; i < sortedHand.length; i++) {
		const value = rankValue(getRank(sortedHand[i]));
		// Each position is worth less by a factor of 100
		score += value * 10 ** (2 * (4 - i));
	}
	
	return score;
}

/**
 * Evaluates a hand with one pair
 * @param hand The poker hand
 * @returns The score for the one pair hand
 */
export function evaluateOnePair(hand: Hand): number {
	const frequencies = getRankFrequencies(hand);
	const pairs = Array.from(frequencies.entries())
		.filter(([_, count]) => count === 2);
	
	if (pairs.length !== 1) {
		throw new Error('Hand does not contain exactly one pair');
	}
	
	// Base value for hand type (0-9) * 10^14 to ensure hand types don't overlap
	let score = HandType.OnePair * 10 ** 14;
	
	const pairRank = pairs[0][0];
	const pairValue = rankValue(pairRank);
	
	// Add the pair's value as the primary tiebreaker (value * 10^8)
	score += pairValue * 10 ** 8;
	
	// Sort the remaining cards (kickers) for secondary tiebreakers
	const kickers = hand.filter(card => getRank(card) !== pairRank)
		.map(card => rankValue(getRank(card)))
		.sort((a, b) => b - a);
	
	// Add kickers in descending order of importance
	for (let i = 0; i < kickers.length; i++) {
		score += kickers[i] * 10 ** (2 * (2 - i));
	}
	
	return score;
}

/**
 * Evaluates a hand with two pairs
 * @param hand The poker hand
 * @returns The score for the two pair hand
 */
export function evaluateTwoPair(hand: Hand): number {
	const frequencies = getRankFrequencies(hand);
	const pairs = Array.from(frequencies.entries())
		.filter(([_, count]) => count === 2);
	
	if (pairs.length !== 2) {
		throw new Error('Hand does not contain exactly two pairs');
	}
	
	// Base value for hand type (0-9) * 10^14 to ensure hand types don't overlap
	let score = HandType.TwoPair * 10 ** 14;
	
	// Sort pairs by rank value (higher pair first)
	pairs.sort((a, b) => rankValue(b[0]) - rankValue(a[0]));
	
	// Add higher pair as primary tiebreaker
	score += rankValue(pairs[0][0]) * 10 ** 8;
	
	// Add lower pair as secondary tiebreaker
	score += rankValue(pairs[1][0]) * 10 ** 4;
	
	// Find the kicker (the card that's not in either pair)
	const pairRanks = new Set(pairs.map(p => p[0]));
	const kicker = hand.find(card => !pairRanks.has(getRank(card)));
	
	if (kicker) {
		// Add kicker as tertiary tiebreaker
		score += rankValue(getRank(kicker));
	}
	
	return score;
}

/**
 * Evaluates a hand with three of a kind
 * @param hand The poker hand
 * @returns The score for the three of a kind hand
 */
export function evaluateThreeOfAKind(hand: Hand): number {
	const frequencies = getRankFrequencies(hand);
	const threes = Array.from(frequencies.entries()).filter(([_, count]) => count === 3);
	
	if (threes.length !== 1) {
		throw new Error('Hand does not contain exactly three of a kind');
	}
	
	let score = HandType.ThreeOfAKind * 10 ** 14;
	const threeRank = threes[0][0];
	const threeValue = rankValue(threeRank);
	
	score += threeValue * 10 ** 8;
	
	const kickers = hand.filter(card => getRank(card) !== threeRank)
		.map(card => rankValue(getRank(card)))
		.sort((a, b) => b - a);
	
	kickers.forEach((value, index) => {
		score += value * 10 ** (2 * (2 - index));
	});
	
	return score;
}

/**
 * Evaluates a straight hand
 * @param hand The poker hand
 * @returns The score for the straight hand
 */
export function evaluateStraight(hand: Hand): number {
	if (!isStraight(hand)) {
		throw new Error('Hand is not a straight');
	}
	
	const sortedHand = sortByRank(hand);
	const ranks = sortedHand.map(card => rankValue(getRank(card)));
	
	// Special case for A-5-4-3-2 straight (wheel)
	// In standard poker rules, this is the lowest straight
	if (ranks[0] === 14 && ranks[1] === 5) {
		// In A-5-4-3-2 straight, the 5 is the highest card for ranking purposes
		return HandType.Straight * 10 ** 14 + 5 * 10 ** 8;
	}
	
	// Regular straight - value is determined by the highest card
	return HandType.Straight * 10 ** 14 + ranks[0] * 10 ** 8;
}

/**
 * Evaluates a flush hand
 * @param hand The poker hand
 * @returns The score for the flush hand
 */
export function evaluateFlush(hand: Hand): number {
	if (!isSameSuit(hand)) {
		throw new Error('Hand is not a flush');
	}
	const sortedHand = sortByRank(hand);
	let score = HandType.Flush * 10 ** 14;
	
	sortedHand.forEach((card, index) => {
		const value = rankValue(getRank(card));
		score += value * 10 ** (2 * (4 - index));
	});
	
	return score;
}

/**
 * Evaluates a full house hand
 * @param hand The poker hand
 * @returns The score for the full house hand
 */
export function evaluateFullHouse(hand: Hand): number {
	const frequencies = getRankFrequencies(hand);
	const threes = Array.from(frequencies.entries()).filter(([_, count]) => count === 3);
	const pairs = Array.from(frequencies.entries()).filter(([_, count]) => count === 2);
	
	if (threes.length !== 1 || pairs.length !== 1) {
		throw new Error('Hand does not contain a full house');
	}
	
	let score = HandType.FullHouse * 10 ** 14;
	const threeRank = threes[0][0];
	const pairRank = pairs[0][0];
	
	score += rankValue(threeRank) * 10 ** 8;
	score += rankValue(pairRank) * 10 ** 4;
	
	return score;
}

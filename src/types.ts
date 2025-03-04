// Define suit types
export type Suit = '♦' | '󰋑' | '♣' | '♠';

// Define rank types
export type Rank =
	'a'
	| 'r'
	| 'd'
	| 'v'
	| '10'
	| '9'
	| '8'
	| '7'
	| '6'
	| '5'
	| '4'
	| '3'
	| '2';

// Define card type
export type Card = `${Suit}${Rank}`;

// Define hand type (a hand consists of 5 cards)
export type Hand = [Card, Card, Card, Card, Card];

// Define the return type for hand evaluation
export type Score = [Hand, number];

// Define hand types enum for better readability
export enum HandType {
	HighCard = 0,
	OnePair = 1,
	TwoPair = 2,
	ThreeOfAKind = 3,
	Straight = 4,
	Flush = 5,
	FullHouse = 6,
	FourOfAKind = 7,
	StraightFlush = 8,
	RoyalFlush = 9
}

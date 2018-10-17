const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const RED = "red";
const BLUE = "blue";
const YELLOW = "yellow";
const GREEN = "green";
const WILD = "wild";

const DRAW_TWO = "draw-two";
const DRAW_FOUR = "draw-four";
const REVERSE = "reverse";
const SKIP = "skip";

export const COLORS = [RED, GREEN, BLUE, YELLOW, WILD];

export const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const SPECIAL_ACTIONS = [DRAW_TWO, DRAW_FOUR, REVERSE, SKIP, WILD];

export const FILTERS = ["all"].concat(COLORS);
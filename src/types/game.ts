export enum Winner {
  huPlayer = "huPlayer",
  aiPlayer = "aiPlayer",
  draw = "draw",
}

export enum Mode {
  Idle,
  Playing,
  Ended,
}

export enum Mark {
  o = "o",
  x = "x",
}

export enum Difficulty {
  Easy = "Easy",
  Hard = "Hard",
  Normal = "Normal",
}

export enum Lang {
  en = "English",
  de = "German",
}

export function isDifficultyEnumKey(
  key: string
): key is keyof typeof Difficulty {
  if (key in Difficulty) {
    return true;
  } else {
    return false;
  }
}

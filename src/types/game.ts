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
  en = "en",
  de = "ge",
}

export function isDifficultyEnum(value: string): value is Difficulty {
  if (value in Difficulty) {
    return true;
  } else {
    return false;
  }
}

export function isLangEnum(value: string): value is Lang {
  if (value in Lang) {
    return true;
  } else {
    return false;
  }
}

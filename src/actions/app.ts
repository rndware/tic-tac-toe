export function appResetExclude(excludeReducers: string[]) {
  return {
    type: "app/reset",
    payload: { excludeReducers },
  };
}

/** Count plus noun, agreeing in number: "1 fork", "2 forks", "0 forks". Regular -s nouns only. */
export function pluralize(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

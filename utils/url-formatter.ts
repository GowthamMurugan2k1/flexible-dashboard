export function humanizePath(str: string) {
  return str
    .split("/")
    .filter((removeSpace) => removeSpace)
    .map((item) =>
      item.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    ).join(' ')
}

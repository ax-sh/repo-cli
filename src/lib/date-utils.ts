import spacetime from 'spacetime'

export function elapsedTime(date: string) {
  const now = spacetime.now()
  return now.since(spacetime(date)).rounded
}

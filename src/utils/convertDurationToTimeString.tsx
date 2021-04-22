export function convertDurationToTimeString(duration: number){
  const hours = Math.floor(duration / 3600) //floor = arredonda pra baixo
  const minutes = Math.floor((duration % 3600)/60)
  const seconds = duration % 60

  const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0')) //padstart adiciona 0 nos digitos simples ex: 01
    .join(':')

    return timeString
}
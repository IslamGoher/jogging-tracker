export function calculateSpeed(time: string, distance: number) {
  const timeAsHours = convertTimeToHours(time);
  const distanceAsKilometer = distance / 1000;

  return (distanceAsKilometer / timeAsHours).toFixed(2);

}

function convertTimeToHours(time: string) {
  const seperatedTime = time.split(":");
  const hours = parseInt(seperatedTime[0]);
  const minutes = parseInt(seperatedTime[1]);
  const seconds = parseInt(seperatedTime[2]);

  const minutesToHours = minutes / 60;
  const secondsToHours = seconds / 60 / 60;

  return hours + minutesToHours + secondsToHours;
}
import moment from 'moment';

export const findPrevClosestDateTime = (
  dateTimeArray,
  targetMoment,
  interval,
) => {
  // Initialize a variable to hold the closest date-time
  let closestDateTime = null;

  // Iterate through the dateTimeArray to find the previous closest date-time
  for (let i = 0; i < dateTimeArray.length; i++) {
    // Convert the current element in the array to a moment object
    const currentMoment = moment.utc(dateTimeArray[i], 'DD/MM/YYYY HH:mm:ss');

    const isWithinMinutes =
      Math.abs(currentMoment.diff(targetMoment, 'minutes')) <= interval / 60;

    // Check if the current moment is less than or equal to the target moment
    if (isWithinMinutes) {
      // Update the closest date-time
      closestDateTime = currentMoment.format('DD/MM/YYYY HH:mm:ss');
    }
  }

  // If no date-time is found that is less than or equal to the target date,
  // you can return a default value or handle it as needed.
  return closestDateTime || 0;
};


export function chartTimeframes(time) {
  switch (time) {
    case '1M':
      return 1;
    case '5M':
      return 5;
    case '15M':
      return 15;
    case '30M':
      return 30;
    case '1H':
      return 60;
    case '4H':
      return 240;
    case '1D':
      return 1440;
    default:
      return 1;
  }
}
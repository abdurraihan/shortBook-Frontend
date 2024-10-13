export const getDateDifferenceFromNow = (FormDate) => {
  let difference = new Date().getTime() - new Date(FormDate).getTime();

  difference = difference / 1000;
  let hourDiffrence = Math.floor(difference / 3600);
  difference -= hourDiffrence * 3600;
  let minuteDifference = Math.floor(difference / 60);
  difference -= minuteDifference * 60;

  let message;

  if (hourDiffrence > 0) {
    message = `${hourDiffrence} hour`;
  }

  if (minuteDifference > 0) {
    message = message
      ? `${message} ${minuteDifference} minutes`
      : `${minuteDifference} minutes`;
  }

  if (difference) {
    message = message
      ? `${Math.round(difference)} seconds`
      : `${Math.round(difference)} seconds`;
  }

  return message;
};

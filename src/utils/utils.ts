export const locatorEqual = (a, b) => {
  if(!a || !b) return false;

  return a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3]
}
 
export const formatDate = dateString => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
}

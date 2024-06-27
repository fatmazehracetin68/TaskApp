export const formatDate = dateString => {
  const date = new Date(dateString);

  const day = String(date.getDate() + 1).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

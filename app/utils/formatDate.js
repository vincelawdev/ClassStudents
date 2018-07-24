const formatAussieDate = (dateString) => {
  const date = new Date(dateString);
  const dayFormatted = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1;
  const monthFormatted = month < 10 ? `0${month}` : month;

  return `${dayFormatted}/${monthFormatted}/${date.getFullYear()}`;
};

export default formatAussieDate;
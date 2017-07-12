const formatTimestamp = (timestamp) => {
  const hours = Math.floor(timestamp / 3600000);
  const minutes = Math.floor((timestamp - hours * 3600000) / 60000);
  const seconds = Math.floor((timestamp - hours * 3600000 - minutes * 60000) / 1000);

  return `${hours}:${minutes}:${seconds}`;
};

export default formatTimestamp;

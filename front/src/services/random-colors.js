const randomColors = quant => {
  const all = [];
  for (var j = 0; j < quant; j++) {
    let color =
      "rgba(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ",0.9)";
    all.push(color);
  }
  return all;
};

export { randomColors };

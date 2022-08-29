export const generateEmptyMatrix = (size: number) => {
  const matrix = [];
  const line = [];

  for (let i = 0; i < size; i++) {
    line.push(null);
  }
  for (let i = 0; i < size; i++) {
    matrix.push([...line]);
  }

  return matrix;
};

export const updateMatrix = (
  matrix: (number | null)[][],
  x: number,
  y: number
) => {
  const measurement = new TimeMeasurement();
  const input = matrix;
  measurement.add("parse");

  const yMax = input?.length - 1;
  const xMax = input?.[0]?.length - 1;

  for (let i = 0; i <= yMax; i++) {
    if (i === y) {
      continue;
    }
    input[i][x] = incrementItem(input[i][x]);
  }

  measurement.add("rows");

  for (let j = 0; j <= xMax; j++) {
    input[y][j] = incrementItem(input[y][j]);
  }
  measurement.add("cols");

  measurement.writeResults();
  return input;
};

const incrementItem = (item: number | null) => {
  return item === null ? 1 : ++item;
};

type measurement = {
  label: string;
  time: number;
};

class TimeMeasurement {
  data: measurement[] = [];

  constructor() {
    this.add("");
  }

  add = (note: string) => {
    this.data.push({
      label: note,
      time: new Date().getTime(),
    });
  };

  writeResults = () => {
    const results: [string, number][] = [];
    for (let i = 1; i < this.data.length; i++) {
      const current = this.data[i];
      const previous = this.data[i - 1];
      results.push([current.label, current.time - previous.time]);
    }
  };
}

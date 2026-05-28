const Table = require("cli-table3");

function formatValue(val) {

  if (
    val === null ||
    val === undefined
  ) {
    return "";
  }

  if (typeof val === "object") {
    return JSON.stringify(val);
  }

  return String(val);
}

function printTable(data) {

  if (!data.length) {
    console.log("Sem resultados.");
    return;
  }

  const keys =
    Object.keys(data[0]);

  const table = new Table({
    head: keys,
    colWidths: keys.map(() => 30),
    wordWrap: true,
  });

  data.forEach(row => {

    table.push(
      keys.map(k =>
        formatValue(row[k])
      )
    );
  });

  console.log(table.toString());
}

module.exports = printTable;
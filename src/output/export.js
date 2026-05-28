const fs = require("fs");
const { Parser } =
  require("json2csv");

function exportData(data, args) {

  const jsonIndex =
    args.indexOf("--json");

  const csvIndex =
    args.indexOf("--csv");

  if (jsonIndex !== -1) {

    const file =
      args[jsonIndex + 1];

    fs.writeFileSync(
      file,
      JSON.stringify(data, null, 2)
    );

    console.log(
      "Exportado JSON:",
      file
    );
  }

  if (csvIndex !== -1) {

    const file =
      args[csvIndex + 1];

    const parser =
      new Parser();

    const csv =
      parser.parse(data);

    fs.writeFileSync(file, csv);

    console.log(
      "Exportado CSV:",
      file
    );
  }
}

module.exports = exportData;
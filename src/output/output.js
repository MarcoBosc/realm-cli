const printTable =
  require("./table");

const {
  getArgValue,
  hasFlag
} = require("../helpers/args");

function printOutput(data, args) {

  const format = getArgValue(
    args,
    "--format",
    "json"
  );

  const pretty =
    hasFlag(args, "--pretty");

  switch (format) {

    case "table":
      printTable(data);
      break;

    case "json":
    default:

      console.log(
        JSON.stringify(
          data,
          null,
          pretty ? 2 : 0
        )
      );
  }
}

module.exports = printOutput;
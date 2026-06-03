const Realm = require("realm");

const showHelp =
  require("./help/help");

const {
  VERSION
} = require("./constants/version");

const {
  getFlagIndex
} = require("./helpers/args");

const runQuery =
  require("./commands/query");

const listSchemas =
  require("./commands/schemas");

const describeSchema =
  require("./commands/describe");

async function run() {

  try {

  const args =
    process.argv.slice(2);

  if (
    args.includes("-v") ||
    args.includes("--version")
  ) {

    console.log(VERSION);

    process.exit(0);
  }

  if (
    args.includes("-h") ||
    args.includes("--help")
  ) {

    showHelp();

    process.exit(0);
  }

  const path = args[0];

  if (!path) {

    showHelp();

    process.exit(1);
  }

  const realm =
    await Realm.open({
      path,
      readOnly: true
    });

  const sIndex =
    getFlagIndex(
      args,
      "-s",
      "--schemas"
    );

  if (sIndex !== -1) {

    await listSchemas(
      realm,
      args
    );

    realm.close();

    process.exit(0);
  }

  const dIndex =
    getFlagIndex(
      args,
      "-d",
      "--describe"
    );

  if (dIndex !== -1) {

    const schemaName =
      args[dIndex + 1];

    await describeSchema(
      realm,
      schemaName,
      args
    );

    realm.close();

    process.exit(0);
  }

    const qIndex =
    getFlagIndex(
      args,
      "-q",
      "--query"
    );

  if (qIndex !== -1) {

    const schemaName =
      args[qIndex + 1];

    // Stop collecting query parts when we hit a flag
    const stopFlags = [
      "-h",
      "--help",
      "-v",
      "--version",
      "-s",
      "--schemas",
      "-d",
      "--describe",
      "-q",
      "--query",
      "--json",
      "--csv",
      "--limit",
      "--offset",
      "--format",
      "--pretty",
      "--select"
    ];

    const queryParts = [];

    for (
      let i = qIndex + 2;
      i < args.length;
      i++
    ) {

      if (
        stopFlags.includes(
          args[i]
        )
      ) {
        break;
      }

      queryParts.push(
        args[i]
      );
    }

    const query =
      queryParts.join(" ");

    await runQuery(
      realm,
      schemaName,
      query,
      args
    );

    realm.close();

    process.exit(0);
  }

  realm.close();

  showHelp();

  process.exit(1);
  } catch (error) {

    console.error(
      error.message
    );

    process.exit(1);
  }
}

run();
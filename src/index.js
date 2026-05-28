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

async function run() {

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

  const realm =
    await Realm.open({
      path,
      readOnly: true
    });

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
}

run();
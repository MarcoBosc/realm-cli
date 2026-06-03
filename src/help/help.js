const {
  VERSION
} = require("../constants/version");

function showHelp() {

  console.log(`
📦 Realm CLI Explorer v${VERSION}

Usage:
  realm-cli <path-to-database.realm> [options]

Commands:
  -s, --schemas
      List available schemas (tables) in the database

  -d, --describe <schema>
      Show schema structure and fields

  -q, --query <schema> <query>
      Execute a Realm query on a schema
      Examples:
        realm-cli db.realm -q User "age > 25"
        realm-cli db.realm -q User "active == true AND age >= 18"

Query Operators:
  - Comparison:
      =, ==, !=, >, <, >=, <=

  - Logical:
      AND, OR, NOT

  - Logical aliases:
      && (AND), || (OR), ! (NOT)

  - List filtering:
      IN

Date/Timestamp Filtering:
  Supported date literals (auto-converted to Date):
    YYYY-MM-DD
    YYYY/MM/DD
    YYYY-MM-DDTHH:mm:ss

  Examples:
    realm-cli db.realm -q AplicacaoV2 "data_inicial = 2026-06-01"
    realm-cli db.realm -q AplicacaoV2 "data_inicial = 2026/06/01"
    realm-cli db.realm -q AplicacaoV2 "data_inicial = 2026-06-01 AND data_final = 2026-06-30"

  Tip (day range):
    realm-cli db.realm -q AplicacaoV2 "data_inicial >= 2026-06-01 AND data_inicial < 2026-06-02"

Options:
  --format <json|table>
      Output format.
      Default: json
  Use --format table to print table output

  --pretty
      Pretty-print JSON output

  --select field1,field2
      Return only selected fields

  --json <file>
      Export results to JSON file

  --csv <file>
      Export results to CSV file

  --limit <n>
      Limit number of results
      Default: 20

  --offset <n>
      Skip first N results (pagination)

  -v, --version
      Show CLI version

  -h, --help
      Show this help message

Important Notes:
  - Expressions with special characters
    such as > or < must be wrapped in quotes

      Example:
        realm-cli db.realm -q User "age > 25"

  - Schema names are case-sensitive

      Correct:
        User

      Incorrect:
        user

  - Database is always opened in read-only mode
      (readOnly: true)

  - If no query is provided after -q <schema>,
    all records from the schema are returned
    (respecting --limit and --offset)

  - Use IN syntax for list filtering:

      realm-cli db.realm -q User 'uuid IN ["id1","id2"]'

Quick Examples:
  realm-cli db.realm -s

  realm-cli db.realm -d User

  realm-cli db.realm -q User "created_at >= 2025-01-01"

  realm-cli db.realm -q User "status = active OR status = pending"

  realm-cli db.realm -q User "NOT blocked == true"

  realm-cli db.realm -q User age=25 --pretty

  realm-cli db.realm -q User --select id,name,email --format table

`);
}

module.exports = showHelp;
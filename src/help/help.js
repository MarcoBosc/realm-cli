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
      Execute a Realm Query Language query on a schema
      Example:
        realm-cli db.realm -q User "age > 25"

  -i, --interactive
      Interactive shell mode.
      Type 'exit' to quit.
      Press TAB for schema autocomplete.

Options:
  --format <json|table>
      Output format.
      Default: json

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

  - Query syntax:
      realm-cli db.realm -q User "active == true AND age >= 18"

  - Use IN syntax for list filtering:

      realm-cli db.realm -q User 'uuid IN ["id1","id2"]'

Quick Examples:
  realm-cli db.realm -s

  realm-cli db.realm -d User

  realm-cli db.realm -q User "created_at >= '2025-01-01'"

  realm-cli db.realm -q User age=25 --pretty

  realm-cli db.realm -q User --select id,name,email --format table

`);
}

module.exports = showHelp;
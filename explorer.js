#!/usr/bin/env node

const Realm = require("realm");
const Table = require("cli-table3");
const fs = require("fs");
const { Parser } = require("json2csv");
const readline = require("readline");

// fallback sem chalk
const chalk = {
  red: (t) => t,
  green: (t) => t,
  blue: (t) => t,
  yellow: (t) => t,
  cyan: (t) => t,
  gray: (t) => t,
};

// ------------------ HELPERS ------------------

function getFlagIndex(args, short, long) {
  const shortIndex = args.indexOf(short);
  if (shortIndex !== -1) return shortIndex;
  return args.indexOf(long);
}

// ------------------ QUERY NORMALIZER ------------------

function normalizeQuery(q) {
  if (!q) return q;

  return q
    // = -> ==
    .replace(/(\w+)\s*=\s*([^\s]+)/g, (_, field, value) => {
      return `${field} == ${value}`;
    })

    // auto aspas
    .replace(/(\w+)\s*==\s*([^\s'"]+)/g, (_, field, value) => {
      if (value.startsWith("'") || value.startsWith('"')) return `${field} == ${value}`;
      if (!isNaN(value)) return `${field} == ${value}`;
      if (value === "true" || value === "false") return `${field} == ${value}`;
      if (value === "null") return `${field} == ${value}`;

      return `${field} == '${value}'`;
    });
}

// ------------------ TABELA ------------------

function formatValue(val) {
  if (val === null || val === undefined) return "";

  if (Array.isArray(val)) {
    if (val.length > 5) {
      return `[${val.slice(0, 3).join(", ")} ... +${val.length - 3}]`;
    }
    return JSON.stringify(val);
  }

  if (typeof val === "object") {
    return JSON.stringify(val).slice(0, 50) + "...";
  }

  if (typeof val === "string") {
    if (val.length > 50) {
      return val.slice(0, 50) + "...";
    }
  }

  return val;
}

function printTable(data) {
  if (!data.length) {
    console.log("Sem resultados.");
    return;
  }

  const keys = Object.keys(data[0]);

  const table = new Table({
    head: keys,
    colWidths: keys.map(() => 30),
    wordWrap: true,
  });

  data.forEach(row => {
    table.push(keys.map(k => formatValue(row[k])));
  });

  console.log(table.toString());
}

// ------------------ EXPORT ------------------

function exportData(data, args) {
  const jsonIndex = args.indexOf("--json");
  const csvIndex = args.indexOf("--csv");

  if (jsonIndex !== -1) {
    const file = args[jsonIndex + 1];
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(chalk.green("Exportado JSON:"), file);
  }

  if (csvIndex !== -1) {
    const file = args[csvIndex + 1];
    const parser = new Parser();
    const csv = parser.parse(data);
    fs.writeFileSync(file, csv);
    console.log(chalk.green("Exportado CSV:"), file);
  }
}

// ------------------ PAGINAÇÃO ------------------

function paginate(results, args) {
  const limitIndex = args.indexOf("--limit");
  const offsetIndex = args.indexOf("--offset");

  const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) : 20;
  const offset = offsetIndex !== -1 ? parseInt(args[offsetIndex + 1]) : 0;

  return results.slice(offset, offset + limit);
}

// ------------------ INTERATIVO ------------------

async function interactiveMode(realm) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: (line) => {
      const schemas = realm.schema.map(s => s.name);
      const hits = schemas.filter(s => s.startsWith(line));
      return [hits.length ? hits : schemas, line];
    }
  });

  console.log("\nModo interativo. Digite 'exit' para sair.\n");

  rl.on("line", (input) => {
    if (input.trim() === "exit") {
      rl.close();
      return;
    }

    try {
      const [schema, ...queryParts] = input.split(" ");
      const query = normalizeQuery(queryParts.join(" "));

      let results = realm.objects(schema);

      if (query) {
        results = results.filtered(query);
      }

      const data = results.slice(0, 20).map(r => ({ ...r }));
      printTable(data);

    } catch (err) {
      console.log("Erro:", err.message);
    }
  });
}

// ------------------ HELP ------------------

function showHelp() {
  console.log(`
📦 Realm CLI Explorer

Uso:
  realm-cli <db.realm> [opções]

Comandos:

  -s, --schemas
    Lista schemas

  -d, --describe <schema>
    Mostra campos

  -q, --query <schema> <query>
    Executa query

  -i, --interactive
    Modo interativo

Opções:

  --json <arquivo>
  --csv <arquivo>
  --limit <n>
  --offset <n>

  -h, --help
    Ajuda

Exemplos:

  realm-cli db.realm -s
  realm-cli db.realm -d Usuario
  realm-cli db.realm -q Usuario age=25
  realm-cli db.realm -q Usuario email=inovacao@teste.com
  realm-cli db.realm -i

⚠️ Use \\> para comparações:
  age \\> 25
`);
}

// ------------------ MAIN ------------------

async function run() {
  const args = process.argv.slice(2);

  // HELP
  if (args.includes("-h") || args.includes("--help")) {
    showHelp();
    process.exit(0);
  }

  if (args.length < 1) {
    showHelp();
    process.exit(1);
  }

  const path = args[0];

  try {
    const realm = await Realm.open({ path, readOnly: true });
    const schemas = realm.schema;

    // INTERATIVO
    if (args.includes("-i") || args.includes("--interactive")) {
      await interactiveMode(realm);
      return;
    }

    // SCHEMAS
    if (args.includes("-s") || args.includes("--schemas")) {
      console.log("\n=== SCHEMAS ===");
      schemas.forEach((s, i) => console.log(`[${i}] ${s.name}`));
      realm.close();
      return;
    }

    // DESCRIBE
    const dIndex = getFlagIndex(args, "-d", "--describe");
    if (dIndex !== -1) {
      const schemaName = args[dIndex + 1];
      const schema = schemas.find(s => s.name === schemaName);

      if (!schema) {
        console.log("Schema não encontrado.");
        process.exit(1);
      }

      console.log(`\n=== CAMPOS DE ${schemaName} ===`);
      Object.entries(schema.properties).forEach(([k, v]) => {
        console.log(`${k}: ${JSON.stringify(v)}`);
      });

      realm.close();
      return;
    }

    // QUERY
    const qIndex = getFlagIndex(args, "-q", "--query");
    if (qIndex !== -1) {
      const schemaName = args[qIndex + 1];

      const stopFlags = ["--json", "--csv", "--limit", "--offset"];
      const queryParts = [];

      for (let i = qIndex + 2; i < args.length; i++) {
        if (stopFlags.includes(args[i])) break;
        queryParts.push(args[i]);
      }

      const query = normalizeQuery(queryParts.join(" "));

      let results = realm.objects(schemaName);

      if (query) {
        results = results.filtered(query);
      }

      const data = paginate(results, args).map(r => ({ ...r }));

      console.log(`\n=== RESULTADOS (${schemaName}) ===`);
      console.log(`Filtro: ${query}\n`);

      printTable(data);
      exportData(data, args);

      realm.close();
      return;
    }

    console.log("Nenhuma flag válida usada.");
    realm.close();

  } catch (err) {
    console.error("Erro:", err.message);
  }
}

run();
[![Português](https://img.shields.io/badge/lang-Português-green.svg)](README.pt-BR.md)


# 📦 Realm CLI Explorer

CLI tool to explore **.realm** databases directly from the terminal quickly and efficiently.

Perfect for debugging, reverse engineering, data analysis, and mobile app inspection.

---

# ✨ Features

* 📋 List schemas (tables)
* 🔍 Inspect data structures
* 🔎 Execute queries (Realm Query Language)
* 📊 Table visualization in terminal
* 📄 Result pagination
* 📤 Export to JSON and CSV
* 💻 Interactive shell mode
* ⚡ Schema autocomplete (TAB)

---

# 📁 Project Structure

```bash
realm-cli/
├── bin/
│   └── realm-cli.js
│
├── src/
│   ├── constants/
│   │   └── version.js
│   │
│   ├── helpers/
│   │   ├── args.js
│   │   ├── pagination.js
│   │   └── serializer.js
│   │
│   ├── query/
│   │   ├── normalize.js
│   │   └── builder.js
│   │
│   ├── output/
│   │   ├── table.js
│   │   ├── output.js
│   │   └── export.js
│   │
│   ├── interactive/
│   │   └── interactive.js
│   │
│   ├── commands/
│   │   ├── schemas.js
│   │   ├── describe.js
│   │   └── query.js
│   │
│   ├── help/
│   │   └── help.js
│   │
│   └── index.js
│
├── package.json
├── install.sh
└── README.md
````

---

# 🚀 Installation

## 🔹 1. Clone or download

```bash
git clone <repo-url>
cd realm-cli
```

---

## 🔹 2. Install dependencies

```bash
npm install
```

---

## 🔹 3. Install as global command

```bash
chmod +x install.sh
./install.sh
```

This will:

* copy the CLI to `~/.realm-cli`
* install dependencies automatically
* create the global command `realm-cli`

---

## ✅ Test installation

```bash
realm-cli --help
```

or:

```bash
realm-cli path/to/database.realm -s
```

---

# 🧪 Basic Usage

## Syntax

```bash
realm-cli <path-to-database.realm> [options]
```

---

# 📚 Commands

## 🔹 List schemas

```bash
realm-cli database.realm -s
```

---

## 🔹 View schema fields

```bash
realm-cli database.realm -d User
```

---

## 🔹 Execute query

```bash
realm-cli database.realm -q User age \> 25
```

---

## 💻 Interactive mode

```bash
realm-cli database.realm -i
```

### Example inside interactive mode:

```bash
User age > 25
```

---

# 📊 Table Output

Results are automatically displayed in a table format:

```
┌────────┬──────┐
│ name   │ age  │
├────────┼──────┤
│ John   │ 30   │
│ Maria  │ 25   │
└────────┴──────┘
```

---

# 📄 Pagination

Limit results:

```bash
realm-cli database.realm -q User age \> 18 --limit 10
```

Skip records:

```bash
realm-cli database.realm -q User age \> 18 --offset 20
```

---

# 📤 Export

## JSON

```bash
realm-cli database.realm -q User age \> 18 --json output.json
```

---

## CSV

```bash
realm-cli database.realm -q User age \> 18 --csv output.csv
```

---

# 🔍 Query Examples

## Comparisons

```bash
realm-cli database.realm -q User age \> 18
realm-cli database.realm -q User age <= 30
```

---

## Strings

```bash
realm-cli database.realm -q User name == "John"
realm-cli database.realm -q User name BEGINSWITH "Ma"
realm-cli database.realm -q User name CONTAINS "smith"
```

---

## Multiple conditions

```bash
realm-cli database.realm -q User age \> 18 AND age < 30
```

---

## Booleans

```bash
realm-cli database.realm -q User active == true
```

---

# ⚠️ Important Notes

## 🔸 1. The `>` operator

The terminal interprets `>` as redirection.

### ❌ Wrong:

```bash
realm-cli database.realm -q User age > 25
```

### ✅ Correct:

```bash
realm-cli database.realm -q User age \> 25
```

or:

```bash
realm-cli database.realm -q User "age > 25"
```

---

## 🔸 2. Schema names are case-sensitive

```bash
User ✅
user ❌
```

---

## 🔸 3. Read-only database mode

The tool uses:

```js
readOnly: true
```

👉 No data will be modified

---

## 🔸 4. Paths with spaces

```bash
realm-cli "~/Downloads/my database.realm" -s
```

---

## 🔸 5. Default limit

If not specified:

```bash
--limit 20
```

---

# 💻 Interactive Mode Tips

Inside interactive mode:

* Press **TAB** for autocomplete

* Use direct queries:

  ```bash
  User age > 30
  ```

* Type:

  ```bash
  exit
  ```

  to quit

---

# 🛠️ Troubleshooting

## ❌ Error: module not found

```bash
cd ~/.realm-cli
npm install
```

---

## ❌ Permission error

```bash
chmod +x install.sh
```

---

## ❌ Command not found

```bash
ls /usr/local/bin/realm-cli
```

If it does not exist:

```bash
./install.sh
```

---

## ❌ Problems with old dependencies

```bash
rm -rf ~/.realm-cli
./install.sh
```

---

# 💡 Advanced Tips

### 🔹 Use with large files

```bash
realm-cli db.realm -q User --limit 50
```

---

### 🔹 Help

```bash
realm-cli db.realm -h
```

---

### 🔹 Export data for analysis

```bash
realm-cli db.realm -q User --csv data.csv
```

---

### 🔹 Quickly inspect an unknown database

```bash
realm-cli db.realm -s
realm-cli db.realm -d SchemaName
```

---

### 🔹 Use as an analysis tool

* mobile app reverse engineering
* local database debugging
* data auditing

---

# 🔮 Roadmap

* Field autocomplete
* SQL-style parser (`SELECT * FROM`)
* Command history
* Query highlighting
* Automatic timestamped exports

---

# 📄 License

By Marco Boschetti

```

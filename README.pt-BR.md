[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)


# 📦 Realm CLI Explorer

Ferramenta CLI para explorar bancos **.realm** diretamente pelo terminal de forma rápida e prática.

Ideal para debug, engenharia reversa, análise de dados e inspeção de apps mobile.

---

# ✨ Funcionalidades

* 📋 Listar schemas (tabelas)
* 🔍 Inspecionar estrutura de dados
* 🔎 Executar queries (Realm Query Language)
* 📊 Visualização em tabela no terminal
* 📄 Paginação de resultados
* 📤 Exportação para JSON e CSV
* 💻 Modo interativo (tipo shell)
* ⚡ Autocomplete de schemas (TAB)

---

# 📁 Estrutura do Projeto

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
```

---

# 🚀 Instalação

## 🔹 1. Clonar ou baixar

```bash
git clone <repo-url>
cd realm-cli
```

---

## 🔹 2. Instalar dependências

```bash
npm install
```

---

## 🔹 3. Instalar como comando global

```bash
chmod +x install.sh
./install.sh
```

Isso irá:

* copiar o CLI para `~/.realm-cli`
* instalar dependências automaticamente
* criar o comando global `realm-cli`

---

## ✅ Testar instalação

```bash
realm-cli --help
```

ou:

```bash
realm-cli caminho/do/banco.realm -s
```

---

# 🧪 Uso básico

## Sintaxe

```bash
realm-cli <caminho-do-banco.realm> [opções]
```

---

# 📚 Comandos

## 🔹 Listar schemas

```bash
realm-cli banco.realm -s
```

---

## 🔹 Ver campos de um schema

```bash
realm-cli banco.realm -d Usuario
```

---

## 🔹 Executar query

```bash
realm-cli banco.realm -q Usuario age \> 25
```

---

## 💻 Modo interativo

```bash
realm-cli banco.realm -i
```

### Exemplo dentro do modo:

```bash
Usuario age > 25
```

---

# 📊 Output em tabela

Os resultados são exibidos automaticamente em formato tabular:

```
┌────────┬──────┐
│ name   │ age  │
├────────┼──────┤
│ João   │ 30   │
│ Maria  │ 25   │
└────────┴──────┘
```

---

# 📄 Paginação

Limitar resultados:

```bash
realm-cli banco.realm -q Usuario age \> 18 --limit 10
```

Pular registros:

```bash
realm-cli banco.realm -q Usuario age \> 18 --offset 20
```

---

# 📤 Exportação

## JSON

```bash
realm-cli banco.realm -q Usuario age \> 18 --json output.json
```

---

## CSV

```bash
realm-cli banco.realm -q Usuario age \> 18 --csv output.csv
```

---

# 🔍 Exemplos de Query

## Comparações

```bash
realm-cli banco.realm -q Usuario age \> 18
realm-cli banco.realm -q Usuario age <= 30
```

---

## Strings

```bash
realm-cli banco.realm -q Usuario name == "João"
realm-cli banco.realm -q Usuario name BEGINSWITH "Ma"
realm-cli banco.realm -q Usuario name CONTAINS "silva"
```

---

## Condições múltiplas

```bash
realm-cli banco.realm -q Usuario age \> 18 AND age < 30
```

---

## Booleanos

```bash
realm-cli banco.realm -q Usuario ativo == true
```

---

# ⚠️ Observações Importantes

## 🔸 1. Operador `>`

O terminal interpreta `>` como redirecionamento.

### ❌ Errado:

```bash
realm-cli banco.realm -q Usuario age > 25
```

### ✅ Correto:

```bash
realm-cli banco.realm -q Usuario age \> 25
```

ou:

```bash
realm-cli banco.realm -q Usuario "age > 25"
```

---

## 🔸 2. Nome do schema é case-sensitive

```bash
Usuario ✅
usuario ❌
```

---

## 🔸 3. Banco em modo leitura

A ferramenta usa:

```js
readOnly: true
```

👉 Nenhum dado será alterado

---

## 🔸 4. Caminhos com espaços

```bash
realm-cli "~/Downloads/meu banco.realm" -s
```

---

## 🔸 5. Limite padrão

Se não definido:

```bash
--limit 20
```

---

# 💻 Modo Interativo (dicas)

Dentro do modo interativo:

* Pressione **TAB** para autocomplete
* Use queries diretas:

  ```bash
  Usuario age > 30
  ```
* Digite:

  ```bash
  exit
  ```

  para sair

---

# 🛠️ Troubleshooting

## ❌ Erro: módulo não encontrado

```bash
cd ~/.realm-cli
npm install
```

---

## ❌ Erro de permissão

```bash
chmod +x install.sh
```

---

## ❌ Comando não encontrado

```bash
ls /usr/local/bin/realm-cli
```

Se não existir:

```bash
./install.sh
```

---

## ❌ Problemas com dependências antigas

```bash
rm -rf ~/.realm-cli
./install.sh
```

---

# 💡 Dicas avançadas

### 🔹 Usar com arquivos grandes

```bash
realm-cli db.realm -q Usuario --limit 50
```

---

### 🔹 Help

```bash
realm-cli db.realm -h
```

---

### 🔹 Exportar dados para análise

```bash
realm-cli db.realm -q Usuario --csv dados.csv
```

---

### 🔹 Explorar rapidamente um banco desconhecido

```bash
realm-cli db.realm -s
realm-cli db.realm -d NomeDoSchema
```

---

### 🔹 Usar como ferramenta de análise

* engenharia reversa de apps mobile
* debug de banco local
* auditoria de dados

---

# 🔮 Roadmap (futuro)

* Autocomplete de campos
* Parser estilo SQL (`SELECT * FROM`)
* Histórico de comandos
* Highlight de query
* Export automático com timestamp

---

# 📄 Licença

By Marco Boschetti

const {
  VERSION
} = require("../constants/version");

function showHelp() {

  console.log(`
📦 Realm CLI Explorer v${VERSION}

Uso:
  realm-cli <caminho-para-banco.realm> [opções]

Comandos:
  -s, --schemas
      Lista schemas (tabelas) disponíveis no banco

  -d, --describe <schema>
      Mostra a estrutura (campos) do schema informado

  -q, --query <schema> <query>
      Executa uma query em Realm Query Language sobre o schema
      Ex.: realm-cli db.realm -q Usuario "age > 25"

  -i, --interactive
      Modo interativo (shell). Digite 'exit' para sair. Tab para autocomplete de schemas

Opções:
  --format <json|table>
      Formato de saída. Padrão: json

  --pretty
      Indenta o JSON de saída

  --select campo1,campo2
      Seleciona apenas campos específicos no resultado

  --json <arquivo>
      Exporta o resultado para um arquivo JSON

  --csv <arquivo>
      Exporta o resultado para um arquivo CSV

  --limit <n>
      Limita número de resultados (padrão: 20)

  --offset <n>
      Pula os primeiros N registros (paginação)

  -v, --version
      Mostra versão

  -h, --help
      Mostra essa ajuda

Observações importantes:
  - Operadores e expressões com caracteres especiais (ex: >, <) devem ser passados entre aspas
      Ex.: realm-cli db.realm -q Usuario "age > 25"
  - Nome do schema é case-sensitive
      Ex.: Usuario (correto) != usuario
  - O CLI abre o banco em modo somente leitura (readOnly: true)
  - Quando usar -q, informe primeiro o schema, depois a query:
      realm-cli db.realm -q Usuario "active == true AND age >= 18"
  - Para queries com listas use sintaxe IN:
      realm-cli db.realm -q Usuario 'uuid IN ["id1","id2"]'

Exemplos rápidos:
  realm-cli db.realm -s
  realm-cli db.realm -d Usuario
  realm-cli db.realm -q Usuario "created_at >= '2025-01-01'"
  realm-cli db.realm -q Usuario age=25 --pretty
  realm-cli db.realm -q Usuario --select id,name,email --format table

`);
}

module.exports = showHelp;

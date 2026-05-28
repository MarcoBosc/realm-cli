#!/bin/bash

set -e

INSTALL_DIR="$HOME/.realm-cli"
BIN_PATH="/usr/local/bin/realm-cli"

echo "🔍 Verificando Node.js..."

if ! command -v node &> /dev/null; then
  echo "❌ Node.js não encontrado."
  exit 1
fi

NODE_PATH=$(which node)

echo "📁 Instalando..."

mkdir -p "$INSTALL_DIR"

cp -R \
  bin \
  src \
  package.json \
  "$INSTALL_DIR/"

sudo tee "$BIN_PATH" > /dev/null <<EOF
#!/bin/bash
"$NODE_PATH" "$INSTALL_DIR/bin/realm-cli.js" "\$@"
EOF

sudo chmod +x "$BIN_PATH"

echo "🎉 Instalado!"

echo "🚀 Use 'realm-cli --help' para começar."
#!/bin/bash

set -e

INSTALL_DIR="$HOME/.realm-cli"
BIN_PATH="/usr/local/bin/realm-cli"

echo "🔍 Verificando Node.js..."

if ! command -v node &> /dev/null; then
  echo "❌ Node.js não encontrado. Instale antes de continuar."
  exit 1
fi

NODE_PATH=$(which node)
echo "✅ Node encontrado em: $NODE_PATH"

echo "📁 Instalando em $INSTALL_DIR..."

mkdir -p "$INSTALL_DIR"

# copia arquivos
cp explorer.js "$INSTALL_DIR/"

echo "⚙️ Criando comando global..."

sudo tee "$BIN_PATH" > /dev/null <<EOF
#!/bin/bash
"$NODE_PATH" "$INSTALL_DIR/explorer.js" "\$@"
EOF

sudo chmod +x "$BIN_PATH"

echo "🎉 Instalado com sucesso!"
echo ""
echo "Use assim:"
echo "  realm-cli banco.realm -s"
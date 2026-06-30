#!/bin/bash

set -e

INSTALL_DIR="$HOME/.realm-cli"
BIN_PATH="/usr/local/bin/realm-cli"

echo "🔍 Verificando Node.js..."

if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js não encontrado."
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "❌ npm não encontrado."
    exit 1
fi

NODE_PATH="$(command -v node)"

echo "📁 Instalando..."

rm -rf "$INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

cp -R \
    bin \
    src \
    package.json \
    "$INSTALL_DIR/"

if [ -f package-lock.json ]; then
    cp package-lock.json "$INSTALL_DIR/"
fi

echo "📦 Instalando dependências..."

cd "$INSTALL_DIR"

if [ -f package-lock.json ]; then
    npm ci --omit=dev
else
    npm install --omit=dev
fi

echo "🔗 Criando comando..."

sudo tee "$BIN_PATH" >/dev/null <<EOF
#!/bin/bash
exec "$NODE_PATH" "$INSTALL_DIR/bin/realm-cli.js" "\$@"
EOF

sudo chmod +x "$BIN_PATH"

echo "🎉 Instalação concluída!"
echo
echo "🚀 Execute:"
echo "   realm-cli --help"
#!/bin/bash
set -e
echo "Installing Rustup..."
# Install Rustup (compiler)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# Adding binaries to path
if [ -f "$HOME/.cargo/env" ]; then
  source "$HOME/.cargo/env"
elif [ -f "/rust/env" ]; then
  source "/rust/env"
else
  echo "Error: Could not find Rust environment file"
  exit 1
fi
# Rustup may adopt a pre-existing Rust install (e.g. Vercel's build image) instead of
# doing a fresh install, in which case the wasm32 target isn't added automatically.
rustup target add wasm32-unknown-unknown
echo "Installing wasm-pack..."
# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y
echo "Building wasm-parser..."
# Build wasm-parser
pnpm run build:wasm
# Build next
echo "Building next..."
pnpm run build:next

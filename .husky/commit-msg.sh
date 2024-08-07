#!/bin/sh

echo "Ejecutando commit-msg hook"

# Llamar al script de validación del mensaje de commit
if ! sh .husky/validate-commit-msg.sh "$1"; then
  echo "Validación del mensaje de commit falló"
  exit 1
fi

echo "Commit-msg hook finalizado con éxito"

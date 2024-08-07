#!/bin/sh

# Obtener el mensaje del commit
commit_msg=$(cat "$1")
echo "Mensaje de commit: $commit_msg"

# Verificar el formato del mensaje de commit
echo "Verificando formato del mensaje de commit"
if ! echo "$commit_msg" | grep -Eq '^(\w+)\(\w+#\d+\): .+$'; then
  echo "Error: El formato del mensaje de commit es incorrecto. Debe ser de la forma 'type(scope#123): description'."
  exit 1
fi

# Extraer el número del commit usando una expresión regular
commit_number=$(echo "$commit_msg" | grep -Eo '#\d+' | tr -d '#')
echo "Número de commit: $commit_number"

# Verificar si el número de commit ya se ha utilizado en el historial de commits
echo "Verificando si el número de commit ya ha sido utilizado en el historial de commits"
matching_commits=$(git log --oneline --grep="#$commit_number")
echo "Commits coincidentes: $matching_commits"

if [ -n "$matching_commits" ]; then
  echo "Error: El número de commit #$commit_number ya ha sido utilizado."
  exit 1
fi

echo "Validación del número de commit completada con éxito"
log
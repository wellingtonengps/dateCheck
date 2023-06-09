#!/bin/bash

# Defina a URL da API e a data que deseja verificar
API_URL="http://localhost:3000/datas/check"
DATE="10-02"

# Faz a chamada para a API usando o comando curl
response=$(curl -s "$API_URL/$DATE")

# Verifica a resposta da API
if [[ $response == true ]]; then
  echo "A data $DATE foi encontrada na API."
else
  echo "A data $DATE não foi encontrada na API."
fi
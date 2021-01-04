#Objetivo:
Definir una API para gestionar nuestro equipo Pokémon

#Acciones:
- Identificarnos
- Añadir pokémon a nustro equipo
- Eliminar pokémon a nustro equipo
. Eliminar pokémon de nustro equipo
- Consultar información de nuestro equipo
- Intercambiar el orden de nuestros Pokémon

#REST Design:
- Añadir Pokémon: POST /team/pokemons
- Consultar Equipo: GET /team
- Eliminar Pokémon: DELETE /team/pokemons/:id
- Intercambiar el orden de nuestros pokémon: PUT /team
- Sistema de credenciales
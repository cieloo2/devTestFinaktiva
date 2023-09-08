# Log Saver
## Resumen
El fragmento de código es una parte de un servidor Express.js que se conecta a una base de datos MongoDB y registra cada solicitud y respuesta. Define tres API endpoints: '/query', '/query/methods', y '/query/dates'. Cada endpoint recupera datos de la colección 'logs' en la base de datos MongoDB y devuelve los resultados como una respuesta JSON.

## Análisis de código
### Entradas
El fragmento de código requiere las siguientes entradas:
- URI de MongoDB: Establece la variable `mongoURI` al URI de MongoDB.
- Nombre de la base de datos: Establece la variable `dbName` con el nombre de la base de datos.
___
### Flujo
1. El código inicializa un servidor Express.js y configura el middleware para JSON parsing, CORS, y logging usando Morgan.
2. 2. Se conecta a la base de datos MongoDB usando el URI y el nombre de la base de datos proporcionados.
3. El código define una función middleware que registra cada petición y respuesta. Crea un objeto log con el timestamp, endpoint, método, cuerpo de la petición, e inicializa la respuesta como null.
4. El middleware registra la solicitud y la pasa al siguiente middleware o ruta.
5. Cuando la respuesta finaliza, el middleware actualiza el objeto log con el código de estado de la respuesta y el cuerpo, y guarda el log en la colección MongoDB.
6. El código define tres puntos finales de la API: '/query', '/query/methods', y '/query/dates'.
7. El endpoint '/query' recupera todos los documentos de la colección 'logs' y los devuelve como respuesta JSON.
8. El punto final "/query/methods" recupera los documentos de la colección "logs" basándose en el método 
___
### Outputs
El fragmento de código inicia el servidor Express.js y escucha en el puerto especificado. Registra el estado de ejecución del servidor y cualquier error que ocurra durante la conexión MongoDB. Los puntos finales de API devuelven respuestas JSON que contienen los datos solicitados de la colección de "registros".
___

# Basic-express
Basic  API in express with typescript and mongoDB

## Commands

```bash
npm run dev # Levanta API en local y escucha cambios para desarrollo
npm run tsc # Genera build
```

ref: https://github.com/microsoft/TypeScript-Node-Starter

## Resumen
- Uso de typescript
- Uso de Express
- Uso mongoDB y mongosee
- Uso de typegoose para creacion de modelos
- Uso de passport y jsonwebtoken para securizacion
- Uso de redis como motor de cache y gestor de sesiones

## Redis
### Crear instancia
- Descarga: ´docker pull redis´
- Levantar: ´docker run -d --name <CONTAINER_NAME> -p 127.0.0.1:6379:6379 redis´

### Verificacion
- docker exec -it <CONTAINER_NAME|ID> sh
- redis-cli
- ping

## Extensiones visual studio
- MongoDB for VS Code
- Redis (Redis Client For VSCode)
- Docker
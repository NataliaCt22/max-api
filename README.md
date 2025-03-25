## Getting started

Install project dependecies
```yarn install```

Add wrangler
```yarn global add wrangler```

Make sure you have the most recent version of wrangler
```npm update -g wrangler```

### Create schema
```$ wrangler d1 execute hono_db --file ./src/schema.sql --local```
#### Replace DB variables in the wrangler.jsonc file
```
binding = "DB"
database_name = "hono_db"
database_id = "ddd-ddd-ddd"
```

### Verify tables were created
```$ wrangler d1 execute hono_db --command "SELECT name FROM sqlite_master WHERE type='table';" ```

### Run server
```$ yarn start```

## TEST using POSTMAN
Import POSTMAN collection from "postman.json" file located in the root of this folder.

### Run unit test
```yarn test```
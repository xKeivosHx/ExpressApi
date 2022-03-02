//Instanciamos a cors
const cors = require('cors');

// traemos a express
const express = require('express');

//Instanciamos las rutas
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/errorHandler');

// creamos una aplicación
const app = express();

// le decimos el puerto en que queremos que corra la aplicación
const port = process.env.PORT || 3000;

//Middleware nativo para recibir información en formato json
app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com'];
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.get('/', async (request, response, next) => {
  try {
    response.send('Hola mi server en express');
  } catch (error) {
    next(error);
  }
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// le decimos a la aplicación en que puesto escuchar
// además creamos un callback que nos avisará cuando esté corriendo
app.listen(port, () => {
  console.log('Corriendo en puerto:' + port);
});

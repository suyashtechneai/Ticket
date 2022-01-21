// index.js
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' })
const db = require('./db/conn');

// const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const expressOasGenerator = require('express-oas-generator');

const cors = require('cors');

// set up port
const PORT = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./src/router/*.js'], 
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(openapiSpecification));
app.use(express.json());
// app.use(cors({origin: 'http://10.2.3.99:3000'}));

// add routes
const authenticate = require('./middleware/authenticate');
const Auth = require('./router/auth');
const CommunicationDetails = require('./router/communicationdetails');
const SettingDetail = require('./router/settingdetail');
const MenuRoleMapping = require('./router/menurolemapping');
const SearchModule = require('./router/searchmodule');
const Session = require('./router/session');
const swaggerJSDoc = require('swagger-jsdoc');

// set up port
expressOasGenerator.init(app, {}); // to overwrite generated specification's values use second argument.

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Credentials", "true");
  // res.header("Access-Control-Allow-Methods", "*");

  //  // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Access-Control-Allow-Origin");

  // res.header("Access-Control-Allow-Headers", "*");
  
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS');
      next();
});


// app.use(express.json());
// app.use(cors());

// app.use(cors({
//   origin: '*'
// }))
app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(require('./router/auth'));

app.use('/api', Auth);

// MASTERS
app.use('/countryMaster', require('./router/MastersApi/CountryMaster'));
app.use('/stateMaster', require('./router/MastersApi/StateMaster'));
app.use('/cityMaster', require('./router/MastersApi/CityMaster'));

app.use('/designationMaster', require('./router/MastersApi/DesignationMaster'));
app.use('/departmentMaster', require('./router/MastersApi/DepartmentMaster'));

app.use('/roleMaster', require('./router/MastersApi/RoleMaster'));

app.use('/communicationDetails', CommunicationDetails);

app.use('/employeeMaster', require('./router/MastersApi/EmployeeMaster'));
app.use('/settingDetail', SettingDetail);
app.use('/settingMaster', require('./router/MastersApi/SettingMaster'));
app.use('/menuMaster', require('./router/MastersApi/MenuMaster'));
app.use('/tenantMaster', require('./router/MastersApi/TenantMaster'));
app.use('/menuRoleMapping', MenuRoleMapping);
app.use('/customerMaster', require('./router/MastersApi/CustomerMaster'));
app.use('/session', Session);
app.use('/statusMaster',  require('./router/MastersApi/StatusMaster'));
app.use('/userMaster',  require('./router/userMaster'));
app.use('/ticketMaster',  require('./router/ticketMaster'));
app.use('/dynamicFormMaster',  require('./router/MastersApi/DynamicFormMaster'));
app.use('/createForm', require('./router/createform'));

app.use('/TicketTask', require('./router/Ticket/TicketTask'));
app.use('/ticketTaskCard', require('./router/Ticket/TicketTaskCard'));
app.use('/ticketTaskTimer', require('./router/Ticket/TicketTaskTimer'));

app.use('/searchModule', SearchModule);

//Started
console.log('Node Started');

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`) );
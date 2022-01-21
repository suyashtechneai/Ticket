const dotenv = require('dotenv');
const express = require('express');
const app = express();

const cors = require('cors');

dotenv.config({ path: './config.env' })
const db = require('./db/conn');

app.use(cors({
    origin: 'http://localhost:3000'
}))

const authenticate = require('./middleware/authenticate');
// const RoleMaster = require('./router/rolemaster');
// const CommunicationDetails = require('./routes/communicationdetails');
const DepartmentMaster = require('./router/departmentmaster');
const DesignationMaster = require('./router/designationmaster');
// const EmployeeMaster = require('./routes/employeemaster');
// const SettingDetail = require('./routes/settingdetail');
// const SettingMaster = require('./routes/settingmaster');
// const MenuMaster = require('./routes/menumaster');
// const TenantMaster = require('./routes/tenantmaster');
// const MenuRoleMapping = require('./routes/menurolemapping');
// const CustomerMaster = require('./routes/customermaster');
// const Session = require('./routes/session');

app.use(express.json());

//Routes
app.use(require('./router/auth'));
// app.use('/rolemaster', RoleMaster);
// app.use('/communicationdetails', CommunicationDetails);
app.use('/departmentmaster', DepartmentMaster);
app.use('/designationmaster', DesignationMaster);
// app.use('/employeemaster', EmployeeMaster);
// app.use('/settingdetail', SettingDetail);
// app.use('/settingmaster', SettingMaster);
// app.use('/menumaster', MenuMaster);
// app.use('/tenantmaster', TenantMaster);
// app.use('/menurolemapping', MenuRoleMapping);
// app.use('/customermaster', CustomerMaster);
// app.use('/session', Session);


//Middleware
// const middleware = (req, res, next) => {
//     console.log('Middleware Hited');
//     next();
// }

app.get('/', authenticate.Authenticate, (req, res) => {
    res.send('Hello');
});

console.log('Node Started');

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
const express = require('express');
const account_routes = require('./routes/account_routes');
const transaction_routes = require('./routes/transaction_routes');
const utrans_routes = require('./routes/utransaction_routes');
const auth_routes = require('./routes/auth');
const authenticate = require('./middleware/authenticate');
const authorize = require('./middleware/authourize');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// mongodb connection
require('./start/db')();

app.use('/api/accounts', authenticate, authorize('admin', 'customer'), account_routes);

app.use('/api/transactions', authenticate, authorize('admin', 'customer'), transaction_routes);

app.use('/api/userTrans', authenticate, authorize('admin', 'customer'), utrans_routes);

app.use('/api/auth', auth_routes);



// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
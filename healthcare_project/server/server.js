'use strict';

const connect = require("./connect");
const path = require('path');
var express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var dateTime = require('node-datetime');
const console = require("console");
const mysql = require('mysql');
var app = express();
//const db = connect.db;
const CHANNEL = 'mychannel';
const CONTRACT = 'medicalHistory';

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs')

/**db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('MYSQL connected...')
    }
}) **/
// connect to aws RDS
const db = mysql.createConnection({
  host     : "m",
  user     : "admin",
  password : " ",
  port     : "3306"
});

db.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  db.query('USE fyp_healthcare')
  console.log('Connected to fyp_healthcare database.');
});


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: false
}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());



// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session
app.use(sessions({
    secret: "fyp_healthcare",
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay
    },
    resave: false
}));

// cookie parser middleware
app.use(cookieParser());

// a variable to save a session
var session;


/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      add                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////

async function add(res, diagnosis, detail, date, time, doctor, doctor_id, patient_id) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Submit the specified transaction.
        const result = await contract.submitTransaction('createDiagnosisss', diagnosis, detail, date, time, doctor, doctor_id, patient_id, '');
        console.log('Transaction has been submitted');
        console.log('result \n' + result);

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.result;

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function addMedications(res, diagnosissNumber, medicine, unit, quantity) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Submit the specified transaction.
        await contract.submitTransaction('addMedications', diagnosissNumber, medicine, unit, quantity);
        console.log('Transaction has been submitted');

        res.end('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function addVaccine(res, diagnosissNumber, vaccine, reason, description, state, date, time) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Submit the specified transaction.
        await contract.submitTransaction('addVaccine', diagnosissNumber, vaccine, reason, description, state, date, time);
        console.log('Transaction has been submitted');

        res.end('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function addAdverse(res, diagnosissNumber, adverse_reaction, reason, description, state, date, time) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Submit the specified transaction.
        await contract.submitTransaction('addAdverse', diagnosissNumber, adverse_reaction, reason, description, state, date, time);
        console.log('Transaction has been submitted');

        res.end('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function addAllergy(res, diagnosissNumber, allergic_reaction, reason, description, state, date, time) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Submit the specified transaction.
        await contract.submitTransaction('addAllergy', diagnosissNumber, allergic_reaction, reason, description, state, date, time);
        console.log('Transaction has been submitted');

        res.end('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

        return true;

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Edit                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////

async function edit(res, diagnosissNumber, diagnosis, detail, date, time, doctor, doctor_id, patient_id) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Submit the specified transaction.
        const result = await contract.submitTransaction('editDiagnosisss', diagnosissNumber, diagnosis, detail, date, time, doctor, doctor_id, patient_id);
        console.log('Transaction has been submitted');
        console.log('result \n' + result);

        res.end(result);

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Quety                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////

async function queryAllByPatitentID(res, type, id) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAllByPatitentID', type, id);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();

        return result

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function queryAllByDoctorID(res, type, id) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAllByDoctorID', type, id);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();

        return result

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function queryByDoctor(res, doctor) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Evaluate the specified transaction.
        // queryAllDiagnosisss transaction - requires no arguments, ex: ('queryAllDiagnosisss')
        const result = await contract.evaluateTransaction('queryDiagnosisssByDoctor', doctor);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        res.end(result);

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function queryAllByType(type) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAll', type);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();

        return result

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function queryAll(res, type) {
    try {
        const result = await queryAllByType(type);
        res.end(result);
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

app.get('/diagnosissList', async function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'admin') {
        return res.render('login', {
            message: 'Please Login as admin First.'
        });
    }

    const results = await queryAllByType('');
    var diagnosisss = {
        diagnosisss: JSON.parse(results.toString())
    }
    res.render('diagnosissList', diagnosisss);
});


app.get('/DoctorDiagnosissList', async function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    const results = await queryAllByDoctorID(res, '', session.userid)
    var diagnosisss = {
        diagnosisss: JSON.parse(results.toString())
    }
    res.render('DoctorDiagnosissList', diagnosisss);
});


app.get('/patientDiagnosissList', async function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'patient') {
        return res.render('login', {
            message: 'Please Login as patient First.'
        });
    }

    const results = await queryAllByPatitentID(res, '', session.userid)
    var diagnosisss = {
        diagnosisss: JSON.parse(results.toString())
    }
    res.render('patientDiagnosissList', diagnosisss);
});


app.get('/addDiagnosis', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    res.render('addDiagnosis');
})

app.post('/addDiagnosis', function (req, res) {
    const {
        patient_id,
        name
    } = req.body

    res.render('addDiagnosis', {
        patient_id: patient_id,
        name: name
    });
})

app.post('/diagnosis', async function (req, res) {
    console.log(req.body);

    console.log(session)
    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    const {
        diagnosis,
        detail,
        patient_id
    } = req.body

    var dt = dateTime.create();
    var date = dt.format('Y-m-d');
    var time = dt.format('H:M:S');

    const gateway = await connect.gatewaySetup();
    const network = await gateway.getNetwork(CHANNEL);
    const contract = network.getContract(CONTRACT);

    // Submit the specified transaction.
    const diagnosis_id = await contract.submitTransaction('createDiagnosisss', diagnosis, detail, date, time, session.username, session.userid, patient_id, '');
    console.log('Transaction has been submitted');
    console.log('result \n' + diagnosis_id);

    // Disconnect from the gateway.
    await gateway.disconnect();

    res.redirect('addDiagnosisStep2/' + diagnosis_id);
})


app.get('/addDiagnosisStep2/:diagnosis_id', async function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    const id = req.params.diagnosis_id;

    console.log('addDiagnosisStep2/:diagnosis_id')
    console.log(id)

    const gateway = await connect.gatewaySetup();
    const network = await gateway.getNetwork(CHANNEL);
    const contract = network.getContract(CONTRACT);


    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('queryDiagnosiss', '' + id);
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    const diagnosis_record = JSON.parse(result.toString())
    console.log(diagnosis_record)

    // Disconnect from the gateway.
    await gateway.disconnect();

    return res.render('addDiagnosisStep2', {
        id: id,
        diagnosis_record
    });
})


app.get('/addVaccinePage/:id', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    console.log(req.params.id)

    return res.render('addVaccine', {
        diagnosis_id: req.params.id
    });
})


app.post('/vaccine/:id', async function (req, res) {
    console.log(req.body);

    const {
        vaccine,
        description,
        reason,
        state
    } = req.body

    const diagnosis_id = req.params.id;

    var dt = dateTime.create();
    var date = dt.format('Y-m-d');
    var time = dt.format('H:M:S');

    const gateway = await connect.gatewaySetup();
    const network = await gateway.getNetwork(CHANNEL);
    const contract = network.getContract(CONTRACT);

    // Submit the specified transaction.
    await contract.submitTransaction('addVaccine', diagnosis_id, vaccine, reason, description, state, date, time);
    console.log('Transaction has been submitted');

    // Disconnect from the gateway.
    await gateway.disconnect();

    res.redirect('/addDiagnosisStep2/' + diagnosis_id)
})


app.get('/addMedicationsPage/:id', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    console.log(req.params.id)

    return res.render('addMedications', {
        diagnosis_id: req.params.id
    });
})


app.post('/medication/:id', async function (req, res) {
    console.log(req.body);

    const {
        medicine,
        quantity,
        unit
    } = req.body

    const diagnosis_id = req.params.id;

    const gateway = await connect.gatewaySetup();
    const network = await gateway.getNetwork(CHANNEL);
    const contract = network.getContract(CONTRACT);

    // Submit the specified transaction.
    await contract.submitTransaction('addMedications', diagnosis_id, medicine, unit, quantity);
    console.log('Transaction has been submitted');

    // Disconnect from the gateway.
    await gateway.disconnect();

    res.redirect('/addDiagnosisStep2/' + diagnosis_id)
})


app.get('/addAdversePage/:id', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    console.log(req.params.id)

    return res.render('addAdversePage', {
        diagnosis_id: req.params.id
    });
})

app.post('/adverse/:id', async function (req, res) {
    console.log(req.body);

    const {
        adverse_reaction,
        description,
        reason,
        state
    } = req.body

    const diagnosis_id = req.params.id;

    var dt = dateTime.create();
    var date = dt.format('Y-m-d');
    var time = dt.format('H:M:S');

    const gateway = await connect.gatewaySetup();
    const network = await gateway.getNetwork(CHANNEL);
    const contract = network.getContract(CONTRACT);

    // Submit the specified transaction.
    await contract.submitTransaction('addAdverse', diagnosis_id, adverse_reaction, reason, description, state, date, time);
    console.log('Transaction has been submitted');

    // Disconnect from the gateway.
    await gateway.disconnect();

    res.redirect('/addDiagnosisStep2/' + diagnosis_id)
})

app.get('/addAllergyPage/:id', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    console.log(req.params.id)

    return res.render('addAllergy', {
        diagnosis_id: req.params.id
    });
})


app.post('/allergy/:id', async function (req, res) {
    console.log(req.body);

    const {
        allergic_reaction,
        description,
        reason,
        state
    } = req.body

    const diagnosis_id = req.params.id;

    var dt = dateTime.create();
    var date = dt.format('Y-m-d');
    var time = dt.format('H:M:S');

    const gateway = await connect.gatewaySetup();
    const network = await gateway.getNetwork(CHANNEL);
    const contract = network.getContract(CONTRACT);

    // Submit the specified transaction.
    await contract.submitTransaction('addAllergy', diagnosis_id, allergic_reaction, reason, description, state, date, time);
    console.log('Transaction has been submitted');

    // Disconnect from the gateway.
    await gateway.disconnect();

    res.redirect('/addDiagnosisStep2/' + diagnosis_id)
})


async function query(id, res) {
    try {
        const gateway = await connect.gatewaySetup();
        const network = await gateway.getNetwork(CHANNEL);
        const contract = network.getContract(CONTRACT);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryDiagnosiss', '' + id);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        res.end(result);

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}


///////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
    res.render('login');
})

app.get('/register', function (req, res) {
    res.render('register');
})

app.get('/login', function (req, res) {
    res.render('login');
})


////////////////////////////////////////////////////////////////////////////////
///                             diagnosis                                   ///
//////////////////////////////////////////////////////////////////////////////

app.get('/api/diagnosis/add', function (req, res) {
    add(res, '100Honda', 'add_detail', 'add_Accord', 'add_Black', 'add-Tom', '111', '222')
})

app.get('/api/diagnosis/edit', function (req, res) {
    // add(res, '100Honda', 'changeAccord', 'changeBlack', 'changeTom', '0')
    edit(res, '0', 'add_detail', 'add_Accord', 'add_Black', 'add-Tom', '111', '222', '')
})

app.get('/api/diagnosis/:id', function (req, res) {
    query(req.params.id, res);
})

app.get('/api/diagnosis/doctor/:doctor', function (req, res) {
    console.log('queryByDoctor')
    queryByDoctor(res, req.params.doctor)
})


app.get('/api/diagnosis', function (req, res) {
    queryAll(res, '');
})

app.get('/api/diagnosis/patitentID/:id', function (req, res) {
    console.log('queryAllByPatitentID')
    queryAllByPatitentID(res, '', req.params.id)
})

app.get('/api/diagnosis/doctorID/:id', function (req, res) {
    console.log('queryAllByDoctorID')
    queryAllByDoctorID(res, '', req.params.id)
})


////////////////////////////////////////////////////////////////////////////////
///                                     medications                         ///
//////////////////////////////////////////////////////////////////////////////

app.get('/api/medications/add', function (req, res) {
    addMedications(res, '0', 'Penicillin', 'g', '111');
})

app.get('/api/vaccine/add', function (req, res) {
    addVaccine(res, '0', 'covid-2019', 'cov-19 reason', 'des 19', '', '02/03/2021', '22:10')
})

app.get('/api/medications', function (req, res) {
    queryAll(res, 'medications');
})

app.get('/api/medications/patitentID/:id', function (req, res) {
    console.log('queryAllByPatitentID')
    queryAllByPatitentID(res, 'medications', req.params.id)
})

app.get('/api/medications/doctorID/:id', function (req, res) {
    console.log('queryAllByDoctorID')
    queryAllByDoctorID(res, 'medications', req.params.id)
})


////////////////////////////////////////////////////////////////////////////////
///                                     adverse                             ///
//////////////////////////////////////////////////////////////////////////////

app.get('/api/adverse/add', function (req, res) {
    addAdverse(res, '0', 'Mid', 'no know', 'Epigasstric pain', 'Bad', '01/05/2022', '11:01');
})

app.get('/api/adverse', function (req, res) {
    queryAll(res, 'adverse_reaction');
})

app.get('/api/adverse/patitentID/:id', function (req, res) {
    console.log('queryAllByPatitentID')
    queryAllByPatitentID(res, 'adverse_reaction', req.params.id)
})

app.get('/api/adverse/doctorID/:id', function (req, res) {
    console.log('queryAllByDoctorID')
    queryAllByDoctorID(res, 'adverse_reaction', req.params.id)
})

////////////////////////////////////////////////////////////////////////////////
///                                     allergy                             ///
//////////////////////////////////////////////////////////////////////////////

app.get('/api/allergy/add', function (req, res) {
    addAllergy(res, '0', 'amoxicillin', 'no know', 'Augmentin (amoxicillin (as sodium))', 'Suspected', '01/05/2022', '11:01');
})

app.get('/api/allergy', function (req, res) {
    queryAll(res, 'allergy_reaction');
})

app.get('/api/allergy/patitentID/:id', function (req, res) {
    console.log('queryAllByPatitentID')
    queryAllByPatitentID(res, 'allergy_reaction', req.params.id)
})

app.get('/api/allergy/doctorID/:id', function (req, res) {
    console.log('queryAllByDoctorID')
    queryAllByDoctorID(res, 'allergy_reaction', req.params.id)
})

//

var server = app.listen(8081, function () {
    var port = server.address().port
    console.log(`Server running at http://127.0.0.1:${port }/`)
})

////////////////////////////////////////////////////////////////////////////////////////


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('login');
});


app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            res.end(JSON.stringify(results));
        } else {
            res.end('No Data')
        }
    });
});



app.get('/addHospital', function (req, res) {
    db.query('SELECT * FROM region', async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('addHospital', {
                region: results
            });
        } else {
            return res.render('login', {
                message: 'No Data!'
            });
        }
    });
})

app.post('/addHospitalDoctor', function (req, res) {
    console.log(req.body);

    const {
        doctor_id,
        hospital_id,
    } = req.body

    db.query("INSERT INTO hospital_doctor SET ?", {
        doctor_id: doctor_id,
        hospital_id: hospital_id,
    }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.redirect('/hospitalAddDoctorList')
        }
    })
})


app.post('/removeHospitalAuthorize', function (req, res) {
    console.log(req.body);

    const {
        hospital_id,
    } = req.body

    db.query("DELETE FROM authorize_hospital WHERE patient_id = ? AND hospital_id = ? ",
        [session.userid, hospital_id],
        (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                res.redirect('/authorizedHospitalList')
            }
        })
})


app.post('/authorizeToHospital', function (req, res) {
    console.log(req.body);

    const {
        hospital_id,
    } = req.body

    db.query("INSERT INTO authorize_hospital SET ?", {
        patient_id: session.userid,
        hospital_id: hospital_id,
    }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.redirect('/patientAddHospitalList')
        }
    })
})


app.get('/addHospitalDoctor/:id', function (req, res) {
    db.query('SELECT * FROM users WHERE type = "doctor" ', async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('addHospitalDoctor', {
                doctor: results,
                hospital_id: req.params.id
            });
        } else {
            return res.render('login', {
                message: 'No Data!'
            });
        }
    });
})


app.get('/api/myInfo', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', session.userid, async (error, results) => {
        if (error) {
            console.log(error);
        }

        console.log(JSON.stringify(results[0]))
        if (results.length > 0) {
            res.end(JSON.stringify(results[0]));
        } else {
            res.end('No Data')
        }
    });
});


app.get('/api/user/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', req.params.id, async (error, results) => {
        if (error) {
            console.log(error);
        }

        console.log(JSON.stringify(results[0]))
        if (results.length > 0) {
            res.end(JSON.stringify(results[0]));
        } else {
            res.end('No Data')
        }
    });
});

app.get('/list', function (req, res) {
    db.query('SELECT * FROM users', async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            var users = {
                users: results
            }
            console.log(JSON.stringify(users))
            res.render('list', users);
        } else {
            res.end('No Data')
        }
    });
});


app.post('/stepscount', function (req, res) {
    console.log(req.body);

    const {
        date,
        stepscount,
    } = req.body

    db.query("INSERT INTO stepscount SET ?", {
        patient_id: session.userid,
        date: date,
        stepscount: stepscount,
    }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.redirect('/stepsCount');
        }
    })
})

app.post('/heartRate', function (req, res) {
    console.log(req.body);

    const {
        datetime,
        heartRate,
    } = req.body

    db.query("INSERT INTO heartRate SET ?", {
        patient_id: session.userid,
        datetime: datetime,
        heartRate: heartRate,
    }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            res.redirect('/heartRate');
        }
    })
})

app.get('/heartRate', function (req, res) {

    console.log("/heartRate")


    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'patient') {
        return res.render('login', {
            message: 'Please Login as patient First.'
        });
    }

    db.query('SELECT * FROM heartRate WHERE patient_id = ? ', session.userid , async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            var heartRate = {
                heartRate: results
            }
            console.log("JSON.stringify(heartRate)")
            console.log(JSON.stringify(heartRate))
            res.render('heartRate', heartRate);
        } else {
            res.end('No Data')
        }
    });
})


app.get('/stepsCount', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'patient') {
        return res.render('login', {
            message: 'Please Login as patient First.'
        });
    }

    db.query('SELECT * FROM stepscount WHERE patient_id = ? ', session.userid , async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            var stepscount = {
                stepscount: results
            }
            console.log(JSON.stringify(stepscount))
            res.render('stepsCount', stepscount);
        } else {
            res.end('No Data')
        }
    });
})



app.get('/patientList', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'doctor') {
        return res.render('login', {
            message: 'Please Login as doctor First.'
        });
    }

    db.query(`SELECT users.id AS id , users.name AS name, users.gender AS gender, 
                        users.phone AS phone, users.type AS type, users.email AS email FROM hospital_doctor, 
                        authorize_hospital, users 
                        WHERE hospital_doctor.hospital_id = authorize_hospital.hospital_id 
                        AND authorize_hospital.patient_id = users.id AND hospital_doctor.doctor_id = ` +
        session.userid, async (error, results) => {
            if (error) {
                console.log(error);
            }

            if (results.length > 0) {
                var patients = {
                    patients: results
                }
                console.log(JSON.stringify(patients))
                res.render('patientList', patients);
            } else {
                res.end('No Data')
            }
        });
});


app.get('/hospitalAddDoctorList', function (req, res) {
    db.query(`SELECT hospital.id as id , hospital.name as name , hospital.address as address , 
            region.region as region FROM hospital , region WHERE hospital.region_id = region.id`,
        async (error, results) => {
            if (error) {
                console.log(error);
            }

            console.log(results)

            if (results.length > 0) {
                var hospital = {
                    hospital: results
                }
                console.log(JSON.stringify(hospital))
                res.render('hospitalAddDoctorList', hospital);
            } else {
                res.end('No Data')
            }
        });
});


app.get('/patientAddHospitalList', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'patient') {
        return res.render('login', {
            message: 'Please Login as patient First.'
        });
    }

    db.query(`SELECT DISTINCT hospital.id as id , hospital.name as name , 
            hospital.address AS address , region.region as region FROM hospital , 
            region WHERE hospital.id 
            NOT IN 
            (SELECT hospital_id FROM authorize_hospital 
                WHERE authorize_hospital.patient_id = ` + session.userid 
            + `) 
            AND hospital.region_id = region.id`,
        async (error, results) => {
            if (error) {
                console.log(error);
            }

            console.log(results)

            if (results.length > 0) {
                var hospital = {
                    hospital: results
                }
                console.log(JSON.stringify(hospital))
                res.render('patientAddHospitalList', hospital);
            } else {
                res.end('No Data')
            }
        });
});


app.get('/authorizedHospitalList', function (req, res) {

    if (session == undefined) {
        return res.render('login', {
            message: 'Please Login First.'
        });
    }

    if (session.usertype != 'patient') {
        return res.render('login', {
            message: 'Please Login as patient First.'
        });
    }

    db.query('SELECT DISTINCT hospital.id as id , hospital.name as name , hospital.address AS address , region.region as region FROM hospital , region WHERE hospital.id IN (SELECT hospital_id FROM authorize_hospital WHERE authorize_hospital.patient_id = ' + session.userid + ') AND hospital.region_id = region.id', async (error, results) => {
        if (error) {
            console.log(error);
        }

        console.log(results)

        if (results.length > 0) {
            var hospital = {
                hospital: results
            }
            console.log(JSON.stringify(hospital))
            res.render('authorizedHospitalList', hospital);
        } else {
            res.render('authorizedHospitalList');
        }
    });
});


app.post('/login', function (req, res) {
    console.log(req.body);

    const {
        name,
        password
    } = req.body

    console.log('name: ' + name, 'password: ' + password)

    db.query('SELECT id, type FROM users WHERE name = ? AND password = ?', [name, password], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {

            session = req.session;
            session.userid = results[0].id;
            session.usertype = results[0].type;
            session.username = name;
            console.log('session :\n' + JSON.stringify(session))
            console.log('session userid :\n' + session.userid)

            if (session.usertype == 'patient') {
                res.redirect('/patientDiagnosissList')
            } else if (session.usertype == 'doctor') {
                res.redirect('/DoctorDiagnosissList')
            } else {
                res.redirect('/list')
            }

        } else {
            return res.render('login', {
                message: 'Name or Password have misstake!'
            });
        }
    });
})


app.get('/personalInfo', function (req, res) {
    db.query('SELECT * FROM users WHERE id = ?', session.userid, async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {

            const person = JSON.parse(JSON.stringify(results[0]));
            console.log(person)

            return res.render('personalInfo', {
                person: person
            });
        } else {
            res.end('No Data')
        }
    });
})


app.get('/doctorPersonalInfo', function (req, res) {
    db.query('SELECT * FROM users WHERE id = ?', session.userid, async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {

            const person = JSON.parse(JSON.stringify(results[0]));
            console.log(person)

            return res.render('doctorPersonalInfo', {
                person: person
            });
        } else {
            res.end('No Data')
        }
    });
})



app.post('/update/user', function (req, res) {
    console.log(req.body);

    const {
        name,
        phone,
        email,
        password
    } = req.body

    var date = [name, phone, email, password, session.userid]

    db.query("UPDATE users SET name = ? , phone = ? , email = ? , password = ? WHERE id = ?",
        date, async (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                res.redirect('/personalInfo')
            }
        })
})



app.post('/hospital', function (req, res) {
    console.log(req.body);

    const {
        name,
        region,
        address,
    } = req.body

    db.query('SELECT name FROM hospital WHERE name = ?', [name], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('addHospital', {
                message: 'That email is already in use'
            });
        }

        db.query("INSERT INTO hospital SET ?", {
            name: name,
            region_id: region,
            address: address,
        }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                db.query('SELECT * FROM region', async (error, results) => {
                    return res.render('addHospital', {
                        message: 'Added Hospital ' + name,
                        region: results
                    });
                });
            }
        })
    });
})



app.post('/register', function (req, res) {
    console.log(req.body);

    const {
        name,
        gender,
        phone,
        email,
        password,
        type,
        passwordConfirm
    } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        db.query("INSERT INTO users SET ?", {
            name: name,
            gender: gender,
            phone: phone,
            email: email,
            password: password,
            type: type
        }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }
        })
    });
})

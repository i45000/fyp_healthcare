'use strict';

const {
    Contract
} = require('fabric-contract-api');

var maxId = 0

class MedicalHistory extends Contract {

    async initLedger(ctx) {
        const diagnosiss = [{
                diagnosis: 'Gastroenteritis',
                detail: '',
                date: '2022-01-01',
                time: '15:27:56',
                doctor: 'Tomoko',
                doctor_id: '101',
                patient_id: '4',
                new_version_id: '',
                vaccine: [],
                medications: [],
                adverse_reaction: [],
                allergy_reaction: []
            },
            {
                diagnosis: 'Gastric cancer',
                detail: '',
                date: '2022-05-02',
                time: '15:27:56',
                doctor: 'Brad',
                doctor_id: '201',
                patient_id: '4',
                new_version_id: '',
                vaccine: [],
                medications: [{
                    medicine: 'Insulin',
                    unit: 'ml',
                    quantity: '202',
                }],
                adverse_reaction: [{
                    adverse_reaction: 'Mid',
                    reason: '',
                    description: 'Epigasstric pain',
                    state: 'Bad',
                    date: '01/05/2022',
                    time: '15:27:56'
                }, ],
                allergy_reaction: [{
                        allergic_reaction: 'amoxicillin',
                        reason: 'no',
                        description: 'Augmentin (amoxicillin (as sodium))',
                        state: 'Suspected',
                        date: '2022-05-01',
                        time: '15:27:56'
                    }
                ]
            },
            {
                diagnosis: 'Colon cancer',
                detail: '',
                date: '2022-06-03',
                time: '15:27:56',
                doctor: 'Jin Soo',
                doctor_id: '301',
                patient_id: '5',
                new_version_id: '',
                vaccine: [],
                medications: [{
                    medicine: 'Insulin',
                    unit: 'ml',
                    quantity: '202',
                }],
                adverse_reaction: [{
                    adverse_reaction: 'Mid',
                    reason: '',
                    description: 'Epigasstric pain',
                    state: 'Bad',
                    date: '2022-05-01',
                    time: '15:27:56'
                }, ],
                allergy_reaction: [{
                        allergic_reaction: 'amoxicillin',
                        reason: 'no',
                        description: 'Augmentin (amoxicillin (as sodium))',
                        state: 'Suspected',
                        date: '2022-05-01',
                        time: '15:27:56'
                    },
                    {
                        allergic_reaction: 'Clavulanic acid',
                        reason: 'under',
                        description: 'Clavulanic (amoxicillin (as sodium))',
                        state: 'Suspected',
                        date: '2022-05-01',
                        time: '15:27:56'
                    }
                ]
            },
            {
                diagnosis: 'Asthma',
                detail: '',
                date: '2022-08-07',
                time: '15:27:56',
                doctor: 'Max',
                doctor_id: '401',
                patient_id: '5',
                new_version_id: '',
                vaccine: [],
                medications: [],
                adverse_reaction: [{
                    adverse_reaction: 'Mid',
                    reason: '',
                    description: 'Epigasstric pain',
                    state: 'Bad',
                    date: '2022-05-01',
                    time: '15:27:56'
                }, ],
                allergy_reaction: [{
                        allergic_reaction: 'amoxicillin',
                        reason: 'no',
                        description: 'Augmentin (amoxicillin (as sodium))',
                        state: 'Suspected',
                        date: '2022-05-01',
                        time: '15:27:56'
                    },
                    {
                        allergic_reaction: 'Clavulanic acid',
                        reason: 'under',
                        description: 'Clavulanic (amoxicillin (as sodium))',
                        state: 'Suspected',
                        date: '2022-05-01',
                        time: '15:27:56'
                    }
                ]
            },
        ];

        for (let i = 0; i < diagnosiss.length; i++) {
            diagnosiss[i].docType = 'diagnosis';
            await ctx.stub.putState('' + i, Buffer.from(JSON.stringify(diagnosiss[i])));
            console.info('Added <--> ', diagnosiss[i]);
        }
        maxId = diagnosiss.length - 1;
        console.info(' max id : ' + maxId);
    }

    async createDiagnosisss(ctx, diagnosis, detail, date, time, doctor, doctor_id, patient_id, new_version_id) {
        maxId++;
        const diagnosiss = {
            diagnosis,
            detail,
            docType: 'diagnosis',
            date,
            time,
            doctor,
            doctor_id,
            patient_id,
            new_version_id,
            vaccine: [],
            medications: [],
            adverse_reaction: [],
            allergy_reaction: [],
        };

        await ctx.stub.putState('' + maxId, Buffer.from(JSON.stringify(diagnosiss)));

        return '' + maxId;
    }

    async editDiagnosisss(ctx, diagnosissNumber, diagnosis, detail, date, time, doctor, doctor_id, patient_id) {
        const diagnosisAsBytes = await ctx.stub.getState(diagnosissNumber); // get the diagnosiss from chaincode state
        if (!diagnosisAsBytes || diagnosisAsBytes.length === 0) {
            throw new Error(`${diagnosissNumber} does not exist`);
        }
        const diagnosiss = JSON.parse(diagnosisAsBytes.toString());
        diagnosiss.new_version_id = maxId + 1;

        await ctx.stub.putState(diagnosissNumber, Buffer.from(JSON.stringify(diagnosiss)));

        maxId++;
        const new_diagnosiss = {
            diagnosis,
            detail,
            docType: 'diagnosis',
            date,
            time,
            doctor,
            doctor_id,
            patient_id,
            new_version_id: '',
            vaccine: [],
            medications: [],
            adverse_reaction: [],
            allergy_reaction: [],
        };

        await ctx.stub.putState('' + maxId, Buffer.from(JSON.stringify(new_diagnosiss)));

        return '' + maxId;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////
    //                                  Query Diagnosiss Record                                 //
    //////////////////////////////////////////////////////////////////////////////////////////////


    async queryDiagnosiss(ctx, diagnosissNumber) {
        const diagnosisAsBytes = await ctx.stub.getState(diagnosissNumber); // get diagnosiss from chaincode state
        if (!diagnosisAsBytes || diagnosisAsBytes.length === 0) {
            throw new Error(`${diagnosissNumber} does not exist`);
        }
        console.log(diagnosisAsBytes.toString());
        return diagnosisAsBytes.toString();
    }


    async queryDiagnosisssByDoctor(ctx, doctor) {
        const allResults = [];
        for await (const {
            key,
            value
        } of ctx.stub.getStateByRange('', '')) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.doctor == doctor) {
                allResults.push({
                    Key: key,
                    Record: record
                });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


    async queryDiagnosisssByDoctorID(ctx, id) {
        const allResults = [];
        for await (const {
            key,
            value
        } of ctx.stub.getStateByRange('', '')) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.doctor_id == id) {
                allResults.push({
                    Key: key,
                    Record: record
                });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


    async queryDiagnosisssByPatitentID(ctx, id) {
        const allResults = [];
        for await (const {
            key,
            value
        } of ctx.stub.getStateByRange('', '')) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.patient_id == id) {
                allResults.push({
                    Key: key,
                    Record: record
                });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


    async queryAllByDoctorID(ctx, type, id) {
        const allResults = [];
        for await (const {
            key,
            value
        } of ctx.stub.getStateByRange('', '')) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (type == '') {
                if (record.doctor_id == id) {
                    allResults.push({
                        Key: key,
                        Record: record
                    });
                }
            } else if (type == 'medications') {
                if (record.doctor_id == id) {
                    allResults.push({
                        Key: key,
                        Record: record.medications
                    });
                }
            } else if (type == 'adverse_reaction') {
                if (record.doctor_id == id) {
                    allResults.push({
                        Key: key,
                        Record: record.adverse_reaction
                    });
                }
            } else if (type == 'allergy_reaction') {
                if (record.doctor_id == id) {
                    allResults.push({
                        Key: key,
                        Record: record.allergy_reaction
                    });
                }
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


    async queryAllByPatitentID(ctx, type, id) {
        const allResults = [];
        for await (const {
            key,
            value
        } of ctx.stub.getStateByRange('', '')) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (type == '') {
                if (record.patient_id == id) {
                    allResults.push({
                        Key: key,
                        Record: record
                    });
                }
            } else if (type == 'medications') {
                if (record.patient_id == id) {
                    allResults.push({
                        Key: key,
                        Record: record.medications
                    });
                }
            } else if (type == 'adverse_reaction') {
                if (record.patient_id == id) {
                    allResults.push({
                        Key: key,
                        Record: record.adverse_reaction
                    });
                }
            } else if (type == 'allergy_reaction') {
                if (record.patient_id == id) {
                    allResults.push({
                        Key: key,
                        Record: record.allergy_reaction
                    });
                }
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


    async queryAll(ctx, type) {
        const allResults = [];
        for await (const {
            key,
            value
        } of ctx.stub.getStateByRange('', '')) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (type == '') {
                allResults.push({
                    Key: key,
                    Record: record
                });
            } else if (type == 'medications') {
                allResults.push({
                    Key: key,
                    Record: record.medications
                });
            } else if (type == 'adverse_reaction') {
                allResults.push({
                    Key: key,
                    Record: record.adverse_reaction
                });
            } else if (type == 'allergy_reaction') {
                allResults.push({
                    Key: key,
                    Record: record.allergy_reaction
                });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


    //////////////////////////////////////////////////////////////////////////////////////////////
    //                                   Sub Record                                             //
    //////////////////////////////////////////////////////////////////////////////////////////////

    async addMedications(ctx, diagnosissNumber, medicine, unit, quantity) {
        const diagnosisAsBytes = await ctx.stub.getState(diagnosissNumber); // get the diagnosiss from chaincode state
        if (!diagnosisAsBytes || diagnosisAsBytes.length === 0) {
            throw new Error(`${diagnosissNumber} does not exist`);
        }
        const diagnosiss = JSON.parse(diagnosisAsBytes.toString());
        diagnosiss.medications.push({
            medicine,
            unit,
            quantity,
        })

        await ctx.stub.putState(diagnosissNumber, Buffer.from(JSON.stringify(diagnosiss)));
    }

    async addAdverse(ctx, diagnosissNumber, adverse_reaction, reason, description, state, date, time) {
        const diagnosisAsBytes = await ctx.stub.getState(diagnosissNumber); // get the diagnosiss from chaincode state
        if (!diagnosisAsBytes || diagnosisAsBytes.length === 0) {
            throw new Error(`${diagnosissNumber} does not exist`);
        }
        const diagnosiss = JSON.parse(diagnosisAsBytes.toString());
        diagnosiss.adverse_reaction.push({
            adverse_reaction,
            reason,
            description,
            state,
            date,
            time,
        })

        await ctx.stub.putState(diagnosissNumber, Buffer.from(JSON.stringify(diagnosiss)));
    }

    async addAllergy(ctx, diagnosissNumber, allergic_reaction, reason, description, state, date, time) {
        const diagnosisAsBytes = await ctx.stub.getState(diagnosissNumber); // get the diagnosiss from chaincode state
        if (!diagnosisAsBytes || diagnosisAsBytes.length === 0) {
            throw new Error(`${diagnosissNumber} does not exist`);
        }
        const diagnosiss = JSON.parse(diagnosisAsBytes.toString());
        diagnosiss.allergy_reaction.push({
            allergic_reaction,
            reason,
            description,
            state,
            date,
            time,
        })

        await ctx.stub.putState(diagnosissNumber, Buffer.from(JSON.stringify(diagnosiss)));
    }

    async addVaccine(ctx, diagnosissNumber, vaccine, reason, description, state, date, time) {
        const diagnosisAsBytes = await ctx.stub.getState(diagnosissNumber); // get the diagnosiss from chaincode state
        if (!diagnosisAsBytes || diagnosisAsBytes.length === 0) {
            throw new Error(`${diagnosissNumber} does not exist`);
        }
        const diagnosiss = JSON.parse(diagnosisAsBytes.toString());
        diagnosiss.vaccine.push({
            vaccine,
            reason,
            description,
            state,
            date,
            time,
        })

        await ctx.stub.putState(diagnosissNumber, Buffer.from(JSON.stringify(diagnosiss)));
    }
}

module.exports = MedicalHistory;
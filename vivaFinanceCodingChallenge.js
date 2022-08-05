/**
 * 
 * This file contains the code for the VIVA Finance coding challenge.
 * 
 * @Author: Vinay Jain (vj9898@rit.edu) 
 * 
 */

const inputReadFromCSVFile = require('csvtojson'); // npm package to read csv file

const databaseFile = require('./db.json'); // import the database file

const fs = require('fs');

var finalFile = []; // the required JSON array

/**
 * a user defined function to parse the JSON object and retrieve the values 
 * of the keys passed to the function as an argument
 */
function parser(string, key){
    let str = JSON.stringify(string);
    let obj = JSON.parse(str);
    return String(obj[key]);
}

/**
 * main fucntion where the main code is executed
 */
function deductionFromPayroll(){

    inputReadFromCSVFile().fromFile('payments.csv').then(csvFile => { // read the csv file with the payment details

        // for every entry in database, search for that entry in the 
        // payments.csv and add the applied ampount.
        // after adding subtract that from the database amount
        
        //finalFile = databaseFile.map( function( databaseEntry ){

        for(let indexDBFile = 0; indexDBFile < databaseFile.length; indexDBFile++){ // for every entry in the database

            let databaseEntry = databaseFile[indexDBFile];

            let databaseEntryEmployer = parser(databaseEntry, 'employer'); // value for the key employer of database entry
            let databaseEntryFirstName = parser(databaseEntry, 'firstName'); // value for the key firstName of database entry
            let databaseEntryLastName = parser(databaseEntry, 'lastName'); // value for the key lastName of database entry
            let databaseEntryMask = parser(databaseEntry, 'mask').replaceAll('*',''); // value for the key mask of database entry

            for(let indexCSV = 0; indexCSV < csvFile.length; indexCSV++){

                let currentCSV = csvFile[indexCSV];

                let csvDataEmployer = parser(currentCSV, 'employer'); // value for the key employer of csv entry
                let csvDataFirstName = parser(currentCSV, 'firstName'); // value for the key employer of csv entry
                let csvDataLastName = parser(currentCSV, 'lastName'); // value for the key employer of csv entry
                let csvDataMask = parser(currentCSV, 'mask').replaceAll('*',''); // value for the key employer of csv entry

                if (databaseEntryEmployer === csvDataEmployer && 
                databaseEntryFirstName === csvDataFirstName &&
                databaseEntryLastName === csvDataLastName) { // if (employer, firstName, lastName) matches

                    if( (csvDataMask != null && databaseEntryMask != null && csvDataMask == databaseEntryMask) 
                    || (csvDataMask == null || databaseEntryMask == null)
                    || (csvDataMask == '' || databaseEntryMask == '') ){ // check for valid mask matches
                        let temp = {
                            "username": databaseEntry.username,
                            "applied": parseFloat(currentCSV.amount),
                            "owe": parseFloat(databaseEntry.amountExpected) - parseFloat(currentCSV.amount)
                        }; // create a temporary JSON object of the output form that is required

                        // check if the username in temp still exists in finalFile
                        // if it does, add to the 'applied' field for the particular username
                        // and modify the amount owed
                        let hasMatch = false;
                        for(let indexFinalFile = 0; indexFinalFile < finalFile.length; indexFinalFile++){

                            let current = finalFile[indexFinalFile];

                            if(current.username == temp.username){
                                current.applied = parseFloat(current.applied) + parseFloat(temp.applied);
                                current.owe = parseFloat(databaseEntry.amountExpected) - parseFloat(current.applied);
                                finalFile[indexFinalFile] = current;
                                hasMatch = true;
                                break;
                            }
                        }
                    
                        //else
                        if(hasMatch == false){
                            finalFile.push(temp);
                        }

                        // return true;
                    }

                }

            }

        }

        // print the final results on console
        // console.log(finalFile); 


        const finalData = JSON.stringify(finalFile); // convert JSON to string

        fs.writeFile('applied.json', finalData, (error) => {
            if(error){
                console.log(error);
            }
        });

        console.log("The desired output file is available as applied.json file in the same directory where you have saved this code.");

    }).catch(error => {
        console.log(error);

    })

}

deductionFromPayroll(); // function call
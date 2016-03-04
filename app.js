/*
* @Author: home
* @Date:   2016-03-04 13:13:51
* @Last Modified by:   home
* @Last Modified time: 2016-03-04 15:58:40
*/

//Lets require/import the HTTP module
var http = require('http');


//Lets define a port we want to listen to
const PORT=8080;



//Create a server
var server = http.createServer(handleRequest);


/*
// ==============================  FILE READING
var fr = require('fs');


// read html file
var html = fr.readFileSync('index.html', 'UTF-8');
//console.log(html);



// read csv file
var csvOutput = fr.readFileSync('data.csv', 'UTF-8');
//console.log(csvOutput)




// ==============================  FILE WRITING
// load the fs module as a instance for file writing
var fw = require('fs');

// test data to write to file
var my_data = "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'><title></title></head><body></body></html>";



// opena nd write to new html file with data
var newHtmlFileOut = fw.writeFileSync('out.html',my_data,'UTF-8');
//console.log(newHtmlFileOut);




*/

// ===================================== FLOW CONTROL



//main();




//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});








//We need a function which handles requests and send response
function handleRequest(request, response){
	main()
    response.end('It Works!! Path Hit: ' + request.url);
    //response.end(out, 'UTF-8', getStringDataFromFile('out.json'));
}




// see if file exists and can be read, then return the contents as raw value if ok
function getStringDataFromFile (filename_str) {
	try {
		// read csv file
		var csvOutput = fr.readFileSync(filename_str, 'UTF-8');
		//console.log(typeof csvOutput)
		return true, csvOutput;
	} catch(e) {
		// statements
		console.log(e);
		return false;
	}
	return false;
}// end get string data definition


// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.

function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}

/*function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    return str;
}


*/






function main() {
	// main code for program and testing here here
    // https://github.com/jprichardson/node-jsonfile


    var fr = require('fs');
	var jsonfile = require('jsonfile')
	var util = require('util');



    // convert csv file to json object
	var my_csv_file = 'data.csv';
    var csvOutput = fr.readFileSync('data.csv', 'UTF-8');
    console.log(csvOutput)
    var new_json_from_csv_file =  CSVToArray(csvOutput,',');
    console.log(new_json_from_csv_file);

    // write json object to csv file
    var file_to_write_out = 'out.json';
    var object_to_write_out = new_json_from_csv_file;
    jsonfile.writeFileSync(file_to_write_out, object_to_write_out);




/*    // how to read
	var file_to_read = 'example.json';
	console.dir(jsonfile.readFileSync(file_to_read));
*/


/*
    // how to write
    var file_to_write = 'out.json';
    //var object_to_write = {title: 'JP'};
    var object_to_write = new_json_from_csv_file;
    jsonfile.writeFileSync(file_to_write, object_to_write);

*/












	//var json = CSVToArray(new_output_from_file,',');






/*	// see if csv file exists and can be read
	if (getStringDataFromFile(my_filename) != true) {
		var new_output_from_file = getStringDataFromFile(my_filename);
		//console.log(new_output_from_file);
		var json = CSVToArray(new_output_from_file,',');
		console.log(json)

	};*/






}// end main definition








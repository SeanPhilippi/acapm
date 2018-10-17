// whiteboard

// check for the first process argument to be init
// if 'init', continue processing
// readline x5, take in data for a package.json file
// store inputs for readline prompts into object called jsonObject
// make Object's key values the inputs from the user
// create package.jsonand save this Object in file
// else end program

'use strict';

const readline = require('readline');

const rl = readline.createInterface({
   // stdin = standard input, which is an object that allows 
   // program to communicate with a process while it is running
   input: process.stdin,
   // stdout = standard output
   output: process.stdout
})

// storing the first argument given in a variable
const firstArg = process.argv[2];
// fs = file system.  fs is a node module for accessing physical file system
const fs = require('fs');


if (firstArg === 'init') {
   if (fs.existsSync('./package.json')) {
      console.log('package.json already exists.  Exiting...');
      process.exit();
   } else {
      console.log('This utility will walk you through creating a package.json file. \nPress ^C at any time to quit.\n');

      rl.question('name: ', name => {
         rl.question('version: ', vers => {
            rl.question('description: ', desc => {
               rl.question('entry point: ', entPnt => {
                  rl.question('keywords: ', keywords => {
                     rl.question('git repository: ', gitRepo => {
                        rl.question('author: ', author => {
                           // package.json object with user inputs as key values
                           const jsonObj = {
                              name: name,
                              version: vers,
                              description: desc,
                              main: entPnt,
                              keywords: keywords,
                              repository: gitRepo,
                              author: author
                           };
   
                           // storing current path in variable
                           const currentPath = process.cwd();
                           console.log('\nAbout to write to ' + currentPath + '/package.json:');
                           // display object that will be written to package.json
                           console.log('\n');
                           console.log(jsonObj);
                           console.log('\n');
   
                           rl.question('Is this ok? (yes) ', answer => {
                              if (answer === 'yes' || answer === 'Yes' || answer === 'y' || answer === 'Y') {
                                 // creates package.json and writes jsonObj to
                                 fs.writeFile('package.json', jsonObj, (err) => {
                                       // throws error if error
                                       if (err) throw err;
                                       // success case, file is saved
                                       console.log('package.json successfully created!')
                                 })
                              } else {
                                 process.exit();
                              }
                           })
                        })
                     })
                  })
               })
            })
         })
      })
   }
} else {
   console.log("Error: use 'init' as first argument");
   process.exit();
}




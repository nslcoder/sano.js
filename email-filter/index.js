const fs = require('fs');
const validator = require('validator');

// Read from the csv file
const allEmails = fs.readFileSync('allemails.csv', 'utf-8');

/* Turn the data string into an array separated by a carriage return and a newline, and then convert the emails into lowercase */
const emailArr = allEmails.trim().split('\r\n');
const lowerEmailArr = emailArr.map((eid) => eid.toLowerCase());

// Create a set of unique values from the array
const set = new Set(lowerEmailArr);

// Change the set into an array
const uniqueEmails = [...set];

// Read from the impurities csv and turn it into an array
const allImpurities = fs.readFileSync('impurities.csv', 'utf-8');
const impuritiesArr = allImpurities.trim().split('\r\n');

/* 
- Validate the emails
- Check if the valid emails contain any of the impurity words
- If they don't, append those emails to the filteredlist.csv file
*/
uniqueEmails.forEach((uid) => {
  if (validator.isEmail(uid)) {
    if (impuritiesArr.every((fid) => !uid.includes(fid))) {
      fs.appendFileSync('filteredlist.csv', uid + '\n', 'utf-8');
    }
  }
});



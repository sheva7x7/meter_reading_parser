# Meter reading parser

The nodejs app will read from meter reading csv file and return a sql insert statement to insert the aggregated records in the file into `meter_readings` table

## Installation and setup

Install dependencies

```
npm install
```

Run test

```
npm run test
```

Run app

```
npm start [filePath]
```

# Assumptions

-   Assume file is valid.
    -   Second column in 300 record is always valid date(8) format
    -   Interval column is an integer that is divisible by 1440(total number of minutes in a day)
    -   Number of interval readings in 300 record is always correct
-   When multiple records of the same mni and timestamp are present in the file. The assumption is these readings are taken with multiple meters under the same nmi and these readings are to be accumulated.

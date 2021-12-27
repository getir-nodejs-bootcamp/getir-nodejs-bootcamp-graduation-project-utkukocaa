# Getir CASE STUDY - Utku KOCA

The project is live on https://getir-api-utku-koca.herokuapp.com/

You can click the link and reach the project on Heroku. I put a link as a Documentation directing https://getir-api-utku-koca.herokuapp.com/api-docs so that you can easily see the documentation written in swagger. You can try out the api by it. But if you can see the error messages you need to start the project. In order to do that you need to cone and install the dependencies.

## Installation the project

Clone the project

```bash
git clone https://github.com/utkukocaa/getir-final-task-utku-koca.git
```

Install the dependencies

```bash
 npm install
```

## Usage

Start to project

```bash
 npm start
```

In order to run tests

```bash
 npm test
```

## ENDPOINTS

**POST /api/v1/records**

| Payloads  | Types  | Format           | Required |
| :-------- | :----- | :--------------- | :------- |
| startDate | String | YYYY-MM-DD       | Required |
| endDate   | String | YYYY-MM-DD       | Required |
| minCount  | Number | Positive Integer | Required |
| maxCount  | Number | Positive Integer | Required |

**Response**

```
//Example response
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "totalCount": 310
        },
        {
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "totalCount": 170
        },
}

```

## About the project

The reason why you can't see any try-catch block or catch method is that whanks to express-async-errors package, when the app come across any async error, it is automatically passed to error handler without need of next() method. It makes the code very clean.So there is no need to catch the async-errors. I will explain this approach in my medium page also if you are interested you can see my medium accout :)

On the other side, i could have expanded the folder structure by seperating methods related to database as a base class for database processes, but i foundt it too much for a small project and i wanted to aviod overengoneering. Also, i could have made payloads optional like when user only enter startDate, the app could have responded with records from starDate to now. It is same for maximum and minimum counts. It would be easy to implemet but i wanted to strict requirements given in the case and keep the project simple.

## About Error Handling

Error handling is done by custom error class which extended default Error class. When error is needed to be sent, its type and status code is ready writting by extended custom Error classes, only should write error message inside the instance of any custom error class.

## About Validation

Joi is used as validation, there is no need to save data in to the database, was not implemented any other validation like mongoose.
It controls written inputs;

- startDate and endDate must be YYYY-MM-DD format
- maxCount and minCunt must be number
- startDate can't be after the endDate
- Either both dates can not be after now becauese they call records created.
- minCount can t be higher than maxCount

Also they are tested by jest and supertest libraries.

## About Tests

I divided tests by 4 parts in terms of checking correctness of given inputs, return values, taking care of irrational inputs, and any payload missings.

10 Tests implemented.

###### First part tests:

given startDate, endDate, maxCount, minCount;

- must response with 200 status code
- must specify json in the content type header
- must response with a json object contaning code, msg, records

###### Second part tests:

given startDate, endDate, maxCount, minCount;

- must records has 3 properties which are key, createdAt, totalCount
- must records are between given dates
- must records are between min and max counts

###### Third Part tests:

given startDate, endDate, maxCount, minCount;

- startDate is after endDate must response with 400 status code
- endDate or startDate after current Date must response with 400 status code
- minCount grater than maxCount must response with 400 status code

###### Fouth Part test:

- when any of the payloads is missed, must respond with a status code of 400

## About possible future implementations

- If there is no security restriction, the payloads can send with get request as queries. It would be more light and higher performance.

- The payloads can be optinal like i mentioned in the about project section.

- Authentication can be added

- Any specific record can be called according to key value.

- Record can be sorted by any criteria like count numbers, createdAt, alphabetically..

## Crucial Points

- Delivering a Working RESTful API.
- Clean and Production Ready Code
- Error Handling
- Comments and Documentation
- Unit and/or Integration Tests (Jest is preferable but Mocha also works)
- Avoid Over Engineering

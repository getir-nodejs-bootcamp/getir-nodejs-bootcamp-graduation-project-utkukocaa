const request = require("supertest");
const app = require("./app");

describe("POST /api/v1/records", () => {
  //should response with 200 status code
  //should specify json in the content type header
  //should response with a json object contaning code, msg, records
  describe("check when given startDate, endDate, maxCount and minCount as wanted", () => {
    test("should response with a 200 status code", () => {
      request(app)
        .post("/api/v1/records")
        .send({
          startDate: "2016-10-04",
          endDate: "2018-07-21",
          minCount: 200,
          maxCount: 1000,
        })
        .expect(200);
    });

    test("should specify json in the content type header", () => {
      request(app)
        .post("/api/v1/records")
        .send({
          startDate: "2016-10-04",
          endDate: "2018-07-21",
          minCount: 200,
          maxCount: 1000,
        })
        .expect("Content-Type", /json/);
    });

    test("should response with json object including 3 properties which are code, msg, records", () => {
      request(app)
        .post("/api/v1/records")
        .send({
          startDate: "2016-10-04",
          endDate: "2018-07-21",
          minCount: 200,
          maxCount: 1000,
        })
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              code: 0,
              msg: "Success",
              records: expect.any(Array),
            })
          );
        });
    });
  });

  //check records has 3 properties which are key, createdAt, totalCount
  //check records are between given dates
  //check records are between min and max counts
  describe("check if return values are true", () => {
    test("check records are between given dates", async () => {
      let startDate = "2016-10-04";
      let endDate = "2017-07-21";

      const response = await request(app).post("/api/v1/records").send({
        startDate,
        endDate,
        minCount: 200,
        maxCount: 1000,
      });
      const records = response.body.records.splice(0, 3);
      startDate = new Date(startDate);
      endDate = new Date(endDate);

      const isTrue = records.every((record) => {
        return (
          new Date(record.createdAt) >= startDate &&
          new Date(record.createdAt) <= endDate
        );
      });
      expect(isTrue).toBe(true);
    }, 15000);

    test("check records are between min and max counts", async () => {
      const minCount = 200;
      const maxCount = 1000;
      const response = await request(app).post("/api/v1/records").send({
        startDate: "2016-10-04",
        endDate: "2018-07-21",
        minCount,
        maxCount,
      });
      const records = response.body.records.splice(0, 3);

      const isTrue = records.every((record) => {
        const number = record.totalCount;
        return number >= minCount && number <= maxCount;
      });
      expect(isTrue).toBe(true);
    }, 15000);
    test("objects in records array should have three properties which are key, createdAt, totalCount ", async () => {
      const expected = ["key", "createdAt", "totalCount"];
      const response = await request(app).post("/api/v1/records").send({
        startDate: "2016-10-04",
        endDate: "2017-07-21",
        minCount: 500,
        maxCount: 1000,
      });
      const records = response.body.records.splice(0, 2); //limit the array with 10 items to speed the test

      const isTrue = records.every((record) =>
        Object.keys(record).every((item) => expected.includes(item))
      );
      expect(isTrue).toBe(true);
    }, 15000);
  });

  //startDate is after endDate should response with 400 status code
  //endDate or startDate after current Date should response with 400 status code
  //minCount grater than maxCount should response with 400 status code
  describe("check if irrational inputs given, and return bad request", () => {
    test("check when startDate is after endDate", async () => {
      request(app)
        .post("/api/v1/records")
        .send({
          startDate: "2017-10-04",
          endDate: "2016-07-21",
          minCount: 200,
          maxCount: 1000,
        })
        .expect(400);
    });

    test("check when endDate or startDate after current Date", async () => {
      request(app)
        .post("/api/v1/records")
        .send({
          startDate: "2027-10-04",
          endDate: "2016-07-21",
          minCount: 200,
          maxCount: 1000,
        })
        .expect(400);
    });

    test("check when minCount grater than maxCount", async () => {
      request(app)
        .post("/api/v1/records")
        .send({
          startDate: "2015-10-04",
          endDate: "2016-07-21",
          minCount: 500,
          maxCount: 200,
        })
        .expect(400);
    });
  });

  //when any of the payloads is missed,should respond with a status code of 400
  describe("when any of the payload is missing", () => {
    test("when startDate is missing , check if response 400 (Bad Request)", () => {
      request(app)
        .post("/api/v1/records")
        .send({
          endDate: "2018-07-21",
          minCount: 200,
          maxCount: 1000,
        })
        .expect(400);
    });
  });
});

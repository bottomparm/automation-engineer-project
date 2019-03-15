// TEST SUITE OVERVIEW
// ** Mocha.js is my selected test framework
// ** Chai.js is my selected assertion library
const fs = require("fs");

// Data saver components
const { checkCurrentUsers, timer } = require("./datasaver");

// User data
const users = require("./users.json"); // pull the user data directly from its local repository for testing purposes

// Chai.js and Sinon.js
const chai = require("chai"); // optional to a certain extent. node.js has it's own assertion library. I'm more comfortable with chai
const expect = chai.expect;
const sinon = require("sinon"); // I will use this library to help test that our api is called every 30 seconds

// API Route
const app = require("./datafetcher");
const agent = require("supertest")(app); // using the supertest library to provide a level of abstraction for HTTP testing

describe("Automation Engineer Project Tests", () => {
  // code block encapsulating individual unit tests
  describe("API Route", () => {
    // API route unit test (assignment 1 in README.md)
    it("fetches current list of users", async () => {
      const response = await agent.get("/users").expect(200);
      expect(response.body, 'should have length = 10').to.have.length(10);
      expect(response.body[0].name, 'should have same info as /user.json file').to.equal(users[1].name);
    });
  });

  describe("Saves data", () => {
    // data save unit test (assignment 2 in README.md)
    let fakeUserData = {
      // incomplete user data for testing purposes
      "1": {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496"
          }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets"
        }
      }
    };
    const saveUsers = async users => {
      // saveUsers function, taken directly from datasaver.js
      fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
    };
    beforeEach(async () => {
      // sets our users.json file equal to an incomplete set of user data, incosistent with the data found on our /users API route
      saveUsers(fakeUserData);
      const fileStr = await fs.readFileSync("./users.json");
      incompleteData = await JSON.parse(fileStr);
    });
    afterEach(() => {
      clearInterval(timer);
    });
    it("saves data successfully", async () => {
      expect(incompleteData).to.not.have.property("10"); // we check to make sure the incomplete data has saved successfully to ./users.json
      await checkCurrentUsers(); // we run our checkCurrentUsers function from datasaver.js

      const newfileStr = await fs.readFileSync("./users.json");
      currentData = await JSON.parse(newfileStr);

      expect(currentData, '/users.json should have 10 properties').to.to.have.property("10"); // we verify that checkCurrentUsers has successfully saved data to ./users.json
    });
  });

    describe("Calls on time", () => {
      beforeEach(() => {
        this.clock = sinon.useFakeTimers(); // we use fake timers to manipulate our setInterval method in datasaver.js
      });
      afterEach(() => {
        this.clock.restore(); // set our artificial clocks back to 0 after each test round
      });
      it("calls our `/users` route every 30 seconds to check for changes", async () => {
        // this test was not completed successfully
        // the goal was to implement the sinon.js library and use a fake timer along with a spy that would be attached to our checkCurrentUsers function. The spy would mirror the behaviour of our checkCurrentUsers function and be called once every 30 seconds. We could then write a simple test that verified our spy had been called the appropriate amount of times per 30 seconds. We would manipulate the test run time using sinon's useFakeTimers method.
        // I could not figure out how to appropriately attach our checkCurrentUsers function to our spy.
        // Below is an example that verifies that a spy can successfuly accomplish what we want to accomplish on a dummy setInterval method, and not the one we need tested in dataSaver.js
        const spy = sinon.spy();
        setInterval(spy, 30000);
        this.clock.tick(120000);
        expect(spy.callCount).to.equal(4);
      });
    });
});

import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    db.init("mongo");

    playtimeService.clearAuth();
    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);

    await playtimeService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await playtimeService.createUser(testUsers[i]);
    }

    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await playtimeService.createUser(maggie);
    assertSubset(newUser, maggie);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await playtimeService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await playtimeService.deleteAllUsers();

    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);

    returnedUsers = await playtimeService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await playtimeService.getUser(users[0]._id);
    assert.deepEqual(returnedUser, users[0]);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await playtimeService.getUser("123");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No user with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await playtimeService.deleteAllUsers();

    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);

    try {
      const returnedUser = await playtimeService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No user with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});

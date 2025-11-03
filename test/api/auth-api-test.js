import { assert } from "chai";
import { maggie } from "../fixtures.js";
import { playtimeService } from "./playtime-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    playtimeService.clearAuth();
    await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggie);
    await playtimeService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await playtimeService.createUser(maggie);
    const res = await playtimeService.authenticate(returnedUser);
    assert(res.success);
    assert.isDefined(res.token);
  });

  test("verify token", async () => {
    const returnedUser = await playtimeService.createUser(maggie);
    const res = await playtimeService.authenticate(returnedUser);

    const userInfo = decodeToken(res.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check unauthorized", async () => {
    playtimeService.clearAuth();
    try {
      await playtimeService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (err) {
      assert.equal(err.response.data.statusCode, 401);
    }
  });
});

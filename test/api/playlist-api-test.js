import { EventEmitter } from "events";
import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { maggie, mozart, testPlaylists } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";

EventEmitter.setMaxListeners(25);

suite("Playlist API tests", () => {
  let user = null;

  setup(async () => {
    db.init("mongo");

    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(user);

    await playtimeService.deleteAllPlaylists();
    await playtimeService.deleteAllUsers();

    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(user);

    mozart.userId = user._id;
  });

  teardown(async () => {});

  test("create a playlist", async () => {
    const newPlaylist = await playtimeService.createPlaylist(mozart);
    assert.isNotNull(newPlaylist);
    assertSubset(mozart, newPlaylist);
  });

  test("create multiple playlists", async () => {
    for (let i = 0; i < testPlaylists.length; i += 1) {
      testPlaylists[i].userId = user._id;
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlaylist(testPlaylists[i]);
    }
    let returnedPlaylists = await playtimeService.getAllPlaylists();
    assert.equal(returnedPlaylists.length, testPlaylists.length);
    await playtimeService.deleteAllPlaylists();
    returnedPlaylists = await playtimeService.getAllPlaylists();
    assert.equal(returnedPlaylists.length, 0);
  });

  test("delete a playlist", async () => {
    const playlist = await playtimeService.createPlaylist(mozart);
    const response = await playtimeService.deletePlaylist(playlist._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaylist = await playtimeService.getPlaylist(playlist._id);
      assert.fail("Should not return a response");
    } catch (err) {
      console.log(err.response.data.message);
      assert(err.response.data.message === "No playlist with this id", "Incorrect response message");
    }
  });

  test("remove non-existent playlist", async () => {
    try {
      const response = await playtimeService.deletePlaylist("invalid id");
      assert.fail("Should not return message");
    } catch (err) {
      assert(err.response.data.message === "No playlist with this id", "Incorrect response message");
    }
  });
});

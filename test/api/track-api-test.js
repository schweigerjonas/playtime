import { EventEmitter } from "events";
import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { hawkem, maggie, maggieCredentials, popsmoke, testTracks } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";

EventEmitter.setMaxListeners(25);

const tracks = new Array(testTracks.length);

suite("Track API tests", () => {
  let user = null;
  let popsmokePlaylist = null;

  setup(async () => {
    db.init("mongo");

    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);

    await playtimeService.deleteAllTracks();
    await playtimeService.deleteAllPlaylists();
    await playtimeService.deleteAllUsers();

    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);

    popsmoke.userId = user._id;
    popsmokePlaylist = await playtimeService.createPlaylist(popsmoke);
  });

  teardown(async () => {});

  test("create a track", async () => {
    const newTrack = await playtimeService.createTrack(popsmokePlaylist._id, hawkem);
    assert.isNotNull(newTrack);
    assertSubset(hawkem, newTrack);
  });

  test("create multiple tracks", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      tracks[i] = await playtimeService.createTrack(popsmokePlaylist._id, testTracks[i]);
    }
    let returnedTracks = await playtimeService.getAllTracks();
    assert.equal(returnedTracks.length, tracks.length);
    await playtimeService.deleteAllTracks();
    returnedTracks = await playtimeService.getAllTracks();
    assert.equal(returnedTracks.length, 0);
  });

  test("delete a track", async () => {
    const track = await playtimeService.createTrack(popsmokePlaylist._id, hawkem);
    const response = await playtimeService.deleteTrack(track._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaylist = await playtimeService.getTrack(track._id);
      assert.fail("Should not return a response");
    } catch (err) {
      assert(err.response.data.message === "No track with this id", "Incorrect Response Message");
    }
  });

  test("denormalised playlist", async () => {
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createTrack(popsmokePlaylist._id, testTracks[i]);
    }
    const returnedPlaylist = await playtimeService.getPlaylist(popsmokePlaylist._id);
    assert.equal(returnedPlaylist.tracks.length, testTracks.length);
    for (let i = 0; i < testTracks.length; i += 1) {
      assertSubset(testTracks[i], returnedPlaylist.tracks[i]);
    }
  });
});

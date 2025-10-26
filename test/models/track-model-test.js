import { EventEmitter } from "events";

import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { hawkem, popsmoke, testTracks } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Track Model tests", () => {
  let popsmokeList = null;

  setup(async () => {
    db.init("mongo");
    await db.playlistStore.deleteAllPlaylists();
    await db.trackStore.deleteAllTracks();
    popsmokeList = await db.playlistStore.addPlaylist(popsmoke);
    for (let i = 0; i < testTracks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTracks[i] = await db.trackStore.addTrack(popsmokeList._id, testTracks[i]);
    }
    EventEmitter.setMaxListeners(25);
  });

  test("create a track", async () => {
    const track = await db.trackStore.addTrack(popsmokeList._id, hawkem);
    assertSubset(hawkem, track);
    assert.isDefined(track._id);
  });

  test("delete all tracks", async () => {
    let returnedTracks = await db.trackStore.getAllTracks();
    assert.equal(returnedTracks.length, 3);
    await db.trackStore.deleteAllTracks();
    returnedTracks = await db.trackStore.getAllTracks();
    assert.equal(returnedTracks.length, 0);
  });

  test("get a track - success", async () => {
    const track = await db.trackStore.addTrack(popsmokeList._id, hawkem);
    const returnedTrack = await db.trackStore.getTrackById(track._id);
    assertSubset(hawkem, track);
  });

  test("get all playlist tracks - success", async () => {
    const returnedTracks = await db.trackStore.getTracksByPlaylistId(popsmokeList._id);
    assert.equal(returnedTracks.length, testTracks.length);
  });

  test("delete one track - success", async () => {
    const id = testTracks[0]._id;
    await db.trackStore.deleteTrack(id);
    const returnedTracks = await db.trackStore.getAllTracks();
    assert.equal(returnedTracks.length, testTracks.length - 1);
    const deletedTrack = await db.trackStore.getTrackById(id);
    assert.isNull(deletedTrack);
  });

  test("get a track - failures", async () => {
    const noTrackWithId = await db.trackStore.getTrackById("123");
    assert.isNull(noTrackWithId);
  });

  test("get a track - bad params", async () => {
    let nullTrack = await db.trackStore.getTrackById("");
    assert.isNull(nullTrack);
    nullTrack = await db.trackStore.getTrackById();
    assert.isNull(nullTrack);
  });

  test("delete one track - fail", async () => {
    await db.trackStore.deleteTrack("bad-id");
    const allTracks = await db.trackStore.getAllTracks();
    assert.equal(testTracks.length, allTracks.length);
  });
});

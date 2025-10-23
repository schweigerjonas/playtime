import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testPlaylist, testPlaylist2, testPlaylists } from "./fixtures.js";

suite("Playlist Model tests", () => {
  setup(async () => {
    db.init("json");
    await db.playlistStore.deleteAllPlaylists();
    for (let i = 0; i < testPlaylists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaylists[i] = await db.playlistStore.addPlaylist(testPlaylists[i]);
    }
  });

  test("create a playlist", async () => {
    const newPlaylist = await db.playlistStore.addPlaylist(testPlaylist);
    assert.deepEqual(testPlaylist, newPlaylist);
  });

  test("delete all playlists", async () => {
    let returnedPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(returnedPlaylists.length, 3);
    await db.playlistStore.deleteAllPlaylists();
    returnedPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(returnedPlaylists.length, 0);
  });

  test("get a playlist - success", async () => {
    const playlist = await db.playlistStore.addPlaylist(testPlaylist);
    const returnedPlaylist = await db.playlistStore.getPlaylistById(playlist._id);
    assert.deepEqual(playlist, returnedPlaylist);
  });

  test("get user playlists - success", async () => {
    const playlist = await db.playlistStore.addPlaylist(testPlaylist);
    const playlist2 = await db.playlistStore.addPlaylist(testPlaylist2);
    const returnedPlaylists = await db.playlistStore.getUserPlaylists("test-id");
    assert.deepEqual(playlist, returnedPlaylists[0]);
    assert.deepEqual(playlist2, returnedPlaylists[1]);
  });

  test("delete one playlist - success", async () => {
    await db.playlistStore.deletePlaylistById(testPlaylists[0]._id);
    const returnedPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(returnedPlaylists.length, testPlaylists.length - 1);
    const deletedPlaylist = await db.playlistStore.getPlaylistById(testPlaylists[0]._id);
    assert.isNull(deletedPlaylist);
  });

  test("get a playlist - failures", async () => {
    const noPlaylistWithId = await db.playlistStore.getPlaylistById("123");
    assert.isNull(noPlaylistWithId);
  });

  test("get user playlists - failures", async () => {
    const noPlaylistsForUserId = await db.playlistStore.getUserPlaylists("123");
    assert.isNull(noPlaylistsForUserId);
  });

  test("get a playlist - bad params", async () => {
    let nullPlaylist = await db.playlistStore.getPlaylistById("");
    assert.isNull(nullPlaylist);
    nullPlaylist = await db.playlistStore.getPlaylistById();
    assert.isNull(nullPlaylist);
  });

  test("get user playlists - bad params", async () => {
    let nullPlaylist = await db.playlistStore.getUserPlaylists("");
    assert.isNull(nullPlaylist);
    nullPlaylist = await db.playlistStore.getUserPlaylists();
    assert.isNull(nullPlaylist);
  });

  test("delete one playlist - fail", async () => {
    await db.playlistStore.deletePlaylistById("bad-id");
    const allPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(testPlaylists.length, allPlaylists.length);
  });
});

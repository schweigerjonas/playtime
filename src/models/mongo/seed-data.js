export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  playlists: {
    _model: "Playlist",
    popsmoke: {
      title: "Meet the Woo",
      userId: "->users.bart",
    },
    mozart: {
      title: "Mozart Favourites",
      userId: "->users.bart",
    },
  },
  tracks: {
    _model: "Track",
    track_1: {
      title: "Welcome to the Party",
      artist: "Pop Smoke",
      duration: 4,
      playlistId: "->playlists.popsmoke",
    },
    track_2: {
      title: "Violin Concerto No. 1",
      artist: "Mozart",
      duration: 15,
      playlistId: "->playlists.mozart",
    },
    track_3: {
      title: "Hawk Em",
      artist: "Pop Smoke",
      duration: 3,
      playlistId: "->playlists.popsmoke",
    },
    track_4: {
      title: "Dior",
      artist: "Pop Smoke",
      duration: 4,
      playlistId: "->playlists.popsmoke",
    },
  },
};

import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const TrackSpec = {
  title: Joi.string().example("Welcome to the party").required(),
  artist: Joi.string().example("Pop Smoke").required(),
  duration: Joi.number().allow("").example(5).optional(),
  playlistId: IdSpec,
  _id: IdSpec,
  __v: Joi.number(),
};

export const TrackArray = Joi.array().items(TrackSpec).label("TrackArray");

export const PlaylistSpec = Joi.object()
  .keys({
    title: Joi.string().example("Mozart Favourites").required(),
    tracks: TrackArray,
    userId: IdSpec,
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("PlaylistDetails");

export const PlaylistArray = Joi.array().items(PlaylistSpec).label("PlaylistArray");

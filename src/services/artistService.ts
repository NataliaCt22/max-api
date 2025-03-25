import { HTTPStatus } from "../enum/enum";
import { Artist } from "../types/types";

export const createArtist = async (DB: D1Database, artist: Artist ) => {
  const {name, bio, genre} = artist;
  const result = await DB.prepare(
    "INSERT INTO artists (name, bio, genre) VALUES (?, ?, ?)"
  ).bind(name, bio || null, genre)
  .run();

  if (result.success) {
    return { data: {id: result.meta.last_row_id, name, bio, genre }, status: HTTPStatus.CREATED}
  } else {
    return { message: 'Error cresting artist', status: HTTPStatus.NOT_FOUND}
  }
}

export const getAllArtists = async (DB: D1Database, genre: string, name: string) => {
  
  let query = "SELECT id, name, genre FROM artists WHERE 1=1";
  const params: string[] = [];

  if (genre) {
    query += " AND LOWER(genre) = LOWER(?)";
    params.push(genre);
  }
  if (name) {
    query += " AND LOWER(name) LIKE LOWER(?)";
    params.push(`%${name}%`);
  }
  const { results, success } = await DB.prepare(query).bind(...params).all();
  if (success)
    return {data: results, status: HTTPStatus.OK}
  else return {data: [], status: HTTPStatus.NOT_FOUND}
}

export const getArtistById = async (DB: D1Database, id: number) => {
  const query = `SELECT id FROM artists WHERE id = ?`;
  const { results } = await DB.prepare(query).bind(id).all();

  if (results.length > 0) {
    return { data: results[0], status: HTTPStatus.OK };
  } else {
    return { data: null, status: HTTPStatus.NOT_FOUND };
  }
};
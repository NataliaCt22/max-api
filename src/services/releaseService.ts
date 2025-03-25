
import { HTTPStatus } from "../enum/enum";
import { Release } from "../types/types";

export const createRelease = async (DB: D1Database, release: Release) => {
  const { title, release_date, status, genre, artist_id } = release;
  const response = await DB.prepare(
    "INSERT INTO releases (title, release_date, status, genre, artist_id) VALUES (?, ?, ?, ?, ?)"
  ).bind(title, release_date, status, genre, artist_id).run();

  return {data: {
    id: response.meta.last_row_id,
    title,
    release_date,
    status, genre,
    artist_id
  }, status: HTTPStatus.CREATED};
}

export const getAllReleases = async (DB: D1Database, qParams: Partial<Release>) => {
  const {artist_id, genre, status} = qParams;

  let query = "SELECT id, title, status, artist_id, genre FROM releases WHERE 1=1";
  const params: string[] = [];

  if (artist_id) {
    query += " AND artist_id = ?";
    params.push(artist_id);
  }
  if (genre) {
    query += " AND LOWER(genre) = LOWER(?)";
    params.push(genre);
  }
  if (status) {
    query += " AND LOWER(status) = LOWER(?)";
    params.push(status);
  }

  const { results, success } = await DB.prepare(query).bind(...params).all();
  if (success)
    return {data: results, status: HTTPStatus.OK}
  else
    return {data: [], status: HTTPStatus.NOT_FOUND}
}
import { Context, Next } from "hono";
import { HTTPStatus, ReleaseStatus } from "../enum/enum";
import { getArtistById } from "../services/artistService";

export const createReleaseValidation = async (c: Context, next: Next) => {
    const { title, release_date, status, genre, artist_id } = await c.req.json();
    const validStatuses = [ReleaseStatus.RELEASED, ReleaseStatus.TRENDING, ReleaseStatus.UNRELEASED];
    if (!title || !release_date || !status || !genre || !artist_id)
        return c.json({ error: "Missing required fields" }, HTTPStatus.BAD_REQUEST);
    if (!validStatuses.includes(status)) 
        return c.json({ error: "Status not valid" }, HTTPStatus.BAD_REQUEST);
    const { data } = await getArtistById(c.env.DB, artist_id)
    if (!data) return c.json({ error: "Artist not found" }, HTTPStatus.BAD_REQUEST);
    return next();
}
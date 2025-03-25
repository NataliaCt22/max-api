import { Context, Next } from "hono";
import { HTTPStatus } from "../enum/enum";

export const createArtistValidation = async (c: Context, next: Next) => {
  try {
    const { name, genre } = await c.req.json();
    if (!name || !genre) {
      return c.json(
        { error: "Missing required fields: 'name' and 'genre' are required." },
        HTTPStatus.BAD_REQUEST
      );
    }
    return next();
  } catch (error) {
    return c.json({ error: "Invalid JSON format" }, HTTPStatus.BAD_REQUEST);
  }
};
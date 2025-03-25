import { Hono } from "hono";
import { Bindings, CreationResponse, Release } from "./types/types";
import { createArtist, getAllArtists } from "./services/artistService";
import { createRelease, getAllReleases } from "./services/releaseService";
import { createArtistValidation } from "./middlewares/artistMiddleware";
import { HTTPStatus } from "./enum/enum";
import { createReleaseValidation } from "./middlewares/releaseMiddleware";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  c.header("Content-Type", "application/json");
  await next();
});

app.post("/artists", createArtistValidation, async (c) => {
  try {
    const body = await c.req.json();
    const {message, status, data}: CreationResponse = await createArtist(c.env.DB, body)
    if (status === HTTPStatus.CREATED) {
      return c.json(data, status);
    } else {
      return c.json({ error: message }, status);
    }
  } catch (error) {
    console.error("Error creating artist:", error);
    return c.json({ error: "Internal Server Error" }, HTTPStatus.SERVER_ERROR);
  }
});

app.get("/artists", async (c) => {
  try {
    const { genre, name } = c.req.query();
    const { data, status } = await getAllArtists(c.env.DB, genre, name);
    return c.json(data, status);
  } catch (error) {
    console.error("Error getting artists:", error);
    return c.json({ error: "Internal Server Error" }, HTTPStatus.SERVER_ERROR);
  }
});

app.post("/releases", createReleaseValidation, async (c) => {
  try{
    const release: Release = await c.req.json();
    const { data, status } = await createRelease(c.env.DB, release);
    return c.json({data}, status)
  } catch (error) {
    console.error("Error creating release:", error);
    return c.json({ error: "Internal Server Error" }, HTTPStatus.SERVER_ERROR);
  }
});

app.get("/releases", async (c) => {
  try {
    const {data, status} = await getAllReleases(c.env.DB, c.req.query())
    return c.json(data, status);
  } catch (error) {
    console.error("Error getting releases:", error);
    return c.json({ error: "Internal Server Error" }, HTTPStatus.SERVER_ERROR);
  }
});

export default app;
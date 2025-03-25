import { describe, it, expect } from "vitest";
import { Artist, CreationResponse } from "../src/types/types";
import { HTTPStatus } from "../src/enum/enum";

const url = "http://localhost:8787";
const feature : Artist = {
  name: "Artist 1",
  bio: "Boho",
  genre: "Pop",
}

describe("Artists API", () => {
  it("should create an artist", async () => {
    const response = await fetch(`${url}/artists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feature),
    });
    const body: Artist = await response.json();
    expect(response.status).toBe(HTTPStatus.CREATED || 201);
    expect(body).toHaveProperty("id");
    expect(body?.name).toBe(feature.name);
  });

  it("should return an error for missing required fields", async () => {
    const response = await fetch(`${url}/artists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Incomplete Artist" }),
    });
    const { error }: CreationResponse = await response.json();
    expect(response.status).toBe(HTTPStatus.BAD_REQUEST || 400);
    expect(error).toMatch(/Missing required fields/);
  });

  it("should fetch all artists", async () => {
    const response = await fetch(`${url}/artists`, {
      method: "GET",
    });
    const data = await response.json();
    expect(response.status).toBe(HTTPStatus.OK || 200);
    expect(Array.isArray(data)).toBe(true);
  });

  it("should filter artists by genre", async () => {
    const response = await fetch(`${url}/artists?genre=${feature.genre}`, {
      method: "GET",
    });
    const data: Artist[] = await response.json();
    expect(response.status).toBe(HTTPStatus.OK || 200);
    expect(Array.isArray(data)).toBe(true);
    data.forEach((artist: Artist) => {
      expect(artist.genre).toBe(feature.genre);
    });
  });
});

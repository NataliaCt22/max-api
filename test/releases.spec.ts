import { describe, it, expect } from "vitest";
import { ReleaseCreationResponse, Release } from "../src/types/types";
import { HTTPStatus, ReleaseStatus } from "../src/enum/enum";

const url = "http://localhost:8787";

const feature: Release = {
  title: "New Single Of",
  release_date: "2025-04-01",
  status: ReleaseStatus.UNRELEASED,
  genre: "Pop",
  artist_id: "1",
}

describe("Releases API", () => {
  it("should create a release", async () => {
    const response = await fetch(`${url}/releases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feature),
    });
    expect(response.status).toBe(HTTPStatus.CREATED);
    const { data }: ReleaseCreationResponse = await response.json();
    expect(data).toHaveProperty("id");
    expect(data?.title).toBe(feature.title);
  });

  it("should return an error for missing required fields", async () => {
    const response = await fetch(`${url}/releases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Incomplete Release" }),
    });
    expect(response.status).toBe(HTTPStatus.BAD_REQUEST);
    const { error }: ReleaseCreationResponse = await response.json();
    expect(error).toMatch(/Missing required fields/);
  });

  it("should fetch all releases", async () => {
    const response = await fetch(`${url}/releases`, { method: "GET" });
    expect(response.status).toBe(HTTPStatus.OK);
    const data: Release[] = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it("should filter releases by artist_id", async () => {
    const response = await fetch(`${url}/releases?artist_id=${feature.artist_id}`, { method: "GET" });
    expect(response.status).toBe(HTTPStatus.OK);
    const data: Release[] = await response.json();
    expect(Array.isArray(data)).toBe(true);
    data.forEach((release) => {
      expect(release.artist_id).toBe(feature.artist_id);
    });
  });

  it("should filter releases by genre", async () => {
    const encodedGenre = encodeURIComponent(feature.genre);
    const response = await fetch(`${url}/releases?genre=${feature.genre}`, {
      method: "GET",
    });
    expect(response.status).toBe(HTTPStatus.OK);
    let data: Release[] = await response.json();
    expect(Array.isArray(data)).toBe(true);
    data.forEach((release) => {
      expect(release.genre).toBe(feature.genre);
    });
  });
  

  it("should filter releases by status", async () => {
    const response = await fetch(`${url}/releases?status=${feature.status}`, { method: "GET" });
    expect(response.status).toBe(HTTPStatus.OK);
    const data: Release[] = await response.json();
    expect(Array.isArray(data)).toBe(true);
    data.forEach((release) => {
      expect(release.status).toBe(feature.status);
    });
  });
});

import { ContentfulStatusCode } from "hono/utils/http-status";
import { ReleaseStatus } from "../enum/enum";

export type Bindings = { DB: D1Database };

export type Artist = { 
    name: string,
    bio: string,
    genre: string
};

export type CreationResponse = {
    message?: string,
    error?: string,
    status: ContentfulStatusCode,
    data?: Artist
};

export type ReleaseCreationResponse = CreationResponse & {
    data?: Release
};
  
export type Release = {
    title: string;
    release_date: string | Date;
    status: ReleaseStatus;
    genre: string;
    artist_id: string;
};
  
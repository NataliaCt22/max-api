export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
};

export enum ReleaseStatus {
  UNRELEASED = "unreleased",
  RELEASED = "released",
  TRENDING = "trending"
};
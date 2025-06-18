"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _helpers = require("../../helpers");
var _user = require("./../mockdata/user");
var _app = _interopRequireDefault(require("../../app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe("POST Register user", () => {
  afterAll(async () => {
    await _helpers.redisClient.quit();
  });
  it("should return a 200 response when user signup with valid credentials", async () => {
    const response = await (0, _supertest.default)(_app.default).post("/api/user/register").send(_user.signupUser);
    expect(response.status).toBe(200);
  });
  it("should return 400 if not name in the form", async () => {
    const response = await (0, _supertest.default)(_app.default).post("/api/user/register").send(_user.signupWithNoname);
    expect(response.status).toBe(400);
  });
  it("should return 400 if not email in the form", async () => {
    const response = await (0, _supertest.default)(_app.default).post("/api/user/register").send(_user.signupWithNoEmail);
    expect(response.status).toBe(400);
  });
  it("should return 400 if not password in the form", async () => {
    const response = await (0, _supertest.default)(_app.default).post("/api/user/register").send(_user.signupWithNoPassword);
    expect(response.status).toBe(400);
  });
});
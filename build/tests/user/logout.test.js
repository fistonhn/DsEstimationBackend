"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _models = require("../../database/models");
var _user = require("./../mockdata/user");
var _app = _interopRequireDefault(require("../../app"));
var _helpers = require("../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe("DELETE logout user", () => {
  afterAll(async () => {
    await _models.Users.destroy({
      where: {}
    });
    await _helpers.redisClient.quit();
  });
  let token;
  let userId;
  it("should login before logout", async () => {
    const user = await _models.Users.create(_user.validUserSignup);
    userId = user.id;
    const response = await (0, _supertest.default)(_app.default).post("/api/user/login").send(_user.validUserLogin);
    token = response.body.data.accessToken;
    expect(response.status).toBe(200);
  });
  it("should return a 200 response when user logout", async () => {
    const response = await (0, _supertest.default)(_app.default).delete("/api/user/logout").set("auth-token", token);
    await _helpers.redisClient.del(`refreshToken-${userId}`);
    await _helpers.redisClient.del(`accessToken-${userId}`);
    expect(response.status).toBe(200);
  });
  it("should return 401 if no token found", async () => {
    const response = await (0, _supertest.default)(_app.default).delete(`/api/user/logout`);
    expect(response.status).toBe(401);
  });
  it("should return 400 if user try to logout again", async () => {
    const response = await (0, _supertest.default)(_app.default).delete(`/api/user/logout`).set("auth-token", token);
    await _helpers.redisClient.del(`refreshToken-${userId}`);
    await _helpers.redisClient.del(`accessToken-${userId}`);
    expect(response.status).toBe(400);
  });
});
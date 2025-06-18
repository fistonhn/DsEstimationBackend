"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _models = require("../../database/models");
var _user = require("../mockdata/user");
var _app = _interopRequireDefault(require("../../app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// drop users table  after all tests
describe("LOGIN POST /api/user/login", () => {
  // drop users table  after all tests
  afterAll(async () => {
    await _models.Users.destroy({
      where: {}
    });
  });
  it("should return a 200 response when user login with valid credentials", async () => {
    // CREATE USER
    await _models.Users.create(_user.validUserSignup);
    const response = await (0, _supertest.default)(_app.default).post("/api/user/login").send(_user.validUserLogin);
    expect(response.status).toBe(200);
    expect(response.body.data.accessToken).toBeTruthy();
  });
  it("should return 400 if not password in the form", async () => {
    const response = await (0, _supertest.default)(_app.default).post("/api/user/login").send(_user.loginWithNoPassword);
    expect(response.status).toBe(400);
  });
  it("should return 400 if not email in the form", async () => {
    const response = await (0, _supertest.default)(_app.default).post("/api/user/login").send(_user.loginWithNoEmail);
    expect(response.status).toBe(400);
  });
  it("should return 401 if password is wrong", async () => {
    const response = await (0, _supertest.default)(_app.default).post("/api/user/login").send(_user.loginWithWrongPassword);
    expect(response.status).toBe(400);
  });
  it("should return 401 if email is wrong", async () => {
    const response = await (0, _supertest.default)(_app.default).post("/api/user/login").send(_user.loginWithWrongEmail);
    expect(response.status).toBe(400);
  });
});
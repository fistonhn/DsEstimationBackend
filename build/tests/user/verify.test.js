"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _models = require("../../database/models");
var _user = require("./../mockdata/user");
var _jwt_helper = require("../../helpers/jwt_helper");
var _app = _interopRequireDefault(require("../../app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe("VERIFY user", () => {
  afterAll(async () => {
    await _models.Users.destroy({
      where: {}
    });
  });

  // write verify and save user to database
  it("should return 400 if user already exist", async () => {
    await _models.Users.create(_user.validUserSignup);
    const token = (0, _jwt_helper.generateTokenVerify)(_user.validUserSignup);
    const response = await (0, _supertest.default)(_app.default).get("/api/user/verify/signup").query({
      token
    });
    expect(response.status).toBe(400);
  });
  it("should return redirect user to the frontend url", async () => {
    const token = (0, _jwt_helper.generateTokenVerify)(_user.signupUser);
    const response = await (0, _supertest.default)(_app.default).get("/api/user/verify/signup").query({
      token
    });
    expect(response.status).toBe(302);
  });
});
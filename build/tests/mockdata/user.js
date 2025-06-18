"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validUserSignup = exports.validUserLogin = exports.signupWithNoname = exports.signupWithNoPassword = exports.signupWithNoEmail = exports.signupUser = exports.regularUserSignup = exports.regularUserLogin = exports.moderatorSignup = exports.moderatorLogin = exports.loginWithWrongPassword = exports.loginWithWrongEmail = exports.loginWithNoPassword = exports.loginWithNoEmail = void 0;
const validUserLogin = exports.validUserLogin = {
  email: "test@test.com",
  password: "12345678"
};
const validUserSignup = exports.validUserSignup = {
  name: "test",
  email: "test@test.com",
  password: "$2a$10$5v6kRiwA/34Qyd5SMdev0OzWsYAsRbR7ylVB9TfNNWt6K77mEsWRK",
  isConfirmed: true,
  role: "admin"
};
const moderatorSignup = exports.moderatorSignup = {
  name: "owner",
  email: "moderator@test.com",
  password: "$2a$10$5v6kRiwA/34Qyd5SMdev0OzWsYAsRbR7ylVB9TfNNWt6K77mEsWRK",
  isConfirmed: true,
  role: "owner"
};
const regularUserSignup = exports.regularUserSignup = {
  name: "manager",
  email: "regulartest@test.com",
  password: "$2a$10$5v6kRiwA/34Qyd5SMdev0OzWsYAsRbR7ylVB9TfNNWt6K77mEsWRK",
  isConfirmed: true,
  role: "manager"
};
const regularUserLogin = exports.regularUserLogin = {
  email: "regulartest@test.com",
  password: "12345678"
};
const moderatorLogin = exports.moderatorLogin = {
  email: "moderator@test.com",
  password: "12345678"
};
const loginWithNoEmail = exports.loginWithNoEmail = {
  password: "12345678"
};
const loginWithNoPassword = exports.loginWithNoPassword = {
  email: "test@test.com"
};
const loginWithWrongPassword = exports.loginWithWrongPassword = {
  email: "test@test.com",
  password: "1234567"
};
const loginWithWrongEmail = exports.loginWithWrongEmail = {
  email: "invalid@test.com",
  password: "12345678"
};
const signupUser = exports.signupUser = {
  name: "test",
  email: "testplain@test.com",
  password: "1234567890"
};
const signupWithNoname = exports.signupWithNoname = {
  email: "test@test.com",
  password: "12345678"
};
const signupWithNoEmail = exports.signupWithNoEmail = {
  name: "test",
  password: "12345678"
};
const signupWithNoPassword = exports.signupWithNoPassword = {
  name: "test",
  email: "test@test.com"
};
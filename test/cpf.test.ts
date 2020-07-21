import * as cpf from "../src/index";

it("rejects common numbers", () => {
  expect(cpf.isValid("00000000000")).toBeFalsy();
  expect(cpf.isValid("11111111111")).toBeFalsy();
  expect(cpf.isValid("22222222222")).toBeFalsy();
  expect(cpf.isValid("33333333333")).toBeFalsy();
  expect(cpf.isValid("44444444444")).toBeFalsy();
  expect(cpf.isValid("55555555555")).toBeFalsy();
  expect(cpf.isValid("66666666666")).toBeFalsy();
  expect(cpf.isValid("77777777777")).toBeFalsy();
  expect(cpf.isValid("88888888888")).toBeFalsy();
  expect(cpf.isValid("99999999999")).toBeFalsy();
});

it("rejects falsy values", () => {
  expect(cpf.isValid("")).toBeFalsy();
  expect(cpf.isValid(null)).toBeFalsy();
  expect(cpf.isValid(undefined)).toBeFalsy();
});

it("validates formatted strings", () => {
  expect(cpf.isValid("295.379.955-93")).toBeTruthy();
});

it("validates unformatted strings", () => {
  expect(cpf.isValid("29537995593")).toBeTruthy();
});

it("validates messed strings", () => {
  expect(cpf.isValid("295$379\n955...93")).toBeTruthy();
  expect(cpf.isValid(" 295$379 955\ns93 ")).toBeTruthy();
});

it("strictly validates strings", () => {
  expect(cpf.isValid("295$379\n955...93", true)).toBeFalsy();
  expect(cpf.isValid("295.379.955-93", true)).toBeTruthy();
  expect(cpf.isValid("29537995593", true)).toBeTruthy();
});

it("returns stripped number", () => {
  expect(cpf.strip("295.379.955-93")).toEqual("29537995593");
  expect(cpf.strip("295a379b955c93")).toEqual("29537995593");
  expect(cpf.strip("295a379b955c93", true)).not.toEqual("29537995593");
});

it("returns formatted number", () => {
  const number = cpf.format("29537995593");
  expect(number).toEqual("295.379.955-93");
});

it("generates formatted number", () => {
  const number = cpf.generate(true);

  expect(number).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  expect(cpf.isValid(number)).toBeTruthy();
});

it("generates unformatted number", () => {
  const number = cpf.generate();

  expect(number).toMatch(/^\d{3}\d{3}\d{3}\d{2}$/);
  expect(cpf.isValid(number)).toBeTruthy();
});

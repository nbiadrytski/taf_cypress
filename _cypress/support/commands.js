// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export function goToUrl(url) {
  return cy.visit(url);
}

export function goToBaseUrl() {
  return goToUrl(Cypress.env("URL"));
}

export function wrapObject(object) {
  return cy.wrap(object);
}

export function executeCommand(command) {
  cy.exec(command);
}

export function getElement(selector) {
  return cy.get(selector);
}

export function getElementByContains(selector, containsValue) {
  return getElement(selector).contains(containsValue);
}

export function clickElement(selector, elementText = "") {
  if (elementText) {
    return getElementByContains(selector, elementText).click();
  }
  return getElement(selector).click();
}

export function typeIntoElement(selector, value, elementText = "") {
  if (elementText) {
    return getElementByContains(selector, elementText).type(value);
  }
  return getElement(selector).type(value);
}

export function getElementChildren(selector, elementText = "") {
  if (elementText) {
    return getElementByContains(selector, elementText).children();
  }
  return getElement(selector).children();
}

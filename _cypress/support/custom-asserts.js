import selectors from "./selectors";
import constants from "./constants";
import {
  getElement,
  getElementByContains,
  getElementChildren,
  wrapObject,
} from "./commands";

export function attributeValueShouldBe(
  selector,
  attribute,
  attributeValue,
  elementText = ""
) {
  if (elementText) {
    return getElementByContains(selector, elementText)
      .should(constants.chainers.haveAttr, attribute)
      .and(constants.chainers.equal, attributeValue);
  }
  return getElement(selector)
    .should(constants.chainers.haveAttr, attribute)
    .and(constants.chainers.equal, attributeValue);
}

export function attributeValueShouldContain(
  selector,
  attribute,
  attributeValue,
  elementText = ""
) {
  if (elementText) {
    return getElementByContains(selector, elementText)
      .should(constants.chainers.haveAttr, attribute)
      .and(constants.chainers.contain, attributeValue);
  }
  return getElement(selector)
    .should(constants.chainers.haveAttr, attribute)
    .and(constants.chainers.contain, attributeValue);
}

export function listLengthShouldBe(selector, expectedLength) {
  return getElementChildren(selector).should(($item) => {
    expect($item).to.have.length(expectedLength);
  });
}

export function pageTitleShouldBe(title) {
  return getElement(selectors.content.pageTitle).should(
    constants.chainers.haveText,
    title
  );
}

export function linksShouldOpenInNewTab(selector) {
  return getElement(selector).each((element) => {
    wrapObject(element)
      .invoke("attr", "target")
      .should(constants.chainers.equal, "_blank");
  });
}

export function listItemsTextValuesShouldEqual(listSelector, expectedList) {
  const textValuesList = [];
  return getElement(listSelector)
    .each((item) => {
      textValuesList.push(item.text());
    })
    .then(() => textValuesList)
    .should(constants.chainers.deepEqual, expectedList);
}

export function shouldHaveText(selector, expectedText, elementText = "") {
  if (elementText) {
    return getElementByContains(selector, elementText).should(
      constants.chainers.haveText,
      expectedText
    );
  }
  return getElement(selector).should(constants.chainers.haveText, expectedText);
}

export function shouldContainText(selector, expectedText, elementText = "") {
  if (elementText) {
    return getElementByContains(selector, elementText).should(
      constants.chainers.containText,
      expectedText
    );
  }
  return getElement(selector).should(
    constants.chainers.containText,
    expectedText
  );
}

export function shouldHaveClass(selector, className, elementText = "") {
  if (elementText) {
    return getElementByContains(selector, elementText).should(
      constants.chainers.haveClass,
      className
    );
  }
  return getElement(selector).should(constants.chainers.haveClass, className);
}

export function shouldExist(selector, elementText = "") {
  if (elementText) {
    return getElementByContains(selector, elementText).should(
      constants.chainers.exist
    );
  }
  return getElement(selector).should(constants.chainers.exist);
}

export function shouldMatchRegexp(selector, regexp, elementText = "") {
  if (elementText) {
    return getElementByContains(selector, elementText)
      .invoke("text")
      .should(constants.chainers.match, regexp);
  }
  return getElement(selector)
    .invoke("text")
    .should(constants.chainers.match, regexp);
}

export function expectIndexItemToContain(item, index, value) {
  expect(item.eq(index)).to.contain(value);
}

export function expectIndexItemToHaveHrefValue(item, index, value) {
  expect(item.eq(index)).to.have.attr("href", value);
}

export function expectIndexItemToHaveText(item, index, value) {
  expect(item.eq(index)).to.have.text(value);
}

export function expectIndexItemToHaveClass(item, index, value) {
  expect(item.eq(index)).to.have.class(value);
}

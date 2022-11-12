import selectors from "../../_cypress/support/selectors";
import {
  clickElement,
  getElementChildren,
  goToBaseUrl,
} from "../../_cypress/support/commands";
import {
  attributeValueShouldBe,
  expectIndexItemToHaveClass,
  expectIndexItemToHaveHrefValue,
  listItemsTextValuesShouldEqual,
  shouldHaveClass,
} from "../../_cypress/support/custom-asserts";

const SELECTED_CLASS = "selected";
const BIAS_AND_FAIRNESS_CATEGORY = "Bias and Fairness";
const GLOSSARY_LETTER_SELECTOR = "h2#";
const GLOSSARY_CATEGORY_BUTTON = `${selectors.glossary.categoriesList} .md-button`;

context("Glossary", () => {
  beforeEach(() => {
    goToBaseUrl();
  });

  it("filters Glossary categories", () => {
    clickElement(selectors.landingPage.cardTitle, "Glossary");

    getElementChildren(selectors.glossary.categoriesList).then((category) => {
      [...Array(7)].forEach((_, index) =>
        expectIndexItemToHaveHrefValue(category, index, "#")
      );
      expectIndexItemToHaveClass(category, 0, SELECTED_CLASS);
    });

    listItemsTextValuesShouldEqual(`${selectors.glossary.categoriesList} a`, [
      "All",
      "AI Catalog",
      BIAS_AND_FAIRNESS_CATEGORY,
      "Data Prep",
      "Feature Discovery",
      "Time-aware",
      "Visual AI",
    ]);

    clickElement(GLOSSARY_CATEGORY_BUTTON, BIAS_AND_FAIRNESS_CATEGORY).then(
      () => {
        shouldHaveClass(
          GLOSSARY_CATEGORY_BUTTON,
          SELECTED_CLASS,
          BIAS_AND_FAIRNESS_CATEGORY
        );
      }
    );

    // Bias and Fairness terms have terms starting with F, P, Z letters
    const biasAndFairnessTermsLetters = [
      `${GLOSSARY_LETTER_SELECTOR}f`,
      `${GLOSSARY_LETTER_SELECTOR}p`,
      `${GLOSSARY_LETTER_SELECTOR}z`,
    ];
    biasAndFairnessTermsLetters.forEach((letterSelector) => {
      attributeValueShouldBe(letterSelector, "style", "display: block;");
    });

    // Bias and Fairness terms don't have terms starting with A, B, C letters
    const biasAndFairnessHiddenTermsLetters = [
      `${GLOSSARY_LETTER_SELECTOR}a`,
      `${GLOSSARY_LETTER_SELECTOR}b`,
      `${GLOSSARY_LETTER_SELECTOR}c`,
    ];
    biasAndFairnessHiddenTermsLetters.forEach((letterSelector) => {
      attributeValueShouldBe(letterSelector, "style", "display: none;");
    });
  });
});

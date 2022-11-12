import selectors from "../../_cypress/support/selectors";
import {
  shouldExist,
  shouldHaveText,
  listLengthShouldBe,
} from "../../_cypress/support/custom-asserts";
import { getElement, goToBaseUrl } from "../../_cypress/support/commands";

const H4 = ".card-container .h4";
const SVG = ".card-container svg";
const CAPTION = ".card-container .caption";

context("Landing page", () => {
  beforeEach(() => {
    goToBaseUrl();
  });

  it("checks title and subtitle", () => {
    // Title
    shouldHaveText(
      selectors.landingPage.title,
      "Welcome to DR Documentation"
    );

    // Subtitle
    shouldHaveText(
      selectors.landingPage.subtitle,
      "Find all the information you need to succeed with DR, in a style that suits you best."
    );
  });

  it("checks content cards", () => {
    // There are 5 cards
    listLengthShouldBe(selectors.landingPage.cardsContainer, 5);

    const pathPrefix = "/en";
    const cards = [
      {
        expectedHref: `${pathPrefix}/platform`,
        expectedTitle: "Platform",
        expectedCaption: "Docs for UI-based DR use",
      },
      {
        expectedHref: `${pathPrefix}/api`,
        expectedTitle: "API",
        expectedCaption: "Docs for code-based DR use",
      },
      {
        expectedHref: `${pathPrefix}/tutorials`,
        expectedTitle: "Tutorials",
        expectedCaption: "Short tutorials for modeling success",
      },
      {
        expectedHref: `${pathPrefix}/notebooks`,
        expectedTitle: "Notebooks",
        expectedCaption: "Docs for DR dd notebooks",
      },
      {
        expectedHref: `${pathPrefix}/docs/glossary/index.html`,
        expectedTitle: "Glossary",
        expectedCaption: "DR-specific terms defined",
      },
    ];

    // Check href, title and description of each card
    cards.forEach((card, index) =>
      checkCard(
        index,
        card.expectedHref,
        card.expectedTitle,
        card.expectedCaption
      )
    );
  });
});

function checkCard(index, href, title, description) {
  getElement(selectors.landingPage.cardsContainerList)
    .eq(index)
    .then(() => shouldHaveText(`a[href="${href}"] ${H4}`, title))
    .then(() => shouldHaveText(`a[href="${href}"] ${CAPTION}`, description))
    .then(() => shouldExist(`a[href="${href}"] ${SVG}`));
}

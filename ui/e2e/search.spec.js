import selectors from "../../_cypress/support/selectors";
import constants from "../../_cypress/support/constants";
import {
  clickElement,
  goToBaseUrl,
  typeIntoElement,
} from "../../_cypress/support/commands";
import {
  attributeValueShouldBe,
  listItemsTextValuesShouldEqual,
  shouldContainText,
  shouldExist,
  shouldHaveClass,
  shouldHaveText,
} from "../../_cypress/support/custom-asserts";

const SEARCH_STRING = "You can connect Data Prep to multiple SMB shares";
const NO_RESULTS_SEARCH_STRING = "foo bar";
const SEARCH_RESULT = "Network Share SMB Connector for Data Prep";
const PRIMARY_CLASS = "primary";
const SEARCH_SECTIONS = [
  "All",
  "Platform",
  "API",
  "Tutorials",
  "Notebooks",
  "Glossary",
];

context("Search", () => {
  beforeEach(() => {
    goToBaseUrl();
  });

  it("searches for a string and validates the result", () => {
    typeIntoSearchField(SEARCH_STRING);

    // 'Copied to clipboard small' dialog appears in the bottom left corner
    clickElement(selectors.search.shareIcon).then(() => {
      attributeValueShouldBe(
        selectors.search.copiedToClipboardDialog,
        "data-md-state",
        "open"
      );
    });

    // Search sections: All, Platform, API, Tutorials, Notebooks, Glossary
    listItemsTextValuesShouldEqual(
      `${selectors.search.searchSectionButtons} button`,
      SEARCH_SECTIONS
    );

    // Search section 'All' button is highlighted
    shouldHaveClass(
      selectors.search.searchSectionButtons,
      PRIMARY_CLASS,
      constants.contentSections.all
    );

    // 1 result found
    assertResultsFound(1);

    selectSearchSection(constants.contentSections.platform);

    // Search result item has text 'Network Share SMB Connector for Data Prep'
    shouldHaveText(selectors.search.searchResultItemDescription, SEARCH_RESULT);

    // Svg icon to the left of Search result item
    assertSvgIconIsPresent(selectors.search.searchResultItemIcon, "52", "52");

    // PLATFORM label to the right of Search result item
    shouldHaveText(selectors.search.searchResultItemSectionBadge, "platform");

    shouldHaveText(
      selectors.search.previewContentBreadcrumbs,
      "Data/Data Connections/Connect to data sources for Data Prep/"
    );

    // Preview content title
    shouldHaveText(selectors.search.previewContentTitle, SEARCH_RESULT);
    // Preview content Table of contents exists
    shouldContainText(selectors.search.previewContentToc, "Table of contents");
    // Preview content paragraph has 'SMB' text
    shouldContainText(selectors.search.previewContentParagraph, "SMB");
  });

  it("no search results found", () => {
    const iconSize = { width: "40", height: "40" };

    typeIntoSearchField(NO_RESULTS_SEARCH_STRING);

    assertResultsFound(0);
    assertSvgIconIsPresent(
      selectors.search.noResultsSvg,
      iconSize.width,
      iconSize.height
    );
    validateNoResultsDescription(
      `No results for “${NO_RESULTS_SEARCH_STRING}“.Please try another search.`
    );
    assertNoResultToPreview();

    selectSearchSection(constants.contentSections.tutorials);
    assertSvgIconIsPresent(
      selectors.search.noResultsSvg,
      iconSize.width,
      iconSize.height
    );
    validateNoResultsDescription(
      `No results in ${constants.contentSections.tutorials} tab`
    );
    assertNoResultToPreview();

    // User is brought to 'All' search section after clicking 'Show all results' button
    clickElement(
      selectors.search.showAllResultsButton,
      "Show all results"
    ).then(() => {
      shouldHaveClass(
        selectors.search.searchSectionButtons,
        PRIMARY_CLASS,
        constants.contentSections.all
      );
    });

    validateNoResultsDescription(
      `No results for “${NO_RESULTS_SEARCH_STRING}“.Please try another search.`
    );
  });
});

function typeIntoSearchField(searchString) {
  typeIntoElement(selectors.search.searchBoxForm, searchString);

  // Entered search string is present in opened Algolia search box
  attributeValueShouldBe(
    selectors.search.filledInSearchBoxForm,
    "value",
    searchString
  );
}

function assertResultsFound(number) {
  const text =
    number === 1
      ? `${number.toString()} result found`
      : `${number.toString()} results found`;
  shouldHaveText(selectors.search.nResultsFoundLabel, text);
}

function selectSearchSection(sectionTitle) {
  // Select Platform search section. The button is highlighted
  clickElement(selectors.search.searchSectionButtons, sectionTitle).then(() => {
    shouldHaveClass(
      selectors.search.searchSectionButtons,
      PRIMARY_CLASS,
      sectionTitle
    );
  });
}

function assertNoResultToPreview() {
  shouldHaveText(selectors.search.noResultsPreview, "No result to preview.");
}

function assertSvgIconIsPresent(iconSelector, width, height) {
  shouldExist(iconSelector).then(() => {
    attributeValueShouldBe(iconSelector, "width", width).then(() => {
      attributeValueShouldBe(iconSelector, "height", height);
    });
  });
}

function validateNoResultsDescription(text) {
  shouldHaveText(selectors.search.noResultsDescription, text);
}

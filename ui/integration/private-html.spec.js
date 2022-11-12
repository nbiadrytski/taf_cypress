import selectors from "../../_cypress/support/selectors";
import constants from "../../_cypress/support/constants";
import {
  attributeValueShouldBe,
  attributeValueShouldContain,
  shouldExist,
  shouldHaveText,
  shouldMatchRegexp,
  listLengthShouldBe,
  pageTitleShouldBe,
  expectIndexItemToContain,
  expectIndexItemToHaveHrefValue,
  expectIndexItemToHaveText,
} from "../../_cypress/support/custom-asserts";
import {
  clickElement,
  getElementChildren,
  goToUrl,
} from "../../_cypress/support/commands";

context("Private html", () => {
  it("checks header DR icon and navigation items", () => {
    goToUrl(constants.privateUrls.integrationUrl);

    // Check DR logo
    attributeValueShouldBe(selectors.header.drLogo, "title", "DR docs");
    attributeValueShouldBe(selectors.header.drLogo, "href", "index.html");
    attributeValueShouldContain(
      `${selectors.header.drLogo} img`,
      "src",
      "logo.svg"
    );

    // Check header has 5 nav items
    listLengthShouldBe(selectors.header.navButtonsList, 5);

    const navigationItems = [
      {
        expectedHref: "index.html",
        elementText: constants.contentSections.platform,
      },
      {
        expectedHref: "api/index.html",
        elementText: constants.contentSections.api,
      },
      {
        expectedHref: "tutorials/index.html",
        elementText: constants.contentSections.tutorials,
      },
      {
        expectedHref: "notebooks/index.html",
        elementText: constants.contentSections.notebooks,
      },
      {
        expectedHref: "glossary/index.html",
        elementText: constants.contentSections.glossary,
      },
    ];

    // Check each header nav item: Platform, API, Tutorials, Notebooks, Glossary
    navigationItems.forEach((item) =>
      attributeValueShouldContain(
        selectors.header.navButtonsList,
        "href",
        item.expectedHref,
        item.elementText
      )
    );
  });

  it("checks books selection from the top left dropdown", () => {
    goToUrl(constants.privateUrls.integrationDataTabUrl);

    // Book selector dropdown has 'Data' value selected
    shouldHaveText(
      selectors.bookSelector.selectedItem,
      constants.contentName.data
    );

    clickElement(selectors.bookSelector.selectedItem);

    const bookSelectorDropdownOptions = [
      {
        dataValue: "index.html",
        elementText: constants.contentName.data,
      },
      {
        dataValue: "import-data/index.html",
        elementText: constants.contentName.importData,
      },
      {
        dataValue: "connect-data-sources/index.html",
        elementText: constants.contentName.dataConnections,
      },
      {
        dataValue: "prepare-data/index.html",
        elementText: constants.contentName.prepareData,
      },
    ];

    bookSelectorDropdownOptions.forEach((item) =>
      attributeValueShouldBe(
        selectors.bookSelector.dropdownItem,
        "data-value",
        item.dataValue,
        item.elementText
      )
    );

    // Select Import Data dropdown option
    clickElement(
      selectors.bookSelector.dropdownItem,
      constants.contentName.importData
    );

    // Book selector dropdown has 'Import Data' value selected
    shouldHaveText(
      selectors.bookSelector.selectedItem,
      constants.contentName.importData
    );

    // Import Data book is expanded in the left menu.
    // 'Large dataset' child item is now available
    shouldExist(selectors.leftMenuNavLinks.largeDatasets);
  });

  it("should check breadcrumbs chaining and page title", () => {
    goToUrl(constants.privateUrls.integrationDataTabUrl);

    clickElement(selectors.leftMenuNavLinks.importData);
    pageTitleShouldBe(constants.contentName.importData);

    clickElement(selectors.leftMenuNavLinks.largeDatasets);
    pageTitleShouldBe(constants.contentName.largeDatasets);

    // Check Data > Import data > Large datasets breadcrumbs chain
    listLengthShouldBe(selectors.content.breadcrumbs, 5);
    getElementChildren(selectors.content.breadcrumbs).should((breadcrumb) => {
      expectIndexItemToContain(breadcrumb, 0, constants.contentName.data);
      expectIndexItemToHaveHrefValue(breadcrumb, 0, "../../index.html");
      expectIndexItemToHaveText(breadcrumb, 1, ">");
      expectIndexItemToContain(breadcrumb, 2, constants.contentName.importData);
      expectIndexItemToHaveHrefValue(breadcrumb, 2, "../index.html");
      expectIndexItemToHaveText(breadcrumb, 3, ">");
      expectIndexItemToHaveText(
        breadcrumb,
        4,
        constants.contentName.largeDatasets
      );
    });

    clickElement(
      selectors.content.breadcrumbs,
      constants.contentName.importData
    );
    pageTitleShouldBe(constants.contentName.importData);
  });

  it("should check Home page has 'Updated {date}' label, e.g. 'Updated July 30, 2021' ", () => {
    goToUrl(constants.privateUrls.integrationUrl);

    shouldExist(selectors.updated.text, "Updated");

    shouldMatchRegexp(
      selectors.updated.date,
      /(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s20\d{2}\b/
    );
  });
});

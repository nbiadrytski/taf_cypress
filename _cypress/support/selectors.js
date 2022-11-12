const navLink = ".md-nav__link";
const navItem = ".md-nav__item";
const landingPageContent = ".page-content";

export default {
  // 'Updated {date}' label, e.g. 'Updated July 30, 2021'
  updated: {
    text: ".md-source-date",
    date: ".git-revision-date-localized-plugin",
  },
  // Tabs, e.g. Home, Data
  contentTabs: {
    data: ".md-tabs__item > [href='data/index.html']",
  },
  leftMenuNavLinks: {
    importData: `${navLink} > [href="import-data/index.html"]`,
    datasetRequirements: `${navItem} > [href="file-types.html"]`,
    largeDatasets: `${navItem} > [href="large-data/index.html"]`,
  },
  content: {
    pageTitle: ".md-content h1",
    breadcrumbs: ".breadcrumbs",
  },
  // Book selector
  bookSelector: {
    dropdownItem: ".choices__list .choices__item--selectable",
    selectedItem: ".choices__inner .choices__item",
  },
  header: {
    button: "#md-header a.md-header__button",
    linksList: "#md-header ul.md-header__title",
    drLogo: "#md-header .md-header__button.md-logo",
    navButtonsList: "#md-header .second-level-navigation",
  },
  footer: {
    button: "footer.md-footer a.white-button",
    linksList: "footer.md-footer ul.action-button",
  },
  landingPage: {
    title: `${landingPageContent} .title`,
    subtitle: `${landingPageContent} .subtitle`,
    cardsContainer: `${landingPageContent} ul.cards-container`,
    cardsContainerList: `${landingPageContent} ul.cards-container > li`,
    cardTitle: `${landingPageContent} .card-container .h4`,
  },
  search: {
    searchBoxForm: "[placeholder='Search documentation']",
    filledInSearchBoxForm: ".search-form input",
    copiedToClipboardDialog: ".dr-modal-body .md-dialog",
    shareIcon: "button svg[data-icon='share-alt']",
    searchSectionButtons: ".search-items .filter .button-group",
    nResultsFoundLabel: ".ais-Stats-text",
    searchResultItemDescription:
      ".hits-item .item-description .ais-Highlight.h4",
    searchResultItemIcon: ".hits-item .item-description .item-icon svg",
    searchResultItemSectionBadge: "[test-id='badge-button']",
    previewContentBreadcrumbs: ".preview-content .breadcrumbs",
    previewContentTitle: ".preview-content .ais-Highlight.h2",
    previewContentToc: ".preview-content .caption",
    previewContentParagraph: ".preview-content .paragraph-regular",
    noResultsSvg: ".no-results svg",
    noResultsDescription: ".no-results .description",
    noResultsPreview: ".no-filter-results-preview .paragraph-regular",
    showAllResultsButton: ".show-all-button",
  },
  glossary: {
    categoriesList: ".glossary-categories",
  },
};

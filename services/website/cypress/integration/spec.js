const timelineRaw = require("../../src/timeline-raw");

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has the correct <h1>", () => {
    cy.contains("h1", "A story, my story...");
  });
});

describe("Homepage - Timeline", () => {
  before(() => {
    cy.visit("/");
  });

  timelineRaw.forEach((entry) => {
    it(`it displays the ${entry.milestone} timeline entry`, () => {
      cy.contains("p", entry.milestone);
      cy.get(`a[href="${entry.link}"]`).contains(entry.cta);
    });
  });
});

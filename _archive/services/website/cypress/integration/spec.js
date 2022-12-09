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

  it("displays all timeline entries", async () => {
    const response = await fetch("/timeline.json");
    const timeline = await response.json();

    expect(timeline).to.not.be.empty;
    timeline.forEach((entry) => {
      cy.contains("p", entry.milestone);
      cy.get(`a[href="${entry.link}"]`).contains(entry.cta);
    });
  });
});

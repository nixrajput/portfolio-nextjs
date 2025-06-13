describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the home page successfully", () => {
    cy.get("h1").should("be.visible");
  });

  it("navigates to about page", () => {
    cy.get('a[href="/about"]').click();
    cy.url().should("include", "/about");
  });

  it("toggles dark mode", () => {
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get("html").should("have.class", "dark");
  });

  it("displays contact form", () => {
    cy.get("form").should("be.visible");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('textarea[name="message"]').type("Test message");
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="success-message"]').should("be.visible");
  });
});

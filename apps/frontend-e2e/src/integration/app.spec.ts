describe("frontend", () => {
  beforeEach(() => cy.visit("/"));

  it("should redirect to the sign in page", () => {
    cy.get("h2").contains("Sign in");
  });

  // it("should redirect to create a workspace on sign in", () => {
  //   cy.get("h2").contains("Sign in");
  // });

  // Custom command example, see `../support/commands.ts` file
  // cy.login("my-email@something.com", "myPassword");
});

describe("Blogs", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });
  // it("login form can be opened", () => {
  //   cy.contains("username");
  //   cy.contains("password");
  //   cy.contains("login").click();
  // });
  // it("user can login", () => {
  //   cy.get("[name=Username]").type("peter");
  //   cy.get("[type=password]").type("123456");
  //   cy.contains("login").click();
  //   cy.contains("blogs");
  // });
  it("blog can be added", () => {
    cy.get("[name=Username]").type("peter");
    cy.get("[type=password]").type("123456");
    cy.contains("login").click();
    cy.contains("new blog").click();
    cy.get("[name=Title]").type("Test from Cypress");
    cy.get("[name=Author]").type("darth peter");
    cy.get("[name=Url]").type("http://starwars.com");
    cy.get("#create").click();
    cy.contains("A new Blog Test from Cypress");
  });
});

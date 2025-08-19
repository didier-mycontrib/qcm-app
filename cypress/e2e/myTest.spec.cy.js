describe('My HTML/JS Tests', () => {


  it('qcm-app index ok (smoke test)', () => {

    //visiter page d'accueil.html
    cy.visit("http://localhost:3000/index.html")

    

    //vérifier que la zone d'id my-header-title comporte le texte 'qcm-app'
    cy.get('#my-header-title')
      .should('have.text', 'qcm-app')
  })


})
describe('selectQcm Tests', () => {


  it('at least one qcm', () => {

    //visiter page d'accueil.html
    //cy.visit("http://localhost:4200/index.html")
    //cy.visit("http://localhost:4000/index.html")
    //cy.visit("http://localhost:3000/index.html")
    cy.visit("http://localhost:3000/index.csr.html")

    cy.contains('button','qcm').click(); //select 'qcm' in menu

    cy.get("#selQcmAndActionPanel").click(); //select panel


    //cy.get("input[name='filtre']").type("qcm"); //initailiser le filtre à une valeur non vide
    cy.get("input[name='filtre']").clear(); //vider le contenu du filtre

    cy.get("#actualiserListeButton").click(); //search qcm list from filtre

    //vérifier au moins un qcm trouver (liste ul/li pas vide)
    cy.get('#ulQcmlist>li')
      .should('exist')
  })


})
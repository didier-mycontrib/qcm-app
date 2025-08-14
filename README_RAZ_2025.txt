RAZ 2025:
angular <= 15 vers angular 19
ngx-bootstrap vers flexbox , ..
================
test e2e via cypress (avec intégration continue "jenkins")
-----
on considera que :
  - à la fois sur le poste de dev
  - à la fois au sein de l'image docker servant au build CI/CD ,
les technos "cypress" , "http-server" et "start-server-and-test" pour enchainer
sont (préalablement) installées en mode global (-g)

NB: on pourra par exemple s'appuyer sur l'image docker "node_ts_cypress" .
------
à ajouter à la fin de tsconfig.json par précautions:
,"exclude": [
    "cypress.config.ts",
    "cypress/**/*.ts"
  ] 
  ------
  ng build
  npm run serve:ssr:qcm-app
  npx cypress open
  ou
  npx cypress run --spec ./cypress/e2e/myTest.spec.cy.js
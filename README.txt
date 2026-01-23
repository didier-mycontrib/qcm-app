ng add @angular/materials
Attention: depuis angular20 , les triggers et @angular/animations sont deprecated .
Il faut utiliser à la place les directives animate.enter , animate.leave , ...
===========
pour  que  @use "d2f-common-layout.scss"; soit bien compris
il faut ajouter cette option angular.json (près de la ligne 30 ou 40):
         "stylePreprocessorOptions": {
              "includePaths": [
                "src/app/shared/scss"
              ]
            },

=================================
intégration de l'extension angular-oauth2-oidc pour authentification via oauth2/oidc
--------------------------------
npm i -s angular-oauth2-oidc

* add a copy of silent-refresh.html in /src
et ajouter "src/silent-refresh.html" dans le premier bloc assets de angular.json (près de la ligne 40)
"assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              "src/silent-refresh.html"
            ],

* add provideOAuthClient() in app.config.ts  (angular >=17)
+ code de Oauth2LogInOutComponent , service/OAuth2SessionService , shared/data/UserSession 
et tenir compte du fait que le token s'appelle "access_token" (et pas token si authToken) dans intercepteur et/ou gardien


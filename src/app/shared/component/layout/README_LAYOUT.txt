status-bar : affichage des principaux statuts (connecté ? , username , role)
             s'affiche (ou se cache) via icone ? du header , affichage temporaire (avec timeout) en small width

quick-menu : menu rapide vers l'essentiel  (petits boutons) , s'affiche en haut en grande largeur
et en bas (dans sticky-footer) en petite largeur.

main-side-nav : menu principal (montré ou caché sur le coté gauche )
                avec 2 niveaux (sous menus possibles)
                montré ou caché selon icône toggler de l'entête
                se cache par défaut après une navigation en mode faible_largeur

main-content : simple conteneur de la partie <router-outlet> : au milieu (coté droit)

quick-toolbar : paquet d'icônes (intégré dans l'entête , à droite)
                pour naviguer rapidement vers partie , "home" , "login-out" , ...

legal-footer : conteneur affichant infos légales

sticky-header : panneau d'entête (collé au bord haut) 

sticky-footer : panneau d'entête (collé au bord bas)
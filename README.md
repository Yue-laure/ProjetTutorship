# WAMProject
# Contexte du stage 
Dans la cadre la discipline Projet Professionnel DS4H, j’intègre en tant que stagiaire l’équipe de recherche WIMMMICS, basée à Sophia Antipolis et rattachée à l’INRIA et I3S. Encadrée par Monsieur BUFFA Michel et une équipe de 4 autres étudiants, nous créons une plateforme permettant à la communauté de développeurs de publier et partager leurs plugins ainsi que de les tester et les insérer dynamiquement dans les applications, grâce aux Web Services.

# Auteurs
Ons HAMDI, étudiante en Master 2 MIAGE en 2022/2023. 

# Le contenu du repository 
Dossier API : 
Cette API RESTful contient un Web Service, permettant de parcourir les descripteurs des plugins, en récupérer le contenu et le stocker dans une base de donnée MongoDB. 
Nous pouvons réaliser des requêtes GET, POST, UPDATE, DELETE sur la base de données.
L'API contient également la gestion des utilisateurs : création de compte, authentification, suppression de compte. La gestion se fait sur une base de données MongoDB. 

Le contenu de l'espace de travail se fait dans le dossier api/plugins/update/(Username de l'utilisateur)

# Prerequisites
Assurez vous d'avoir les outils suivants installés :

- Node.js (cf. nodejs.org/en/download/)
- Angular CLI (npm install -g @angular/cli)

# Download 

Dans un terminal, lancez la commande : 
 - git clone https://github.com/OnsHamdi99/ProjectWAM.git 

# Lancer le projet 
Vous avez besoin de deux terminaux :

Dans le premier, exécutez : 
- cd api 
- node server.js 
Un message vous indique si l'opération de connection à la base de donnée est réussie.

Dans le second, exécutez : 
- cd WAM_Project 

Installez les dépendances :

- npm install
Puis : 
- ng serve 
Ouvrez le lien indiqué. 

# Tutoriels suivis
"Securing Node.js RESTful APIs with JSON Web Tokens" par Adnan Rahić sur freecodecamp.org
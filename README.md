# Cours création d'API REST avec Node et Express

JavaScript vous permet de faire des sites/app côté front.
Cependant, il existe un outil qui vous permet d'utiliser vos compétences JS pour créer des projets BACK.

Ce qui signifie que le projet est exécuté comme il faut côté SERVEUR.

-> L'utilisateur n'a PAS accès à votre code, contrairement a JS côté FRONT.

## Préequis
- **Runtime** : Node.js installé sur votre machine (on va utiliser les modules ES)
- **Framework** : Express.js
- **BDD** : MongoDB (via Mongoose)
- **Authentification** : JSON Web Token (jsonwebtoken), bcryptjs pour le hachage.
- **Variables d'environnement** : dotenv

## Mise en place de l'environnement de travail

## Initisalisation du porjet

Tout d'abord, on doit commencer par intialiser le projet NODE.
Pour cela, sur le terminal, vous devez entrer la commande `npm init`

Cette commande va vous créer un fichier packages.json.

Celui ci contient des informations importantes sur votre projet. 
Notamment :
- Le nom du projet 
- Le type de code utilisé (commonjs (CJS) ou ecma script (ES))
- Les scripts du projet
- Les dépendances du projet

#### Qu'est ce que les dépendances?

Votre projet, pour fonctionner, à besoin de certaines choses.
Dans le cas d'un projet avec express, il a besoin du framework express.
Si vous avez besoin de hacher les mots de passe, vous allez avoir besosin de la dépendance bcryptjs, etc.
Selon votre projet, vous n'allez pas forcément avoir les mêmes dépendances.
C'est la package .json qui s'occupe de gérer cela.

Vous, développeurs, **installez** des dépendances grâce à la comamnde `npm install NomDeLaDépendance`.

### Installation des dépendances nécessaires

````bash
npm install
npm i
````

Les deux commandes sont similaires. Vous pouvez utiliser l'une ou l'autre, sachant que `npm i` est le raccourci de `npm install`.

- `npm i express`: Permet d'installer le framework express, pour pouvoir gérer directement un serveur web avec node.
- `npm i mongoose` : Permet de faire la connexion à la base de données mongoDB et de gérer les requêtes (CRUD).
- `npm i jsonwebtoken` : Permet de gérer un token d'authentification unique.
- `npm i bcryptjs` : Permet de gérer les hash de mot de passe.
- `npm i dotenv` : Permet de gérer les variables d'environnement.

#### Une variable d'environnement, qu'est-ce que c'est?

Une variable d'environnement est une donnée qui est potentiellement sensible.
C'est :
- un mot de passe
- une phrase secrète
- des accès à la base de donnée
- etc.
- Ou tout simplement des variables qui servent à la configuration pour votre app.

Sur nos webapp, les variables d'environnements sont crées dans un fichier `.env`

Exemple de contenu de variable d'environnement:

```
HOST=localhost
DBNAME=masuperdb
DBUSER=userquitue
DBPASS=monpasspourri
```

**IMPORTANT** : Le fichier de variable d'environnement DOIT ABSOLUMENT être noté dans le fichier `.gitignore`.

On n'envoie JAMAIS un fichier de varaibles d'environnement sur github.

Par contre, ce que vous pouvez faire pour le projet, c'est créer un fichier `.env example` que vous pouvez envoyer sur github.

Ce fichier doit contenir la structure attendue pour vos variables d'environnement.

Exemple:

```
HOST=# Nom d'hote pour la bdd
DBNAME=# Nom de la bdd
DBUSER=# tilisateur de la bdd
DBPASS=# Le pass de la bdd
```

### Structure des fichiers et dossiers

```text
    src/
        config/                         
            - db.js                     # Connection à MongoDB
        controllers/                    # La logique de code de votre app
            -authController.js
        middlewares/                    # Tout ce qui s'exécute avant un controller
            -authMiddleware.js
        models/                         # Configuration des schémas de bdd
            - authModel.js
        routes/                         # Contient la logique des endpoints (url)
            - authRoutes.js
    - app.js                            # Configuration de Express
- .env                                  # Variables d'entironnement
- package.json
- server.js                             # Point d'entrée de l'app
```
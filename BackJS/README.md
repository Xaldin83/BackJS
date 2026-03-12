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

## Rôle de chaque dossiers

### Les routes : Le stanndard téléphonique / L'aiguilleur

- **C'est quoi ?** : C'est le point d'entrée de votre API. Les routes définissent les URL ou endpoints accessibles par les utilisateurs (ex: `GET /api/quotes` ou `POST /api/auth/login`)
- **Leur rôle** : Lorsqu'une personne (ou le frontend) fait une requête vers votre API, la route reçoit cet appel, comprend ce que l'utilisateur veut faire, et dirige l'appel vers le bon **Controller**. une route ne contient aucune logique complexe, elle se contente de transférer la demande à la bonne personne.

### Les controllers : Le cerveau / Le Manager

- **C'est quoi ?** : C'est ici que se trouve la logique métier de votre application.
- **Son rôle** : Le conrtrôleur reçoit la demande transmise par la route. C'est lui qui fait le travail. Il lit les informations envoyées par l'utilisateur (le body). Il demande au **model** d'interagir avec la base de données, puis **prépare et renvoie la réponse finale** à l'utilisateur au format JSON en gérant les diférents cars de succès ou d'erreurs.

### Les models

- **C'est quoi ?** : Le modèle est la représentation structurelle de vos données en code. Il fait le lien (via Mongoose) avec la base MongeDB.
- **Son rôle** : In définit le schéma de vos données. C'est lui qui décide qu'un utilisateur doit avoir un mail, par exemple (de type chaine de caractères, défini comme obligatoire et unique). C'est le modèle qu se charge de faire toutes les actions d'écriture et de lecture directes dans la bd (le CRUD).

### Les middlewares : La douane / le vigile

- **C'est quoi ?** : C'est une fonction qui s'exécute **au milieu** de la requête. Elle a lieu juste après que la route ait été appelée, mais juste avant que la requête n'arrive finalement dans le contrôller.
- **Son rôle** : Il effectue des vérification à la volée. L'exemple le plus courant en API est le **middleware d'authentification** : il vérifie qu'un utilisateur possède un token valide (la "carte d'identité") avant de le laisser accéder à des informations privées. S'il n"a pas son ticket, la douane bloque tout et renvoie une erreur (401 - Accès refusé). Si tout va bien, il appel une fonction `next()` qui laisse la requête vers le controller.

## Résumé des commandes pour un nouveau projet et configuration

### Résumé des commandes
```bash
npm init
npm i express
npm i mongoose
npm i jsonwebtoken
npm i bcryptjs
npm i dotenv
```

Vous pouvez installer tout en une seule fois, après `npm init`:
`npm i express mongoose jsonwebtoken bcryptjs dotenv`

### Configuration

Ouvrir le fichier package.json, et faire ne sorte d'avoir la ligne `"type":"module"`

### Petite astuce

Lorsque vous allez démarrer votre serveur avec la commande `node server` ou `npm run dev`, si vous avez configuré le script. Votre server sera lancé et figé à l'état du lancement.

Ce qui signifie, que si vous effectuez une modification sur votre code, vous allez devoir couper le server et le relancer. Ce qui peut-être pénible.

Pour éviter cela, vous pouvez installer de manière globale l'outil nodemon. 
Pour cela, vous faite UNE SEULE FOIS sur votre machine : `npm i -g nodemon`.

Cette fois-ci, au lieu de lancer votre server avec `node server`, vous allez lancer via `nodemmon server`. Ce qui aura pour effet, qu'à chaque modifiation de votre code,que le serveur se recharge automatiquement.
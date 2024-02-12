# Boilerplate NodeJS

Proyecto ejemplo capacitación de abstracción y modularización paso a paso de un proyecto.

En este repositorio se construye un proyecto de ejemplo en el que, desde cero y paso a paso, se iran aplicando conceptos vistos en la capacitación en cada `branch` del mismo.

## Branches
![Paso a paso](tree.png)

## Scripts

## Install and prepare

```bash
npm install --save-dev husky prettier eslint
npm npx eslint --init
npm run prepare
npm run build
```

## Creation 

```bash
npm init -y
npm install --save-dev husky prettier eslint
npm npx -y eslint --init

npm pkg set scripts.prepare="husky install"
npm run prepare

npx husky add .husky/pre-commit "npx -y lint-staged"
```

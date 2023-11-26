# Boilerplate NodeJS

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

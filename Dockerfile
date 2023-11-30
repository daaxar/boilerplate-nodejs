ARG NODE_IMAGE_TAG=18-alpine

FROM node:${NODE_IMAGE_TAG} AS base

ARG ROOT_DIR=/usr/src/app

RUN apk update && \
    apk add --no-cache dumb-init

WORKDIR ${ROOT_DIR}

# # # # # # # # # # # # # # # # # # # # # # # # # # # # 
FROM base AS builder

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# # # # # # # # # # # # # # # # # # # # # # # # # # # # 
FROM builder AS develop

CMD [ "npm", "run", "dev" ]

# # # # # # # # # # # # # # # # # # # # # # # # # # # # 
FROM base AS production

ENV USER=node
ENV NODE_ENV=production

COPY --from=builder ${ROOT_DIR}/node_modules ${ROOT_DIR}/node_modules
COPY --from=builder ${ROOT_DIR}/package.json ${ROOT_DIR}/package.json
COPY --from=builder ${ROOT_DIR}/build ${ROOT_DIR}/build

RUN npm prune --production

RUN chown -R ${USER} ${ROOT_DIR}

USER ${USER}

CMD [ "dumb-init", "node", "build" ]

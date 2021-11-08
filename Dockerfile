# # # SOURCE: https://github.ibm.com/managed-security/msscertimg-nodejs-12/blob/master/Dockerfile
# FROM mss-docker.artifactory.swg-devops.com/msscertimg-nodejs-12:latest
# # # https://nodejs.org/de/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile

# # USER root

# # COPY . .
# # RUN npm ci

# # EXPOSE 3000/tcp

# # # NOTE: don't add CMD, it's in base IMG and uses `npm run start`
# ##FROM node:latest

# USER root
# RUN mkdir /opt/app
# WORKDIR /opt/app/

# COPY . .
# RUN npm ci

# EXPOSE 3000/tcp



# # SOURCE: https://github.ibm.com/managed-security/msscertimg-nodejs-12/blob/master/Dockerfile
#FROM mss-docker.artifactory.swg-devops.com/msscertimg-nodejs-12:latest
# # https://nodejs.org/de/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile
# USER root
# COPY . .
# RUN npm ci
# EXPOSE 3000/tcp
# # NOTE: don't add CMD, it's in base IMG and uses `npm run start`
### STAGE 1: Build ###
FROM node:16-alpine
USER root
RUN mkdir /opt/app
WORKDIR /opt/app/
COPY . .
RUN npm cache clean --force
RUN npm cache verify
RUN npm install
RUN npm cache clean --force
EXPOSE 3000/tcp
CMD ["npm","start"]
# NOTE: don't add CMD, it's in base IMG and uses `npm run start`
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# ### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/ /usr/share/nginx/html

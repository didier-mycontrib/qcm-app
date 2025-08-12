FROM node:22
# this new image will be create from parent image = node:18 ou :22 (stable)

# Create app directory inside docker image
WORKDIR /usr/src/app


# Install app dependencies
COPY  package*.json  ./

#RUN npm install

# Bundle app source (src, dist, ...)
COPY .   .

#setting ENV-VARIABLE
ENV PORT=4000

EXPOSE 4000
CMD [ "npm", "run" , "serve:ssr:qcm-app" ]
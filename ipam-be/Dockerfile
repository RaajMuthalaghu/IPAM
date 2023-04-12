FROM node:14

# Expose Port
EXPOSE 5000
# Use latest version of npm
#RUN npm i npm@latest -g
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package.json package-lock.json* ./
#RUN npm install --no-optional && npm cache clean --force
# copy in our source code last, as it changes the most
#WORKDIR /opt
#COPY . .

# Create app directory
WORKDIR /usr/src/app
COPY ipam-be/package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY ipam-be/. .

# Start command (CMD[""] is the default command that will be run when the container is started)
CMD [ "node", "ipam.js"]

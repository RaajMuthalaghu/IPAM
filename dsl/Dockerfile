FROM https://hub.docker.com/r/ntnx/calm-dsl
# ntnx/calm-dsl
# Expose Port
EXPOSE 5004
ENV CALM_DSL_PC_IP 10.135.20.2
ENV CALM_DSL_PC_PORT 9440
ENV CALM_DSL_PC_USERNAME admin
ENV CALM_DSL_PC_PASSWORD Nutanix@123
ENV CALM_DSL_DEFAULT_PROJECT default
WORKDIR /
RUN calm init dsl -i 10.135.20.2 -P 9440 -u admin -p Nutanix@123 -pj default

# install node.js and run dsl server
COPY dsl/package*.json ./
COPY dsl/. .
RUN apk add  --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.7/main/ nodejs=8.9.3-r1
RUN npm install
CMD ["node", "dsl.js"]








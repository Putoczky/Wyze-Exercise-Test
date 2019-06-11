FROM node:8.6-alpine
RUN mkdir -p /usr
WORKDIR /usr
COPY ./package.json /usr
RUN npm install --silent
COPY . /usr
ENV FROM testmailputoczky@gmail.com
ENV ALLOWED_EXTENSION [".jpg", ".docx", ".png", ".txt"]
EXPOSE 5000
ENTRYPOINT ["npm", "run"]
CMD ["start"]
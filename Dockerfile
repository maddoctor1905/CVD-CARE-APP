FROM nginx:stable-alpine

WORKDIR /usr/src/app

COPY . ./

RUN apk add npm supervisor

ADD docker/supervisord.conf /etc/supervisor/supervisord.conf
ADD docker/nginx.conf /etc/nginx/nginx.conf
ADD docker/nginx-site.conf /etc/nginx/sites-available/default.conf
RUN mkdir -p /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf

RUN chmod 755 docker/start.sh

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]

EXPOSE 80

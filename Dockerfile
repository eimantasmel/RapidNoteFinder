FROM php:8.2.18-fpm-alpine3.19

WORKDIR /var/www/RapidNoteFinderApi

RUN apk update \
    && apk upgrade

RUN apk --no-cache add \
        libpng-dev \
        build-base \
        linux-headers \
        libjpeg-turbo-dev \
        freetype-dev \
        libzip-dev \
        icu-dev \
        oniguruma-dev \
        autoconf \
        g++ \
        make \
        wget \
        curl \
        git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd \
        intl \
        pdo_mysql \
        zip \
        opcache \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && pecl clear-cache \
    && rm -rf /tmp/*




# Install Xdebug from source
RUN pecl install xdebug-3.3.2 \
    && docker-php-ext-enable xdebug

# Configure Xdebug
RUN echo "xdebug.mode=develop, debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_autostart=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.discover_client_host=0" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

EXPOSE 9000
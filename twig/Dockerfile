# Base image with PHP and Apache
FROM php:8.2-apache

# Enable PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable mod_rewrite (needed for routing)
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html


# Copy Twig app files
COPY . .

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install

# Set Apache document root to public/
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Update Apache configs for new document root
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# @alwatr/wordpress container

## Superfast Wordpress Container for CloudNative Kubernetes Deployments

This container image is based on the official Wordpress image, but with a few tweaks to make it more suitable for Kubernetes deployments.

This is the best practices and fast as possible to run the lazy PHP application like wordpress!  
Just because of `@alwatr/nginx` and php-fpm cashing It can work More than 1,000,000 time faster than the official wordpress!, It’s not a joke!

## So, is Wordpress Cloud native?

**Fuck No!**

To be honest, no PHP application or even framework is made in a cloud-native way or mindset.  
This might suck and you don't like it! But it's not my fault if PHP is bullshit and you like it just because it's popular and easy to learn!  
I have to mention this to reduce my guilty conscience about having this package in the Alwatr project!  
There are always a few fundamental “architecture design” problems that cause the entire cloud native way impossible out of the box. Sometimes even with loads of work altering in the “core”, you won’t be able to run it in the way you wanted to.
If you analyze your requirements and needs, you pick the right tools. If we want high availability, high performance, and ease of CI/CD, perhaps you should have chosen another language…

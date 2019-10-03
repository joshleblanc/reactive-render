FROM gitpod/workspace-full

USER root

RUN curl https://install.meteor.com/ | sh

RUN chown -R gitpod:gitpod /home/gitpod/.meteor

USER gitpod
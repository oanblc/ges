FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# NEXT_PUBLIC_* değişkenleri build anında gömülür; Railway servis değişkenini
# build'e taşımak için ARG bildirimi şart.
ARG NEXT_PUBLIC_GOOGLE_MAPS_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_KEY
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]

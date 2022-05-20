/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    db_string:
      "mongodb+srv://devonly:devonly@book-shop-web-app.g8etw.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: '/', //начальный путь
        destination: '/nomenclatures', //конечный путь
        permanent: true,
      }
    ]
  },
}

module.exports = nextConfig

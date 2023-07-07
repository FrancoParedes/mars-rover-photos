/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // Excluir archivos de prueba durante la construcción en modo de servidor
    if (isServer) {
      config.module.rules.push({
        test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
        loader: 'ignore-loader',
      });
    }
    return config;
  },
}

module.exports = nextConfig

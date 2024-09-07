// next.config.mjs
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  assetPrefix: isProd ? "/code_repetition/" : "",
  basePath: isProd ? "/code_repetition" : "",
  trailingSlash: true,
  output: "export",
};

export default nextConfig;

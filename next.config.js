/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-table",
    "rc-tree",
    "@rc-component"
  ],
  webpack(config) {
    // Fix lỗi ESM của rc-util
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx", ".jsx"],
    };
    return config;
  },
};

module.exports = nextConfig;
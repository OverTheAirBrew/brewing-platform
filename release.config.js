module.exports = {
  branches: [
    'main',
    {
      name: 'next',
      prerelease: true,
    },
  ],
  plugins: [
    'semantic-release-export-data',
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    '@semantic-release/git',
  ],
};

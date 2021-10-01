module.exports = {
  displayName: 'feature-todo',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/feature-todo',
  setupFilesAfterEnv: ['../../jest-setup.ts'],
};

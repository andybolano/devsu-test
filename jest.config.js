
module.exports = {
    preset: 'jest-preset-angular',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    collectCoverage: true,
    coverageReporters: ['html'],
    coverageDirectory: 'coverage/devsu-test',
    verbose: true,
    moduleNameMapper: {
        '^@features/(.*)$': '<rootDir>/src/app/features/$1',
        '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
        '^@lib/(.*)$': '<rootDir>/src/app/lib/$1',
        '^@env$': '<rootDir>/src/environments/environment',
      },
};
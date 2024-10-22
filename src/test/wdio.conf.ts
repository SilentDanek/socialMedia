export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./e2e/**/*.ts'],
    maxInstances: 10,
    baseUrl: 'http://localhost:3000/',
    capabilities: [
        {
            browserName: 'chrome'
        }
    ],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};

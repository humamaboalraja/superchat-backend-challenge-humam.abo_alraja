// @ts-ignore
class customReporter {
  errorsDetected = false;
  _globalConfig;
  _options;
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    if (results.numFailedTests > 0) {
      this.errorsDetected = true;
    }
  }
  getLastError() {
    if (this.errorsDetected) {
      process.exit(1);
    }
  }
}

module.exports = customReporter;

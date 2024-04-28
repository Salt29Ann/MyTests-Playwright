import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';

class myOwnReporter implements Reporter {
    // Method called before all tests are run
    onBegin(config: FullConfig, suite: Suite) {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
    }

    // Method called before each test
    onTestBegin(test: TestCase, result: TestResult) {
        console.log(`Starting test ${test.title}`);
    }

    // Method called after each test
    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);
    }

    // Method called after all tests have completed
    onEnd(result: FullResult) {
        console.log(`Finished the run: ${result.status}`);
    }
}

export default myOwnReporter;
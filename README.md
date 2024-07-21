# MochaChaiAPITesting

# AutomationAPI Test Project

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Running Tests](#running-tests)

## Introduction
This project is designed to automate the testing of the API endpoints for Kasir Aja application. The tests are written using Mocha and Chai, and utilize Supertest for making HTTP requests. The project includes tests for authorization, category management, product management, and transaction management.

## Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/AutomationAPI.git
    cd AutomationAPI
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Running Tests

### Running All Tests
To run combination test case, use the following command:
```sh
npx mocha test/auth.test.js test/category.test.js test/product.test.js --timeout 10000
```
![image](https://github.com/user-attachments/assets/e2eb7798-4e13-4c35-8ed0-7698d25602ba)

You can also run individual test files. For example, to run only the authorization tests:
```sh
npx mocha test/auth.test.js test/category.test.js test/product.test.js test/transaction.test.js --timeout 10000
```

To generate test reports using Mochawesome, use the following command:
```sh
npx mocha test/auth.test.js test/category.test.js test/product.test.js test/transaction.test.js --timeout 10000 --reporter mochawesome --reporter-options reportDir=reports,reportFilename=report,overwrite=false
```



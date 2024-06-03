# dynamic-object-search

A SFDX project showcasing LWC communication by creating an app for dynamic query building.

## Testing

### Automated Setup

- `sf force lightning lwc test setup`
- Note that now new test scripts have been added to `package.json`. If they haven't proceeed to manual setup.

### Manual Setup

- Install node.js
- `npm install`
- `npm install @salesforce/sfdx-lwc-jest --save-dev`
- add these to `scripts`
  - ```
    {
        "scripts": {
            ...
            "test": "npm run test:unit",
            "test:unit": "sfdx-lwc-jest",
            "test:unit:watch": "sfdx-lwc-jest --watch",
            "test:unit:debug": "sfdx-lwc-jest --debug",
            "test:unit:coverage": "sfdx-lwc-jest --coverage"
        },
    }
    ```

### Running Jest Tests

- `npm run test:unit`: runs all tests
- `npm run test:unit:watch`: runs all tests when a component is saved

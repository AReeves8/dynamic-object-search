import { createElement } from "lwc";
import FieldSelector from "c/fieldSelector";
//import { getObjectFields } from "lightning/uiRecordApi";
import getObjectFields from "@salesforce/apex/DynamicObjectSearchController.getObjectFields";

/**
 * TESTING WIRE SERVICE
 *      - have to use mock data
 *      - create a "data" folder inside of __tests__
 *      - create a json file that has the same name as your wire service call inside of the data folder
 *      - jest will use mock data and then you can test if your component is using that data how you desire
 *          - ex: if you're using the wire service to get data that populates a header, you can check that header has inner text matching the data
 */

// Import mock data to send through the wire adapter
const mockGetObjectFields = require("./data/getObjectFields.json");

// mocking our wired function
jest.mock(
  "@salesforce/apex/DynamicObjectSearchController.getObjectFields",
  () => {
    // this callback is the "factory" that tells how to mock the function
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest"); // destructuring jest module to create mock wire adapter
    return {
      default: createApexTestWireAdapter(jest.fn()) // jest.fn() with no param returns a blank mock function
    };
  },

  // this object is to create virtual mocks (mocks of modules that don't exist in the system)
  { virtual: true }
);

// describe is the test suite. all individual tests for the component will be in here.
describe("c-field-selector", () => {
  // after each is a teardown method and it runs after each individual test.
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    // clearing mocks in between each test
    jest.clearAllMocks();
  });

  // "it" is an individual test. "test" can also be used in its place to do the exact same thing. the choice is usually based on which makes more sense if you read it outloud
  it("is an example test that doesnt do anything", () => {
    // creates the component as a DOM element and adds it to DOM
    const element = createElement("c-field-selector", {
      is: FieldSelector
    });
    document.body.appendChild(element);

    // Assert
    // const div = element.shadowRoot.querySelector('div');

    /**
     * EXPECT - object containing various assertion functions called "matchers"
     *      .toBe() - checks strict equality (===)
     *      .toMatch() - checks that two strings match
     *      .toContatin() - checks if an array or iteable contains a value
     *      .toThrow() - checks that a function throws an error
     *      .not - inverts any other matcher function
     *      plus many many mnay more
     *
     *  these are useful for testing the logic of the various functions within your component
     */
    expect(1).toBe(1);
  });

  test("getObjectFields sets dual listbox data correctly", () => {
    const element = createElement("c-field-selector", {
      is: FieldSelector
    });
    document.body.appendChild(element);

    // using the mocjed wire service and having it return the created mock data
    getObjectFields.emit(mockGetObjectFields); // calling this calls the mock function created with jest.mock()

    // need to wait for the DOM to re-render before we can check that our front-end was updated
    // so, we can use a Promise to have our code execution pause just long enough for the re-render to happen
    return Promise.resolve().then(() => {
      // getting the list box from shadow DOM
      const dualListBox = element.shadowRoot.querySelector(
        "lightning-dual-listbox"
      );

      // getting the options which are et by the wire service
      const listBoxOptions = dualListBox.options;
      const optionsCount = dualListBox.options.length;

      expect(listBoxOptions).not.toBeNull(); // checking the options were received
      expect(optionsCount).toBe(3); // checking that they contain exactly 3 values since mock data contains 3 values
    });
  });
});

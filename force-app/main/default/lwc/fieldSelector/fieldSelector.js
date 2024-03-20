import { LightningElement, api, wire } from 'lwc';
import getObjectFields from '@salesforce/apex/DynamicObjectSearchController.getObjectFields'

export default class FieldSelector extends LightningElement {

    @api 
    objectToUse;                    // sObject passed in by parent
    allFieldsList = [];             // all fields from the sObject
    selectedFieldsList = [];        // all fields that have been selected by the user
    errorMessage;                   // text to display if any errors occur

    // calling an apex method to retrieve all the fields for the provided object
    @wire(getObjectFields, {objectName : '$objectToUse'})       // $ makes this action reactive to every change made to objectToUse
    wiredFields(result){
        if(result.data) {
            
            // translate the returned fields into usable objects for the dual selection box
            this.allFieldsList = result.data.map((element) => ({
                label : element,
                value : element
            }));

            // ensuring the error message does not display
            this.errorMessage = null;
        }
        else if(result.error) {
            this.errorMessage = 'Fields could not be retrieved.';
        }
    }

    handleSelections(event) {
        this.selectedFieldsList = event.detail.value;
    }

    handleSubmit(event) {
        const fieldsSubmitted = new CustomEvent('fieldsubmit', {
            detail : this.selectedFieldsList
        });

        this.dispatchEvent(fieldsSubmitted);
    }
}
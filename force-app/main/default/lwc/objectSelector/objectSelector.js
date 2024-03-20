import { LightningElement } from 'lwc';


export default class ObjectSelector extends LightningElement {


    objectSelected = false;
    selectedObject;
    objectsList = [
        { label : 'Account', value : 'Account'},
        { label : 'Contact', value : 'Contact'},
        { label : 'Lead', value : 'Lead'}
    ];

    handleSelection(event) {
        this.objectSelected = true;
        this.selectedObject = event.detail.value;
    }

    handleFields(event) {
        const fieldsList = event.detail;
        
    }
}
import { LightningElement } from 'lwc';


export default class ObjectSelector extends LightningElement {

    objectSelected = false;                             // toggle for showing field options
    selectedObject;                                     // the object selected by the user
    objectsList = [                                     // the available object options - formatted for use in lightning-combobox
        { label : 'Account', value : 'Account'},
        { label : 'Contact', value : 'Contact'},
        { label : 'Lead', value : 'Lead'}
    ];


    // handling when an object is selected from the drop-down
    handleSelection(event) {
        this.objectSelected = true;
        this.selectedObject = event.detail.value;
    }

}
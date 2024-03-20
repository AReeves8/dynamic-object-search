public with sharing class DynamicObjectSearchController {
    
    
    public DynamicObjectSearchController() {

    }


    @AuraEnabled(cacheable=true)
    public static List<String> getObjectFields(String objectName) {
        
        SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
        Map<String,Schema.SObjectField> mfields = objectType.getDescribe().fields.getMap();

        List<String> sObjectDetailsList = new List<String>();
        for(String s : mfields.keySet()){
            sObjectDetailsList.add(String.valueOf(mfields.get(s)));
        }
        return sObjectDetailsList;
    }

}
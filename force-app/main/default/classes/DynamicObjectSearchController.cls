public with sharing class DynamicObjectSearchController {
    

    /**
     * Takes in a string containing the Name of an object and finds all fields for that object using the Schema class. 
     */
    @AuraEnabled(cacheable=true)
    public static List<String> getObjectFields(String objectName) {
        
        // getting the fields for the object
        SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
        Map<String, Schema.SObjectField> objectFields = objectType.getDescribe().fields.getMap();

        // formatting the map values as a list of strings so that it can be returned
        List<String> fieldList = new List<String>();
        for(String fieldName : objectFields.keySet()){

            // casting each value to a String - otherwise would just use .values()
            fieldList.add(String.valueOf(objectFields.get(fieldName)));
        }
        return fieldList;
    }

    /**
     * Takes in a string containing the Name of an object and a list of Field Names as strings. Formats the fields and object name into a SOQL query. 
     * The results of the query are returned. 
     */
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecords(String objectName, List<String> fieldNames) {
        
        // formatting fields for SELECT clause
        String selectClause = 'SELECT ';
        for(String field : fieldNames) {
            selectClause += (field + ', ');
        }
        selectClause = selectClause.removeEnd(', ');

        // putting the clauses together and querying with the result string
        String fromClause = ' FROM ' + objectName;
        String fullQuery = selectClause + fromClause;
        return Database.query(fullQuery);
    }

}
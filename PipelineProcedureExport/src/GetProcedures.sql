/*
 * get the SQL definition for the REST API procedures
 */

declare @namePattern nvarchar(128) = '%[_]AzureADSync[_]%'

select
    name = name,
    objectId = object_id,
    objectDefinition = object_definition(object_id)
from
    sys.procedures
where
    name like @namePattern

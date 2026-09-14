/*
 * get the SQL definition for the REST API procedures
 */
select
    name = name,
    objectId = object_id,
    objectDefinition = object_definition(object_id)
from
    sys.procedures
where
    name like 'lstp[_]Import[_]TIF[_]%'

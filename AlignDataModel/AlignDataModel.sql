
/**
 * Generate Add Column Statements
 */
declare
    @crlf nchar(2) = CHAR(13)+CHAR(10)

select
    Statement = -- significant whitespace
'    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ''' + TableName + ''' AND COLUMN_NAME = ''' + ColumnName + ''')
    BEGIN
        ALTER TABLE ' + TableName + ' ADD [' + ColumnName + '] ' + upper(ImportColumnType) + LengthOrPrecision + ' NULL;
    END;'
    , TableName
    , ColumnName
    , ColumnID
from
(
    select
        TableName,
        ColumnName,
        ColumnID,
        ImportColumnType,
        LengthOrPrecision = case
            when ImportColumnType = 'decimal'
                then '(' + cast(ImportColumnPrecision as nvarchar(max)) + ', ' + cast(ImportColumnScale as nvarchar(max)) + ')'
            when ImportColumnType like '%char'
                then '(' + ImportColumnMaxLength + ')'
            else ''
            end
        -- ,* -- debug
    from
    (
        select
            TableName,
            ColumnName,
            ColumnID,
            ImportColumnType = ColumnTypeName,
            ImportColumnMaxLength =
                case
                when ColumnTypeName like '%char'
                    then case
                            when ColumnMaxLength = -1
                                then 'MAX'
                        when ColumnTypeName like 'n%'
                                then cast(ColumnMaxLength / 2 as nvarchar(max))
                            else
                                cast(ColumnMaxLength as nvarchar(max))
                        end
                else null
                end,
            ImportColumnPrecision = case
                when ColumnTypeName = 'decimal'
                then ColumnPrecision
                else null
                end,
            ImportColumnScale = case
                when ColumnTypeName = 'decimal'
                then ColumnScale
                else null
                end
            -- ,* -- debug
        from
        (
            select
                TableName = o.name
                , ColumnName = c.name
                , ColumnTypeName = type_name(c.system_type_id)
                , ColumnMaxLength = c.max_length
                , ColumnPrecision = c.precision
                , ColumnScale = c.scale
                , ColumnID = c.column_id
            from
                sys.objects o
                join sys.columns c
                    on o.object_id = c.object_id
            where
                o.name in (
                    'ltbl_Import_TIF_PersonsPositions',
                    'ltbl_Import_TIF_Positions',
                    'ltbl_Import_TIF_PersonsContracts'
                )
                and c.name not in (
                    'CDL',
                    'Created',
                    'CreatedBy',
                    'CUT',
                    'INTEGR_REC_BATCHREF',
                    'INTEGR_REC_ERROR',
                    'INTEGR_REC_GROUPREF',
                    'INTEGR_REC_STATUS',
                    'INTEGR_REC_TRACE',
                    -- 'JsonRow',
                    'PrimKey',
                    'Updated',
                    'UpdatedBy'
                )
        ) V
    ) T
) U

/**
 * Reference
 */
-- select *
-- from sys.columns Columns
-- where object_id = object_id(@sourceTableName)
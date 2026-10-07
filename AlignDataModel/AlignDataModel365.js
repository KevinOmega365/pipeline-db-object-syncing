
///////////////////////////////////////////////////////////////////////////////

import * as fs from 'fs'
import { bigBanner } from './lib/Banners.js'

///////////////////////////////////////////////////////////////////////////////

const PROCEDURE_NAME = 'your_proc_name_here'
const SORT_KEY = 'ColumnID' // 'ColumnName'

const header = `CREATE OR ALTER PROCEDURE [dbo].[${PROCEDURE_NAME}] (
    @GroupRef UNIQUEIDENTIFIER, -- Used to tag records and log entries with the PrimKey of the group (INTEGR_REC_GROUPREF)
    @TaskRef UNIQUEIDENTIFIER,  -- Used to tag records and log entries with the PrimKey of the current group-task
    @BatchRef UNIQUEIDENTIFIER  -- Used to tag all records and log entries across a group execution run (INTEGR_REC_BATCHREF)
)

AS
BEGIN

`

const footer = 'END'

///////////////////////////////////////////////////////////////////////////////

const data = JSON.parse(fs.readFileSync('./AlignDataModel.json'))

///////////////////////////////////////////////////////////////////////////////

let out = ''

const tables = [... new Set(data.map(d => d.TableName))]

out += header

for(const table of tables) {
    
    out += `${bigBanner(table, '    ')}\n\n`
    
    const tableColumns = data
        .filter(d => d.TableName === table)
        .toSorted((a, b) => a[SORT_KEY] > b[SORT_KEY] ? 1 : -1)
        .map(d => d.Statement)
    
    for(const addColumn of tableColumns) {
        
        out += addColumn + '\n\n'
        
    }
    
}

out += footer

///////////////////////////////////////////////////////////////////////////////

fs.writeFileSync(`./output/${PROCEDURE_NAME}.sql`, out)

///////////////////////////////////////////////////////////////////////////////

// console.log(tables)
// console.log(Object.keys(data))

///////////////////////////////////////////////////////////////////////////////

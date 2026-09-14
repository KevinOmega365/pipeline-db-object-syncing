
///////////////////////////////////////////////////////////////////////////////

import * as fs from 'fs'
import { bigBanner } from './lib/Banners.js'

///////////////////////////////////////////////////////////////////////////////

const PROCEDURE_NAME = 'lstp_Import_TIF_PersonsPositions_AlignDataModel'


const SQL_STATEMENT_INDEX = 0
const TABLE_NAME_INDEX = 1
const COLUMN_NAME_INDEX = 2
const COLUMN_ID_INDEX = 3

const SORT_INDEX = COLUMN_ID_INDEX // COLUMN_NAME_INDEX

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

const tables = [... new Set(data.data.map(d => d[TABLE_NAME_INDEX]))]

out += header

for(const table of tables) {
    
    out += `${bigBanner(table, '    ')}\n\n`
    
    const tableColumns = data.data
    .filter(d => d[TABLE_NAME_INDEX] === table)
    .toSorted((a, b) => a[SORT_INDEX] > b[SORT_INDEX] ? 1 : -1)
    .map(d => d[SQL_STATEMENT_INDEX])
    
    for(const addColumn of tableColumns) {
        
        out += addColumn + '\n\n'
        
    }
    
}

out += footer

///////////////////////////////////////////////////////////////////////////////

fs.writeFileSync(`./${PROCEDURE_NAME}.sql`, out)

///////////////////////////////////////////////////////////////////////////////

// console.log(tables)
// console.log(Object.keys(data))

///////////////////////////////////////////////////////////////////////////////

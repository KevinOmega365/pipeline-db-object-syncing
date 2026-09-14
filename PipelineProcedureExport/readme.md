# PipelineProcedureExport

This is a quicker way to diff the pipeline prodedures

You will still need to copy the ```CREATE OR ALTER``` SQL from dev and run them in prod

## How to

1. run ```GetProcedures.sql``` in dev and prod
1. copy the grid output as JSON in to ```QueryOutput_Dev.json``` and ```QueryOutput_Prod.json```
1. open the terminal cd to ```...\deployment\PipelineProcedureExport```
1. rum ```node .\src\WriteProcedures.js```
1. open WinMerge
1. open ```.\prodedures``` in File Explorer
1. select both dev and prod folders and drop them on to WinMerge
1. review the changes

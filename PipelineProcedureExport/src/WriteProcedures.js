
///////////////////////////////////////////////////////////////////////////////

import * as fs from 'fs'

///////////////////////////////////////////////////////////////////////////////

const DevData = JSON.parse(fs.readFileSync('./src/QueryOutput_Dev.json')).data.filter(d => d[1])
const ProdData = JSON.parse(fs.readFileSync('./src/QueryOutput_Prod.json')).data.filter(d => d[1])

emptyFolder('./procedures/dev/')
emptyFolder('./procedures/prod/')

writeFiles('prod', ProdData)
writeFiles('dev', DevData)

///////////////////////////////////////////////////////////////////////////////

function emptyFolder(folderPath) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    fs.mkdirSync(folderPath, { recursive: true });
}

function writeFiles(folderName, data) {
    data.forEach(d => {
        const [
            name,
            objectId,
            objectDefinition
        ] = d

        fs.writeFileSync(`./procedures/${folderName}/${name}.sql`, objectDefinition)
    });
}

///////////////////////////////////////////////////////////////////////////////

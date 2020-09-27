
const { upload } = require('docker-image-artifact');
const githubActionIO = require('./actions_io');

const INPUT_IMAGE = 'image';

const OUTPUT_ARTIFACT_NAME = 'artifact_name';

async function runAction(getInput, writeOutput) {
    const imageName = getInput(INPUT_IMAGE, true);
    const artifactName = await upload(imageName);
    writeOutput(OUTPUT_ARTIFACT_NAME, artifactName);
}

runAction(githubActionIO.getInput, githubActionIO.writeOutput)
    .then(() => console.log("Uploading finished") )
    .catch((err) => githubActionIO.fail(err));
    


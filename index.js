const { exec } = require('child_process');
const fs = require('fs');

// Function to execute Git commands
function gitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stderr.trim());
                return;
            }
            resolve(stdout.trim());
        });
    });
}

// Function to modify a dummy file
function modifyDummyFile() {
    const filePath = 'dummy.txt';
    const content = `Auto commit update: ${new Date().toISOString()}\n`;
    fs.appendFileSync(filePath, content);
}

var c = 0;
async function commitToGit() {
    try {
        modifyDummyFile(); // Ensure there's a change to commit

        // Add files to staging area
        await gitCommand('git add .');

        // Commit with a message
        await gitCommand(`git commit -m "Auto Commit ${c} - ${new Date().toISOString()}"`);
        c++

        console.log(`Committed at ${new Date().toISOString()}`);
    } catch (error) {
        console.error('Error committing to Git:', error);
    }
}

async function pushToGit() {
    try {
        await gitCommand('git push');
        console.log('Pushed to remote repository');
    } catch (error) {
        console.error('Error pushing to Git:', error);
    }
}

// Run commitToGit every 1 second
setInterval(commitToGit, 50);

// Run pushToGit every 10 seconds
setInterval(pushToGit, 10000);

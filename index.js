const { execFile } = require('child_process');
const { promises: fsPromises } = require('fs');

// Function to execute Git commands using execFile
function gitCommand(command, args) {
    return new Promise((resolve, reject) => {
        execFile('git', [command, ...args], (error, stdout, stderr) => {
            if (error) {
                reject(stderr.trim());
                return;
            }
            resolve(stdout.trim());
        });
    });
}

// Function to update dummy file content asynchronously
async function modifyDummyFile() {
    const filePath = 'dummy.txt';
    const content = `Last update: ${new Date().toISOString()}\n`;
    await fsPromises.writeFile(filePath, content);
}

// Counter for commit messages
let commitCount = 0;

// Function to commit changes to Git
async function commitToGit() {
    try {
        await gitCommand('commit', ['--allow-empty', '-m', `Auto Commit ${commitCount} - ${new Date().toISOString()}`]); // Commit with allow-empty
        commitCount++;
    } catch (error) {
        console.error('Error committing to Git:', error);
    } finally {
        // Schedule the next commit after this one finishes
        setTimeout(commitToGit, 0); // Immediate next commit
    }
}

// Function to push changes to remote repository
async function pushToGit() {
    try {
        await gitCommand('push', []); // Push to remote
        console.log('Pushed to remote successfully');
    } catch (error) {
        console.error('Error pushing to Git:', error);
    } finally {
        // Schedule the next push after this one finishes
        setTimeout(pushToGit, 30000); // 30 seconds interval
    }
}

// Start the commit and push loops
setTimeout(commitToGit, 0); // Start committing immediately
setTimeout(pushToGit, 30000); // Start pushing after 30 seconds
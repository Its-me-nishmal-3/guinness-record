const { exec } = require('child_process');

// Function to execute Git commands
function gitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

async function commitToGit() {
    try {
        // Add files to staging area
        await gitCommand('git add .');

        // Commit with current timestamp
        const commitDate = new Date().toISOString();
        await gitCommand(`GIT_COMMITTER_DATE="${commitDate}" git commit --date="${commitDate}" -m "Auto Commit - ${commitDate}"`);

        console.log(`Committed at ${commitDate}`);
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
setInterval(commitToGit, 1000);

// Run pushToGit every 10 seconds
setInterval(pushToGit, 10000);

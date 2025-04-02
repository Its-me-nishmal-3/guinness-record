const { exec } = require("child_process");
const fs = require("fs");

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
    const filePath = "dummy.txt";
    const content = `Auto commit update: ${new Date().toISOString()}\n`;
    fs.appendFileSync(filePath, content);
}

// Function to check if there are changes to commit
async function hasChanges() {
    const status = await gitCommand("git status --porcelain");
    return status.trim().length > 0; // Returns true if there are changes
}

let c = 0;

async function commitAndPush() {
    try {
        modifyDummyFile(); // Ensure there's a change to commit

        if (await hasChanges()) {
            await gitCommand("git add .");
            await gitCommand(`git commit -m "Auto Commit ${c} - ${new Date().toISOString()}"`);
            c++;
            console.log(`Committed at ${new Date().toISOString()}`);
        } else {
            console.log("No changes to commit.");
        }

        await gitCommand("git push");
        console.log("Pushed to remote repository");

    } catch (error) {
        console.error("Error during Git operations:", error);
    }
}

// Run commitAndPush every 5 seconds
setInterval(commitAndPush, 5000);

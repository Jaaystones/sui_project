// Contract creation generator script
const generatePTBCommand = ({ packageId, adminCapId, dashboardId, numProposals }) => {
    let command = "sui client ptb \n";

    for (let i = 1; i <= numProposals; i++) {
        // Generate timestamp: current date + 1 year + incremental seconds
        const currentDate = new Date();
        const oneYearFromNow = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
        const timestamp = oneYearFromNow.getTime() + i * 10000;  // add 1 sec per proposal
        const timestampId = Math.floor(Math.random() * 100000 * i);


        const title = `Proposal ${timestampId}`;
        const description = `Proposal description ${timestampId}`;


        // Proposal creation command
        command += ` \\
        --move-call ${packageId}::proposal::create \\
        @${adminCapId} \\
        '"${title}"' '"${description}"' ${timestamp} \\
        --assign proposal_id`;

        // Add dashboard registration command
        command += ` \\
        --move-call ${packageId}::dashboard::register_proposal \\
        @${dashboardId} \\
        @${adminCapId} proposal_id`;                                                                                                        
    }

    return command;

};

//inputs
const inputs = {
    packageId: "0x763d7aa04273fd0286432b47f33d3d8b4065264d0e9d5b00253d8c4b6ab361b8",
    adminCapId: "0xccb7c895a8fcca86f11e76e5f34b09947948312427e04af9a1e8840e8e9a0a5c",
    dashboardId: "0x3b9fdfb9547bb4cc756b77018f75d6daf25f9fccf846e15245a4244be422503f",
    numProposals: 3,
};

// generate command
const ptbCommand  = generatePTBCommand(inputs);
console.log(ptbCommand);



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
    packageId: "0xb00363fc8daf1d0408c2a20ff7b6dbc0d967632e411ba4d4c1c08a5850e83528",
    adminCapId: "0x133c6e95276e25356e25085dd4ce7bd738d3cd34edc4847a6c8fabcf2949c310",
    dashboardId: "0x23d48a64dafe500c022c7da7f08e22cf033f121f2b309ea26e3f73ba313c99e5",
    numProposals: 6,
};

// generate command
const ptbCommand  = generatePTBCommand(inputs);
console.log(ptbCommand);



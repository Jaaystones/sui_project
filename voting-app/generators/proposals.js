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
    packageId: "0xabc9070d27bf38cb6a66aab41491586f32cc41fc25ecb62bfc63636595d7f46e",
    adminCapId: "0xca8a2ae62d72457cef4181ca57aabfa0a8aebc79c1709b051c5abd05cc02cc05",
    dashboardId: "0xcf04acdbf6fc71a209bbb5240d01aef22c93deea2c2dbd5f9ab5707374d2feec",
    numProposals: 3,
};

// generate command
const ptbCommand  = generatePTBCommand(inputs);
console.log(ptbCommand);



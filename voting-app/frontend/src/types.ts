


export type ProposalStatus = {
    variant: "Active" | "Delisted";
};

export type Proposal = {
    id: SuiID,
    title: string,
    description: string,
    status: ProposalStatus,
    votedYesCount: string,
    votedNoCount: string,
    expiration: number,
    creator: string
    voter_registery: string[]
};


export interface VoteNft {
    id: SuiID,
    url: string,
    proposal_id: string,
};
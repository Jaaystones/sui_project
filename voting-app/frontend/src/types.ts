

export type Proposal = {
    id: SuiID,
    title: string,
    description: string,
    votedYesCount: string,
    votedNoCount: string,
    expiration: number,
    creator: string
    voter_registery: string[]
}


export interface VoteNft {
    id: SuiID,
    url: string,
    proposal_id: string,
};


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
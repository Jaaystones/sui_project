import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC, useState } from "react";
import { EcText } from "../Shared";
import { SuiObjectData } from "@mysten/sui/client";
import { Proposal, VoteNft } from "../../types";
import { VoteModal } from "./VoteModal";


interface ProposalItemProps {
  id: string;
  voteNft: VoteNft | undefined;
  onVoteSuccess: () => void;
};

export const ProposalItem: FC<ProposalItemProps> = ({id, voteNft, onVoteSuccess}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: dataResponse, refetch: refetchProposal, isPending, error} = useSuiClientQuery(
        "getObject", {
        id,
        options: { 
            showContent: true
        }
    })

    if (isPending) return <EcText text="Loading..." isError={false} isCentered={true} />
    if (error) return <EcText isError text={`Error: ${error.message}`} />
    if (!dataResponse.data) return null

    const proposal = parseProposal(dataResponse.data);
    if (!proposal) return <EcText text="No data found!"/>
    
        


    const expiration = proposal.expiration
    const isDelisted = proposal.status.variant === "Delisted";
    const isExpired = isUnixTimeExpired(expiration);
    const isDisabled = isExpired || isDelisted;

    return (
        <>
          <div 
          onClick={() => !isDisabled && setIsModalOpen(true)}
          className={`${isDisabled ? "cursor-not-allowed border-gray-600 opacity-60" : "hover:border-blue-500 cursor-pointer"}
            p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors relative`}
        >
            {isDelisted && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    DELISTED
                </div>
            )}
            <div className="flex justify-between">
                <p 
                    className={`${isDisabled ? "text-gray-600" : "text-grey-300"} text-xl font-semibold mb-2`}>{proposal.title}
                </p>
                { !!voteNft && <img className="w-8 h-8 rounded-full" src={voteNft?.url} />}
            </div>
            <p 
                className={`${isDisabled ? "text-gray-600" : "text-gray-300"}`}>{proposal.description}
            </p>
            <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-4">
                    <div className={`${isDisabled ? "text-green-800" : "text-green-600"} flex items-center`}>
                        <span className="mr-1">👍</span>
                        {proposal.votedYesCount}
                    </div>
                    <div className={`${isDisabled ? "text-red-800" : "text-red-600"} flex items-center`}>
                        <span className="mr-1">👎</span>
                        {proposal.votedNoCount}
                    </div>
                </div>
                <div>
                    <p className={`${isDisabled ? "text-grey-600" : "text-gray-400"}`}>
                        { isDelisted ? "Delisted" : formatUnixTime(expiration)}
                    </p>
                </div>
            </div>
          </div>
          <VoteModal
            proposal={proposal}
            hasVoted={!!voteNft} 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onVote={(voteYes: boolean) => {
                console.log(voteYes);
                refetchProposal();
                onVoteSuccess();
                setIsModalOpen(false);
            }}
          />
        </>
    )
}


function parseProposal(data: SuiObjectData): Proposal | null {
    if (data.content?.dataType !== "moveObject") return null;
        
    
    const { voted_yes_count, voted_no_count, expiration, ...rest} = data.content.fields as any;

    return {
        ...rest,
        votedYesCount: Number(voted_yes_count),
        votedNoCount: Number(voted_no_count),
        expiration: Number(expiration),
    }
 }
function isUnixTimeExpired(unixTimems: number){
    return new Date(unixTimems) < new Date();
}
    
function formatUnixTime(timestampMs: number){
    if (isUnixTimeExpired(timestampMs)){
        return "Expired"
    }

    return new Date(timestampMs).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}










































import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../config/NetworkConfig";
import { PaginatedObjectsResponse, SuiObjectData } from "@mysten/sui/client";
import { ProposalItem } from "../components/proposal/ProposalItem";
import { useVoteNfts } from "../hooks/useVoteNfts";
import { VoteNft } from "../types";



const ProposalView = () => {
  const dashboardId = useNetworkVariable("dashboardId");
  const { data: voteNftsRes } = useVoteNfts();
  
  // Add error handling
    if (!dashboardId) {
        return <div>Loading dashboard...</div>;
    }

    const { data: dataResponse, isPending, error} = useSuiClientQuery(
      "getObject",
      {
        id: dashboardId,
        options: { 
          showContent: true 
        },
      } 
    )


    if (isPending) return <div className="text-center text-gray-500">Loading...</div>
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>
    if (!dataResponse.data) return <div className="text-center text-red-500">No data found.</div>

    const voteNfts = extractVoteNfts(voteNftsRes);
    

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">New Proposals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
        {getDashboardFields(dataResponse.data)?.proposals_ids.map(id =>
          <ProposalItem 
            key={id} 
            id={id}
            hasVoted={checkVoteNfts(voteNfts, id)}
          />
        )}
      </div>
    </>
  )
}

function checkVoteNfts(nfts: VoteNft[], proposalId: string){
  return nfts.some(nft => nft.proposal_id === proposalId)
}

function getDashboardFields(data: SuiObjectData) {
  if (data.content?.dataType !== "moveObject") return null;
  
  return data.content.fields as { 
    id: SuiID,
    proposals_ids: string[],
  }
}

function extractVoteNfts(nfRes: PaginatedObjectsResponse | undefined){
  if (!nfRes?.data) return [];

  return nfRes.data.map(nftObject => getVoteNft(nftObject.data));
}

function getVoteNft(nftData: SuiObjectData | undefined | null): VoteNft {
  if (!nftData?.content || nftData.content.dataType !== "moveObject") {
    return { id: {id: ""}, url: "", proposal_id:"" };
  }

  const { proposal_id, url, id } = nftData.content.fields as any;

  return {
    proposal_id,
    id,
    url
  };
}

export default ProposalView
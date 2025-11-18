import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit"
import { SuiObject } from "./SuiObject"


export const OwnedObjects = () => {
    const account = useCurrentAccount()
    const { data: response, error, isPending} =useSuiClientQuery(
        "getOwnedObjects",
        {
            owner: account?.address as string,
            options: {
                showType: true,
                showOwner: true,
                showContent: true,
            }
        },
        {
            enabled: !!account
        }
    )

    if (!account) {
        return <p className="text-gray-700 dark:text-gray-300"
        >
            Connect your wallet to see your owned objects.
        </p>
    }
    if (error) return <p className="text-red-500"
            >Error loading owned objects:{error.message}
        </p>
    
    if (isPending) return <p className="text-center text-gray-700 dark:text-gray-300"
        >
            Loading owned objects...
        </p>
    
    if (!response) return <p className="text-center text-gray-700 dark:text-gray-300"
        >
            No owned objects found.
        </p>   


  return (
    <div className="flex flex-col my-4 space-y-4">
        {response.data.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300"
        >
            No owned objects found by connected wallet.
        </p>
        ) 
        : 
        (
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100"
        >
            Owned Objects by connected wallet
        </h2>
        )}
        <div className="flex flex-col space-y-2 hover:border-blue-500"
        >
        {response.data.map((objectRes) => (
        <SuiObject 
            key={objectRes.data?.objectId}
            objectRes={objectRes} 
        />               
        ))}

        </div>
    </div>
  )
}


import { useCurrentAccount } from "@mysten/dapp-kit"
import { OwnedObjects } from "../OwnedObjects"



export const WalletStatus = () => {
    const account = useCurrentAccount()


    return (
        <div className="my-2 border rounded-lg bg-gray-100  dark:bg-gray-800 p-3 hover:border-blue-500 transition-colors">
            <h2 className="mb-2 text-xl font-bold">Wallet Status</h2>
            { account ? (
                <div className="flex flex-col space-y-1">
                    <p className="text-gray-700 dark:text-white">Wallet Connected!</p>
                    <p className="text-gray dark: text-white">
                        Address: <span className="font-mono">{account.address}</span>
                    </p>
                </div> 
            ) : (
                <p className="text-gray-700 dark: text-grey-300">Wallet Not Connected!</p>
            )}

            <OwnedObjects />
        </div>
    )
}
import { SuiObjectResponse } from "@mysten/sui/client"
import { FC } from "react"


type SuiObjectProps = {
    objectRes: SuiObjectResponse
}


export const SuiObject: FC<SuiObjectProps> = ({objectRes}) => {

    const owner = objectRes.data?.owner
    const objectType = objectRes.data?.type
    const objectId = objectRes.data?.objectId

    const isCoin = objectType?.startsWith("0x2::coin::Coin<")
    const balance = isCoin ? (objectRes.data?.content as any).fields?.balance : null
    
  return (
     <div key={objectRes.data?.objectId} className="p-2 border rounded-lg">
        <p className="text-gray-700 dark:text-white">
            <strong>Object ID:</strong> {objectId}
        </p>
        <p className="text-gray-700 dark:text-white">
            <strong>Type:</strong> {objectType}
        </p>
        <p className="text-gray-700 dark:text-white">
            <strong>Owner:</strong>{typeof owner ==="object" && owner !== null && "AddressOwner" in owner 
            ? owner.AddressOwner 
            : "Unknown"}
        </p>
        {isCoin && (
            <p className="text-gray-700 dark:text-white">
                <strong>Balance:</strong>{balance}
            </p>
        )}
     </div>
  )
}




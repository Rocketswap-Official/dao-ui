import { detail } from "./config";
import { walletAddress } from "./stores/walletStore"

export const connect = async()=>{
    let installed = false;

    document.addEventListener('lamdenWalletInfo', async(response)=>{
        let data = response.detail
        
        if (data.errors !== undefined ){
            if (data.errors[0] === "Lamden Vault is Locked"){
                console.log( await data.errors[0])
            }    
        }
        if (data.wallets !== undefined){
            if (data.wallets[0]){
               walletAddress.set(data.wallets[0])
            }
        }
    } )

    const handleWalletInfo = (response)=>{
        installed = true;
        document.removeEventListener("lamdenWalletInfo", handleWalletInfo);
        document.dispatchEvent(new CustomEvent('lamdenWalletConnect', {detail: JSON.stringify(detail)}))
    }

    document.addEventListener('lamdenWalletInfo', handleWalletInfo, { once: true } )
    document.dispatchEvent(new CustomEvent('lamdenWalletGetInfo'));
    

    setTimeout(() => {
        if (!installed) console.log("Wallet not installed");
    }, 1000);
}



   




export const castBallot = (proposalIdx, choiceIdx)=>{

    const detail = JSON.stringify({
        networkType: 'marvinnet', 
        methodName: 'cast_ballot', 
        kwargs: {
            proposal_idx: proposalIdx,
            choice_idx: choiceIdx
        }, 
        stampLimit: 100
    });

    //Send transaction to the wallet
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', {detail}));

}
export const createProposal = (title, description, date, choiceArray)=>{

    const detail = JSON.stringify({
        networkType: 'marvinnet', 
        methodName: 'create_proposal', 
        kwargs: {
            title: title, 
            description: description, 
            date_decision: date, 
            choices: choiceArray
        }, 
        stampLimit: 100
    });

    //Send transaction to the wallet
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', {detail}));

}
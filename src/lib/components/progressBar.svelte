<!--div>progress bar</div-->

<script>
    import { castBallot } from "$lib/js/contractMethodCalls.js"
    import { onMount } from "svelte";
    import { walletAddress } from "../js/stores/walletStore"
    export let choices;
    
    let n = 0;
    //get vk from lamden wallet
    let vk = $walletAddress;
    //let vk = "dddddddddd"
    let vkVoted = false;
    let chosenChoice;
    let justChosen;
    let justVoted = false;
    let vote;

    for (let c of choices){
        if (c.vk === vk){
            vkVoted = true;
            chosenChoice = c.choiceIdx;
        }
    }

    const castBallot_= (e) =>{
        let proposalId = parseInt(e.target.getAttribute("data-proposal-id"));
        let choiceIdx = parseInt(e.target.getAttribute("data-choice-idx"));
        vote(proposalId, choiceIdx)
        justChosen = e.target
    }
    
    onMount(()=>{
        vote = castBallot

        document.addEventListener('lamdenWalletTxStatus', async(response) => {
            let data = await response.detail.data
            if (data.resultInfo.type === 'error') {
                
                console.log(data.resultInfo)
            }
            if (Object.keys(data.txBlockResult).length > 0){
                if (data.txBlockResult.result === "None"){
                    justChosen.disabled = true;
                    justChosen.style.border = '2px solid seagreen';
                    justVoted = true;
                }
            }
            console.log(data)
            
            //data.resultInfo.title: "Transaction Pending" 
            //data.resultInfo.title: "Transaction Successful"
            //data.resultInfo.subtitle: "Your transaction used 1 stamps"
            //data.resultInfo.type: "success"
            
                
        });
    })
    
</script>

<div>
    
    {#each choices as choice}
        {#if vkVoted}
            {#if choice.choiceIdx === chosenChoice}
                <label for="choice">
                    <button class="voted" disabled>{choice.choice}</button>
                </label>
                <div class="progress-bar">
                    <div class="track" style="width: {choice.voteWeight}">{choice.voteWeight}</div>
                </div>
            {:else}
                <label for="choice">
                    <button disabled>{choice.choice}</button>
                </label>
                <div class="progress-bar">
                    <div class="track" style="width: {choice.voteWeight}">{choice.voteWeight}</div>
                </div>
            {/if}
            
        {:else}
            <label for="choice">
                <button 
                    data-proposal-id={choice.proposalId} 
                    data-choice-idx={choice.choiceIdx} 
                    class="{justVoted?'disable':''}"
                    on:click={castBallot_}>
                    {choice.choice}
                </button>
            </label>
            <div class="progress-bar">
                <div class="track" style="width: {choice.voteWeight}">{choice.voteWeight}</div>
            </div>
        {/if}
    {/each}
    
    
</div>

<style>
    
    .progress-bar{
        width: 100%;
        height: 14px;
        padding: 0;
        margin: 5px 0 5px 0;
    }
    .track{
        background-color: aqua;
        border-radius: 3px;
        text-align: center;
        font-size: 10px;
        padding: 0;;
    }
    label{
        font-size: 11px;
    }
    button{
        padding: 4px;
        background-color: transparent;
        border: 0.5px solid grey;
        border-radius: 5px;
        cursor: pointer;
    }
    .voted {
        border: 2px solid seagreen;
    }
    .disable{
        opacity: 0.7;
        pointer-events: none;
    }

</style>
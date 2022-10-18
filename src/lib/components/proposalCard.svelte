<!--div>proposal card </div-->
<!--div>we will need a progress bar component </div-->
<script>
    
    import ProgressBar from '$lib/components/progressBar.svelte';

    export let proposal;
    export let user;

    let results = proposal.results
    let choices = proposal.choices
    let total = 0;
    let choiceArray = [];

    for (let s of choices){
        let i = choices.indexOf(s)
        choiceArray.push({"proposalId": proposal.id, "choiceIdx": i, "choice": s, "voteWeight": 0.00})
    }

    if (Object.keys(user).length > 0){
        for (let u of user){
            for (let ui of u.proposals){
                if (ui === proposal.id){
                    let indx = u.proposals.indexOf(ui);
                    let c = u.choice_idx[indx];
                    let cWeight = u.rswp_balance + u.rocket_fuel + u.staked_rswp + u.lp_stake + u.lp_points;
                    
                    for (let u1 of choiceArray){
                        if (u1.choiceIdx === c){
                            u1.voteWeight += cWeight
                            u1.vk = u.vk;
                            
                        }
                    }

                    total += cWeight;
                }


            }
            
        }
        for (let u2 of choiceArray){
            let w = u2.voteWeight;
            
            u2.voteWeight = (w/total*100).toFixed(2) + "%";
            if(w === 0 || total === 0){
                u2.voteWeight = "0.00%" ;
            }
        }
    }

    //check for verified state here
    if(proposal.verified === true){
        const choice_idx = Object.keys(results)

        for (let idx of choice_idx){
            total += results[idx];
        }
        for (let u0 of choiceArray){
            
            let w = u0.voteWeight;
            u.voteWeight = (w/total*100).toFixed(2) + "%";
            if(w === 0 || total === 0){
                u0.voteWeight = "0.00%" 
                
            }
            
        }

    }   
    
</script>


<div class="container">
    <div class="metadata-container">
        <div>Status: {proposal.state}</div>
        <div>Voting Ends: {proposal.date_decision}</div>
    </div>
    
    <h3>#{proposal.id} - {proposal.title}</h3>
    <div>Description: 
        <h4 >
            {proposal.description}
        </h4>
    </div>

    <div class="choice-container">
        
            
        <ProgressBar choices={choiceArray} />
            
    </div>

    <div class="stats-container">
        <div>Total votes: {(total/102000321*100).toFixed(8)}%</div>
        <div>{total}/102000321 RSWP</div>
    </div>
</div>

<style>
    .container{
        width: 70%;
        border-radius: 10px;
        border: 1px solid grey;
        padding: 10px;
        font-size: small;
        margin-bottom: 15px;
    }
    .metadata-container{
        margin-bottom: 10px;
    }
    .choice-container{
        margin: 10px 0 10px 0;
    }
    .stats-container{
        margin-top: 10px;
        font-size: 11px;
    }
    h4, h3{
        margin: 5px 0 5px 0;
    }
</style>
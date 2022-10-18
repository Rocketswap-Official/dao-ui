<script>
    import ProposalCard from '$lib/components/proposalCard.svelte';
    //mock data
    const proposals = [{
        "id": 1,
        "title":'some proposal', 
		"description": 'this is enginneered', 
		"date_decision": "29/10/2021", 
	 	"choices": ['yeah its me', 'nope not me', 'we shall see'],
	 	"state": "open",
        "lp_weight": 123,
        "verified": false
     },
     {
        "id": 2,
        "title":'some proposal', 
		"description": 'this is enginneered', 
		"date_decision": "29/10/2021", 
	 	"choices": ['yeah its me', 'nope not me', 'we shall see'],
	 	"state": "concluded",
        "lp_weight": 102,
        "results": {"0": 123, "1": 321,"2":222},
        "verified": false
     }];

    const user = [{
        "vk": 'cccccccccc',
        "ballot_idx": [1],
        "choice_idx": [0,2],
        "weight": [],
        "proposals": [1,2],
        "rswp_balance": 1000,
        "rocket_fuel": 2000,
        "staked_rswp": 50000,
        "lp_stake": 150,
        "lp_points": 100
    },
    {
        "vk": 'bbbbbbbbbb',
        "ballot_idx": [1],
        "choice_idx": [2,0],
        "weight": [],
        "proposals": [1,2],
        "rswp_balance": 1000,
        "rocket_fuel": 2020,
        "staked_rswp": 50500,
        "lp_stake": 155,
        "lp_points": 110
    }]
    
    //const proposals = [];
</script>

<div class="mobile">
    {#if Object.keys(proposals).length > 0}
        {#each proposals as proposal}
            
            <ProposalCard {proposal} {user}/> 
            
        {/each}
    {:else}
        <p style="color: red; font-size: 11px;">No proposals to display</p>
    {/if}
</div>
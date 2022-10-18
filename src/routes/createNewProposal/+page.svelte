<script>
    import { createProposal } from "$lib/js/contractMethodCalls.js"
    import { onMount } from "svelte";

    let title = ''; 
    let description = '';
    let date_decision = '' ;
    let choice0 = '';
    $: choiceArray = [choice0];


    let submit;
    let buttonText = 'submit'

    const submitNewProposal = ()=>{
        submit(title, description, date_decision, choiceArray);
    }

    onMount(()=>{
        submit = createProposal;

        document.addEventListener('lamdenWalletTxStatus', async(response) => {
            let data = await response.detail.data
            if (data.resultInfo.type === 'error') {
                
                console.log(data.resultInfo)
            }
            if (Object.keys(data.txBlockResult).length > 0){
                if (data.txBlockResult.result === "None"){
                    buttonText = 'Submitted!'
                    setTimeout(()=>{
                        buttonText = 'submit'
                    }, 2000)
                    
                }
            }
            console.log(data)
            
            //data.resultInfo.title: "Transaction Pending" 
            //data.resultInfo.title: "Transaction Successful"
            //data.resultInfo.subtitle: "Your transaction used 1 stamps"
            //data.resultInfo.type: "success"
            
                
        });
    });

</script>

<div class="form">
    <label for="title">title</label><br>
    <input bind:value={title}><br>
    <label for="description">description</label><br>
    <textarea bind:value={description}></textarea><br>
    <label for="date_decision">date_decision</label><br>
    <input type="date" bind:value={date_decision}><br>
    <div class="choices">
        <label for="choices">choices</label><br>
        <input bind:value={choice0}><button>+</button>
    </div>
    <input type="submit"  
        value={buttonText} 
        style="width: 100%; padding: 5px 0 5px 0"
        on:click={submitNewProposal}>
    
</div>

<style>
    .form{
        width: 70%;
        margin:auto;
        padding: 15px 10px;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: small;
        
    } 
    .choices {
        margin: 5px 0 10px 0;
    }
</style>
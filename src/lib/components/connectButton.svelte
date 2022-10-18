<script>
    import { onMount } from "svelte";
    import { connect } from "../js/walletConnector";
    import { walletAddress } from "../js/stores/walletStore"

    let connectToWallet;
    //let buttonText = "connect"

    onMount(()=>{
        connectToWallet = connect
    })
</script>
<div class="button-container">
    {#if $walletAddress === null}
        <button on:click={connectToWallet}>connect</button>
    {:else}
        <button on:click={connectToWallet}>{$walletAddress.substring(0,6) + "..." + $walletAddress.substring(59,63)}</button>
    {/if}
</div>

<style>
    button {
        background-color: transparent;
        padding: 5px 10px;
        border-radius: 5px;
        /* border-style: none ; */
    }
    .button-container {
        margin: 10px 0 10px 5px;
    }
</style>
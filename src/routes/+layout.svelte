<script>
    import '$lib/css/custom.css'
    import ConnectButton from "$lib/components/connectButton.svelte"
    //import { onMount } from "svelte";
    
    // onMount(()=>{
    //     connect()
    // })
</script>

<ConnectButton/>

<nav>
    <button> 
        <a href="/">Proposals</a>
    </button>
    <button>
        <a href="/createNewProposal">Create Proposal</a>
    </button>
    <button>
        <a href="/userDashboard">Dashboard</a>
    </button>
</nav>

<main>

    <slot></slot>

</main>

<style>
    main{
        padding: 20px;
    }
</style>
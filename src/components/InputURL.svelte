<script>
  import { wsURL, isSocketOpen, openWebSocket, closeWebSocket } from "../store";

  let socketOpened;

  isSocketOpen.subscribe((x) => (socketOpened = x));
</script>

<section class="socket-status">
  <div class="status-wrapper">
    <div class={socketOpened ? "pill opened" : "pill"}>
      {socketOpened ? "open" : "closed"}
    </div>
  </div>
  <div class="input-wrapper">
    <input type="text" bind:value={$wsURL} disabled={socketOpened} />
    {#if socketOpened}
      <button on:click={closeWebSocket}>Close</button>
    {:else}
      <button on:click={openWebSocket}>Open</button>
    {/if}
  </div>
</section>

<style>
  .socket-status {
    grid-area: socket-status;
    display: flex;
  }

  .status-wrapper {
    display: flex;
    margin-right: 25px;
  }

  .input-wrapper {
    flex-grow: 1;
  }

  .pill {
    padding: 10px;
    border-radius: 25px;
    background-color: #555;
    color: #fff;
    font-weight: bold;
    height: fit-content;
    font-size: 15px;
  }

  .pill.opened {
    background-color: #daedb4;
    color: #283018;
  }

  .input-wrapper input {
    width: calc(90% - 30px);
    margin-right: 20px;
    padding: 10px;
    font-size: 15px;
  }

  .input-wrapper button {
    width: 10%;
    margin: 0;
    padding: 10px;
    font-size: 15px;
  }
</style>

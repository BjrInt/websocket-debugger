<script>
  import { JsonView } from "@zerodevx/svelte-json-view";
  import { awaitQueue, msgFeed, toggleMessageVisibility } from "../store";

  let feed = [];
  msgFeed.subscribe((msgs) => (feed = msgs));
</script>

<section class="socket-response">
  <div class="message-counter">
    {$msgFeed.length} messages ({$awaitQueue.length} awaiting)
  </div>
  {#each feed as msg, i}
    <div class="message-wrapper">
      <div class="message-header" on:click={() => toggleMessageVisibility(i)}>
        # {feed.length - i} - received: {Number(msg.timeStamp / 1000).toFixed(
          2
        )}s after opening
      </div>
      {#if msg._showMsg}
        <div class="message-details">
          <JsonView json={msg} />
        </div>
      {/if}
    </div>
  {/each}
</section>

<style>
  .message-counter{
    padding: 15px;
  }

  .message-wrapper {
    padding: 25px;
    margin: 15px;
    border-radius: 5px;
  }

  .message-header {
    cursor: pointer;
  }

  .message-wrapper:nth-child(2n) {
    background-color: #ccc;
  }

  .message-wrapper:hover {
    background-color: bisque;
    transition: 0.5s;
  }

  .message-details {
    padding: 15px 0;
    border-top: 1px solid #333;
    font-size: 11px;
  }
</style>

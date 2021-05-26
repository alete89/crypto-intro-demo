<script lang="ts">
  import { encryptedMessages } from "../store/users";
  import MessageComponent from "./message.svelte";

  let currentMessages: string[];

  const unsubscribe = encryptedMessages.subscribe((value) => {
    currentMessages = value;
  });
</script>

<div class="message-list">
  <h1>Messages:</h1>
  {#each currentMessages as message}
    <MessageComponent {message} />
  {/each}
</div>

<style>
</style>

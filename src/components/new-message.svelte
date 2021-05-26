<script lang="ts">
  import type { User } from "../model/user";
  import { encriptarMensaje } from "../service/crypto";
  import { users, encryptedMessages } from "../store/users";
  let currentUsers: User[];

  const usersUnsubscribe = users.subscribe((value) => {
    currentUsers = value;
  });

  let fromUser: User;
  let toUser: User;
  let cleartext: string = "Write your message here";

  const handleEncryptButton = async () => {
    const encrypted = await encriptarMensaje(fromUser, toUser, cleartext);
    console.log(encrypted);
    encryptedMessages.update((current) => {
      current.push(encrypted);
      return current;
    });
  };
</script>

<!-- on:change={() => (answer = "")} -->
<div class="card">
  <p>from</p>
  <select bind:value={fromUser}>
    <option disabled selected value> -- select an option -- </option>
    {#each currentUsers as user}
      {#if !!user.key}
        <option value={user} disabled={user == toUser}>
          {user.name}
        </option>
      {/if}
    {/each}
  </select>
  <p>to</p>
  <select bind:value={toUser}>
    <option disabled selected value> -- select an option -- </option>
    {#each currentUsers as user}
      {#if !!user.key}
        <option value={user} disabled={user == fromUser}>
          {user.name}
        </option>
      {/if}
    {/each}
  </select>
  <textarea bind:value={cleartext} />
  <button on:click={() => handleEncryptButton()}>Encrypt</button>
</div>

<style>
</style>

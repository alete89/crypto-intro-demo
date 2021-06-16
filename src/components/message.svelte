<script lang="ts">
  import type { User } from "../model/user";
  import { decryptMessage } from "../service/crypto";
  import { users } from "../store/users";

  export let message: string;

  let currentUsers: User[];

  const usersUnsubscribe = users.subscribe((value) => {
    currentUsers = value;
  });

  let fromUser: User;
  let toUser: User;
  let cleartext: string;
  let validSignature: boolean;

  const handleDecryptButton = async () => {
    try {
      const { decrypted, valid } = await decryptMessage(fromUser, toUser, message);
      cleartext = decrypted;
      validSignature = valid;
    } catch (error) {
      console.log("El usuario seleccionado no puede desencriptar el mensaje");
    }
  };
</script>

<div class="card" id="asd">
  <p>Message:</p>
  <p>{message.slice(28, 58)}</p>
  <p>decrypt as: (to)</p>
  <select bind:value={toUser}>
    <option disabled selected value> -- select an option -- </option>
    {#each currentUsers as user}
      {#if !!user.key}
        <option value={user}>
          {user.name}
        </option>
      {/if}
    {/each}
  </select>
  <p>verify signature from (optional) (from)</p>
  <select bind:value={fromUser}>
    <option disabled selected value> -- select an option -- </option>
    {#each currentUsers as user}
      {#if !!user.key}
        <option value={user}>
          {user.name}
        </option>
      {/if}
    {/each}
  </select>
  <textarea bind:value={cleartext} disabled />
  <p>Valid: {validSignature}</p>
  <button on:click={() => handleDecryptButton()}>Decrypt</button>
</div>

<style>
</style>

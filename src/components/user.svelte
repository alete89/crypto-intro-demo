<script lang="ts">
  import type { User } from "../model/user";
  import { generarClaves } from "../service/crypto";
  import { users } from "../store/users";

  export let user: User;

  const handleClickGenerarClaves = async () => {
    user["key"] = await generarClaves(user);
    users.update((current) => {
      current = current.filter((u) => u.name !== user.name);
      current.push(user);
      return current;
    });
  };
</script>

<div class="card">
  <h1>{user.name}</h1>
  <p>{user.email}</p>
  <p>Has keys: {!!user.key}</p>
  {#if !user.key}
    <button on:click={() => handleClickGenerarClaves()}>Generate</button>
  {/if}
</div>

<style>
  .card {
    border-style: solid;
    border-width: 3px;
    border-color: gray;
    border-radius: 10%;
    margin-bottom: 15px;
  }
</style>

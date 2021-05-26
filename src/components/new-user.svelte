<script lang="ts">
  import type { User } from "../model/user";
  import { users } from "../store/users";

  let newUser: User = { name: "", password: "", email: "" };

  const handleNewUser = async () => {
    users.update((current) => [...current, newUser]);
  };
</script>

<div class="card">
  <input type="text" bind:value={newUser.name} placeholder="Name" />
  <input type="text" bind:value={newUser.email} placeholder="Email" />
  <input type="password" bind:value={newUser.password} placeholder="Password" />
  <button on:click={() => handleNewUser()}>Create User</button>
</div>

<style>
</style>

<script lang="ts">
  import type { User } from "../model/user";
  import { users } from "../store/users";

  export let newUser: User;

  const handleNewUser = async () => {
    users.update((current) => [...current, newUser]);
  };
</script>

<div class="card">
  <h1>New user</h1>
  <p>name</p>
  <input type="text" bind:value={newUser.name} placeholder="Name" />
  <input type="text" bind:value={newUser.email} placeholder="Email" />
  <input type="password" bind:value={newUser.password} placeholder="Password" />
  <button on:click={() => handleNewUser()}>Create User</button>
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

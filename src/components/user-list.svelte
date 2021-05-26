<script lang="ts">
  import type { User } from "../model/user";
  import { users } from "../store/users";
  import UserComponent from "./user.svelte";

  let currentUsers: User[];

  const unsubscribe = users.subscribe((value) => {
    currentUsers = value;
  });
</script>

<div class="user-list">
  <h1>Users:</h1>
  {#each currentUsers as user}
    <UserComponent {user} />
  {/each}
</div>

<style>
</style>

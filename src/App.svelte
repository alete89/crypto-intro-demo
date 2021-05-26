<script lang="ts">
  import MessageListComponent from "./components/encrypted-list.svelte";
  import NewMessage from "./components/new-message.svelte";
  import NewUser from "./components/new-user.svelte";
  import UserListComponent from "./components/user-list.svelte";
  import type { User } from "./model/user";
  import { generarClaves } from "./service/crypto";
  import { users } from "./store/users";

  let currentUsers: User[];

  const unsubscribe = users.subscribe((value) => {
    currentUsers = value;
  });

  const bootstrap = async () => {
    let alete = { name: "alete", email: "alete89@hotmail.com", password: "mipassword" };
    alete["key"] = await generarClaves(alete);
    const pedrito = { name: "pedrito", email: "pedrito@mail.com", password: "pedritocapo" };
    users.update(() => [alete, pedrito]);
  };
  bootstrap();
</script>

<div class="horizontal">
  <div class="col">
    <NewUser />
    <UserListComponent />
  </div>
  <div class="col">
    <NewMessage />
    <MessageListComponent />
  </div>
</div>

<style>
  .horizontal {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .col {
    flex: 50%;
    margin-right: 10px;
    margin-left: 10px;
  }
  :global(.card) {
    padding: 15px;
    border-style: solid;
    border-width: 3px;
    border-color: gray;
    border-radius: 20px;
    margin-bottom: 15px;
  }
</style>

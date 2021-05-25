<script lang="ts">
  import UserListComponent from "./components/user-list.svelte";
  import MessageListComponent from "./components/encrypted-list.svelte";
  import NewMessage from "./components/new-message.svelte";
  import { generarClaves } from "./service/crypto";
  import type { User } from "./model/user";
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

<!-- ACA TIENE QUE HABER UN CONTEXT O APP TIENE QUE MANTENER EL ESTADO -->
<main>
  <h1>Users:</h1>
  <UserListComponent />
  <MessageListComponent />
  <NewMessage />
</main>

<style>
</style>

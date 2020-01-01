<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";

  const { page } = stores();

  onMount(() => {
    if (!$page.query.fcm) {
      return;
    }
    // window.firebase.messaging().getToken();

    // Callback fired if Instance ID token is updated.
    window.firebase.messaging().onTokenRefresh(() => {
      window.firebase
        .messaging()
        .getToken()
        .then(refreshedToken => {
          console.log("Token refreshed.");
          window.firebase
            .firestore()
            .collection("fcm_tokens")
            .add({
              token: currentToken
            });
        })
        .catch(err => {
          console.log("Unable to retrieve refreshed token ", err);
          showToken("Unable to retrieve refreshed token ", err);
        });
    });
  });

  const turnOnNotifications = () => {
    console.log("Requesting notification permissions...");

    window.Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        window.firebase
          .messaging()
          .getToken()
          .then(currentToken => {
            if (currentToken) {
              window.firebase
                .firestore()
                .collection("fcm_tokens")
                .add({
                  token: currentToken
                });
              // updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              console.log(
                "No Instance ID token available. Request permission to generate one."
              );
              // Show permission UI.
              // updateUIForPushPermissionRequired();
              // setTokenSentToServer(false);
            }
          })
          .catch(err => {
            console.log("An error occurred while retrieving token. ", err);
            // showToken("Error retrieving Instance ID token. ", err);
            // setTokenSentToServer(false);
          });
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  };
</script>

{#if $page.query.fcm}
  <button on:click={turnOnNotifications}>Turn on notifications</button>
{/if}

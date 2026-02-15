<script>
  const bgMusic = document.getElementById("bgMusic");
  let musicStarted = false;

  // Play music on first click anywhere
  document.body.addEventListener("click", () => {
    if (!musicStarted) {
      bgMusic.play().catch(err => console.log("Playback prevented:", err));
      musicStarted = true;
    }
  }, { once: true }); // triggers only once
</script>
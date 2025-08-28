function showPopup() {
      document.getElementById("popup").classList.add("active");
    }
    function closePopup() {
      document.getElementById("popup").classList.remove("active");
      window.location.href = "home_logged_in.html"; // redirect after popup
    }
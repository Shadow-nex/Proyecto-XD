// Guardar registro en localStorage
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const updateForm = document.getElementById("updateForm");
  const logoutBtn = document.getElementById("logout");
  const uploadPic = document.getElementById("uploadPic");
  const profilePic = document.getElementById("profilePic");

  // Registro
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        photo: "https://via.placeholder.com/120"
      };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Cuenta creada con éxito 🎉");
      window.location.href = "profile.html";
    });
  }

  // Perfil
  if (updateForm) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      document.getElementById("newUsername").value = storedUser.username;
      document.getElementById("newEmail").value = storedUser.email;
      profilePic.src = storedUser.photo || "https://via.placeholder.com/120";
    }

    updateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (storedUser) {
        storedUser.username = document.getElementById("newUsername").value || storedUser.username;
        storedUser.email = document.getElementById("newEmail").value || storedUser.email;
        storedUser.password = document.getElementById("newPassword").value || storedUser.password;
        localStorage.setItem("user", JSON.stringify(storedUser));
        alert("Perfil actualizado ✅");
        location.reload();
      }
    });

    // Subir foto de perfil
    uploadPic.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          storedUser.photo = reader.result;
          localStorage.setItem("user", JSON.stringify(storedUser));
          profilePic.src = reader.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Cerrar sesión
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "register.html";
    });
  }
});
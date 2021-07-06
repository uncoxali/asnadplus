export function notification({ text = "error", type = "danger" }) {
  const notifications = document.getElementById("Notifications");
  // .getElementsByClassName('notifications-body')[0]
  const alert = document.createElement("div");
  alert.className = `my-2 mx-1 alert alert-${type}`;
  alert.innerText = text;
  notifications.appendChild(alert);
  setTimeout(() => {
    notifications.removeChild(alert);
  }, 5500);
}
export function setToken(value = "") {
  const token = `Bearer ${value}`;
  localStorage.setItem("token", token);
  return token;
}

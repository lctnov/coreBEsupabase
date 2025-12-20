export function clearAuth() {
  document.cookie = "sessionToken=; path=/; max-age=0";
  localStorage.removeItem("sessionExpiresAt");
}

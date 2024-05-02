export function checkOfflineMode(): boolean {
  return localStorage.getItem('offlineMode') == 'true';
}

function parseUserList(value: string | undefined) {
  if (!value?.trim()) return [];
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function getAdminUsernames() {
  const configured = parseUserList(process.env.CMS_ADMIN_USERS);
  if (configured.length > 0) return configured;

  const fallback = process.env.ADMIN_USER ?? 'admin';
  return [fallback];
}

export function isAdmin(username: string) {
  return getAdminUsernames().includes(username);
}

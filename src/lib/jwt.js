// Simple JWT decoder (base64 decode only, no verification)
// For client-side use to extract user info from token
export function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function getUserFromToken(token) {
  if (!token) return null;
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  return {
    id: decoded.userId,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
    createdAt: decoded.createdAt,
  };
}

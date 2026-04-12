export type UserRole = "ADMIN" | "EDITOR";

export interface Permission {
  resource: string;
  actions: string[];
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [{ resource: "*", actions: ["*"] }],
  EDITOR: [
    { resource: "blogs", actions: ["create", "read", "update", "delete"] },
    { resource: "projects", actions: ["create", "read", "update", "delete"] },
    { resource: "comments", actions: ["read", "update", "delete"] },
    { resource: "contact", actions: ["read", "update"] },
    { resource: "testimonials", actions: ["create", "read", "update", "delete"] },
    { resource: "services", actions: ["create", "read", "update", "delete"] },
    { resource: "awards", actions: ["create", "read", "update", "delete"] },
    { resource: "experience", actions: ["create", "read", "update", "delete"] },
    { resource: "technologies", actions: ["create", "read", "update", "delete"] },
    { resource: "ads", actions: ["create", "read", "update", "delete"] },
    { resource: "statistics", actions: ["create", "read", "update", "delete"] },
    { resource: "profile", actions: ["read", "update"] },
    { resource: "dashboard", actions: ["read"] },
  ],
};

export function hasPermission(
  userRole: UserRole | undefined,
  resource: string,
  action: string = "read"
): boolean {
  if (!userRole) return false;
  const permissions = ROLE_PERMISSIONS[userRole];
  const hasWildcard = permissions.some(
    (p) => p.resource === "*" && p.actions.includes("*")
  );
  if (hasWildcard) return true;
  return permissions.some(
    (p) =>
      (p.resource === resource || p.resource === "*") &&
      (p.actions.includes(action) || p.actions.includes("*"))
  );
}

export function canAccessRoute(userRole: UserRole | undefined, route: string): boolean {
  if (!userRole) return false;
  const resource = route.replace("/admin/", "").split("/")[0];

  if (route === "/admin/dashboard") return true;
  if (route.startsWith("/admin/profile")) return true;

  if (route.startsWith("/admin/users") || route.startsWith("/admin/settings")) {
    return userRole === "ADMIN";
  }

  return hasPermission(userRole, resource);
}

export function requireRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = { ADMIN: 2, EDITOR: 1 };
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function requireAdmin(userRole: UserRole): boolean {
  return userRole === "ADMIN";
}

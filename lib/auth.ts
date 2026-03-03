export function requireAdmin(request: Request) {
  const role = request.headers.get("x-user-role");

  if (role !== "admin") {
    throw new Error("Unauthorized");
  }
}
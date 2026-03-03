import { fetchAllUsers } from "@/services/userService";
import { fetchAllParkings } from "@/services/parkingService";
import Link from "next/link";

export default async function Home() {
  const users = await fetchAllUsers();
  const parkings = await fetchAllParkings();

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Parking Management Admin Panel</h1>

      <div style={styles.grid}>
        {/* USERS */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <h2>Users</h2>
            <Link href="/register" style={styles.primaryBtn}>
              + Add User
            </Link>
          </div>

          {users.length === 0 ? (
            <p style={styles.empty}>No users found.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} style={styles.item}>
                <div>
                  <div style={styles.bold}>{user.name}</div>
                  <div style={styles.muted}>{user.email}</div>
                  <div style={styles.badge}>{user.role}</div>
                </div>
                <div style={styles.actions}>
                  <Link href={`/edit-user/${user.id}`} style={styles.link}>
                    Edit
                  </Link>
                  <Link href={`/delete-user/${user.id}`} style={styles.danger}>
                    Delete
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>

        {/* PARKINGS */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <h2>Parkings</h2>
            <Link href="/add-parking" style={styles.primaryBtn}>
              + Add Parking
            </Link>
          </div>

          {parkings.length === 0 ? (
            <p style={styles.empty}>No parkings found.</p>
          ) : (
            parkings.map((parking) => (
              <div key={parking.id} style={styles.item}>
                <div>
                  <div style={styles.bold}>{parking.name}</div>
                  <div style={styles.muted}>{parking.location}</div>
                  <div>${parking.price_per_hour}/hr</div>
                  <div style={styles.status}>{parking.status}</div>
                </div>
                <div style={styles.actions}>
                  <Link href={`/edit-parking/${parking.id}`} style={styles.link}>
                    Edit
                  </Link>
                  <Link href={`/delete-parking/${parking.id}`} style={styles.danger}>
                    Delete
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

const styles: any = {
  container: {
    padding: "50px",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "40px",
    fontSize: "28px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  bold: {
    fontWeight: 600,
  },
  muted: {
    fontSize: "13px",
    color: "#666",
  },
  badge: {
    marginTop: "4px",
    fontSize: "12px",
    background: "#e0f0ff",
    color: "#0070f3",
    padding: "3px 8px",
    borderRadius: "6px",
    display: "inline-block",
  },
  status: {
    fontSize: "12px",
    marginTop: "4px",
    color: "#555",
  },
  actions: {
    display: "flex",
    gap: "12px",
  },
  link: {
    textDecoration: "none",
    color: "#0070f3",
    fontSize: "14px",
  },
  danger: {
    textDecoration: "none",
    color: "#e5484d",
    fontSize: "14px",
  },
  primaryBtn: {
    background: "#0070f3",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
  },
  empty: {
    color: "#888",
  },
};
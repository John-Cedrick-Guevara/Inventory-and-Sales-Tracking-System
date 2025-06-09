import AuthProvider from "../Context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider role={"STAFF"}>
      <div>{children}</div>
    </AuthProvider>
  );
}

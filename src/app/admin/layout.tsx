"use client";
import AdminLayoutWrapper from "@/Components/Containers/AdminWrapper/AdminWrapper";
import AdminNav from "@/Components/Presentation/AdminNav/AdminNav";
import "./globalAdmin.css";

export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutWrapper>
      <div className="adminNav">
        <AdminNav />
      </div>
      {children}
    </AdminLayoutWrapper>
  );
}

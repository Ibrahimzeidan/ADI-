import { getAdminUser } from "@/middleware/admin.middleware";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";

export default async function AdminSettingsPage() {
  const admin = await getAdminUser();
  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Settings</h1>
      <AdminSettingsForm currentEmail={admin?.email ?? ""} />
    </div>
  );
}

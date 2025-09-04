import { SessionManagement } from "@/components/session-management";

export function SessionsPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <SessionManagement />
      </div>
    </div>
  );
}

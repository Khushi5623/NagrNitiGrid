import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }
  }

  async function markAsRead(id: string) {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    fetchNotifications();
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          {notifications.length === 0 && (
            <p className="text-sm text-gray-500">No notifications</p>
          )}

          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-2 mb-2 rounded cursor-pointer transition ${
                n.is_read ? "bg-gray-100" : "bg-blue-100"
              }`}
            >
              <h4 className="font-semibold text-sm">{n.title}</h4>
              <p className="text-xs text-gray-600">{n.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

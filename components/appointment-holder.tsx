"use client";
import { Appointment } from "@prisma/client";
import { Badge } from "./ui/badge";
import { Eye, Video } from "lucide-react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useParams, useRouter } from "next/navigation";

interface AppointmentHolderProps {
  appointment: Appointment;
}
const AppointmentHolder: React.FC<AppointmentHolderProps> = ({
  appointment,
}) => {
  const past = appointment.startTime < new Date();
  const router = useRouter()
  const params = useParams()
  return (
    <div
      className={`grid grid-cols-4 border p-4 rounded-md ${
        past && "bg-slate-100"
      }`}
    >
      <div>{appointment.clientName}</div>
      <div>
        {appointment.startTime.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}{" "}
        -{" "}
        {appointment.endTime.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </div>
      <div className="text-center">
        <Badge variant={past ? "green" : "destructive"}>
          {past ? "Completed" : "Upcoming"}
        </Badge>
      </div>
      <div className="flex items-center justify-center gap-2">
        <TooltipComponent
          position="TopCenter"
          content="View Client Info"
          target="#view"
        >
          <Eye
            id="view"
            className="hover:bg-slate-200 rounded-md cursor-pointer"
            onClick={() => router.push(`/${params.practiceId}/clientInfo/${appointment.clientId}`)}
          />
        </TooltipComponent>

        <TooltipComponent
          position="TopRight"
          content="Start Video Call"
          target="#video"
        >
          <Video
            id="video"
            className="hover:bg-slate-200 rounded-md cursor-pointer"
          />
        </TooltipComponent>
      </div>
    </div>
  );
};

export default AppointmentHolder;

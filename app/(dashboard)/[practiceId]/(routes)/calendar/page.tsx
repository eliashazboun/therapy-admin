"use client";
import React, { useEffect, useState, useRef } from "react";

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(process.env.SYNCFUSION_LICENSE || "");

import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  Inject,
  ViewDirective,
  ViewsDirective,
  ActionEventArgs,
  DragAndDrop,
  Resize,
  PopupOpenEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Client } from "@prisma/client";
import toast from "react-hot-toast";
import { L10n } from "@syncfusion/ej2-base";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Add",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Add Event",
    },
  },
});

const CalendarPage = ({ params }: { params: { practiceId: string } }) => {
  const [dataManager, setDataManager] = useState<DataManager | null>(null);
  const [clientNames, setClientNames] = useState<{ [key: string]: Object }[]>(
    []
  );

  const scheduleObj = useRef<ScheduleComponent>(null);
  const dropDownRef = useRef<DropDownListComponent>(null);

  const origin = "http://localhost:3000";

  useEffect(() => {
    const getClientNames = async (practiceId: string) => {
      const response = await fetch(`${origin}/api/${practiceId}/clients`);
      const data = await response.json();
      const formatted = data.map((client: Client) => {
        const fullName = client.firstName + " " + client.lastName;
        return {
          clientName: fullName,
          clientId: client.id,
        };
      });

      setClientNames(formatted);
    };

    const fetchData = async () => {
      const manager = new DataManager({
        url: `${origin}/api/${params.practiceId}/appointments/getAppointments`,
        crudUrl: `${origin}/api/${params.practiceId}/appointments`,
        adaptor: new UrlAdaptor(),
        crossDomain: true,
        enablePersistence: true,
      });
      await manager.ready;
      setDataManager(manager);
      console.log(manager);
    };
    fetchData();
    getClientNames(params.practiceId);
  }, []);

  const fields = { text: "clientName", value: "clientId" };
  const fieldsData = {
    id: "id",
    startTime: "startTime",
    endTime: "endTime",
    description: "notes",
    recurrenceRule: false,
  };

  const eventSettings = { dataSource: dataManager, fields: fieldsData };

  //Custome editor window template
  const editorWindowTemplate = (props: any): JSX.Element => {
    return (
      <table className="custom-event-editor">
        <tbody>
          <tr>
            <td className="e-textlabel">Client</td>
            <td>
              <DropDownListComponent
                className="e-field e-input"
                ref={dropDownRef}
                id="clientId"
                value={props.ClientId || props.clientId}
                text={props.Subject || props.subject}
                dataSource={clientNames}
                fields={fields}
                data-name="clientId"
              />
            </td>
          </tr>
          <tr>
            <td>From</td>
            <td>
              <DateTimePickerComponent
                className="e-field e-input"
                id="startTime"
                data-name="StartTime"
                value={new Date(props.StartTime || props.startTime)}
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td>To</td>
            <td>
              <DateTimePickerComponent
                className="e-field e-input"
                id="endTime"
                data-name="EndTime"
                value={new Date(props.EndTime || props.endTime)}
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr className="pt-10">
            <td>Appointment Notes</td>
            <td>
              <textarea
                className="e-field e-input"
                id="notes"
                data-name="notes"
                defaultValue={props.Description}
                rows={5}
                cols={50}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const actionComplete = (args: ActionEventArgs) => {
    if (args.requestType === "eventCreated") {
      toast.success("Appointment Created");
    }
    if (args.requestType === "eventChanged") {
      toast.success("Appointment Updated");
    }
    if (args.requestType === "eventRemoved") {
      toast.success("Appointment Deleted");
    }
  };

 

  return (
    <div>
      <div className="ml-10 mr-10 pb-10 pt-5">
        <Heading
          title="Calendar Page"
          description="Create and manage your appointments from here."
        />
        <Separator />
      </div>
      <ScheduleComponent
        className="ml-10 mr-10 text-center"
        ref={scheduleObj}
        selectedDate={new Date()}
        enablePersistence={true}
        enableRecurrenceValidation={false}
        showQuickInfo={true}

        actionComplete={actionComplete}
        eventSettings={eventSettings}
        allowDragAndDrop={true}
        height={650}
        editorTemplate={editorWindowTemplate}
        editorHeaderTemplate={(props: any) => {
          return (
            <div id="event-header">
              {props !== undefined ? (
                props.Subject ? (
                  <div>Appointment for {props.Subject}</div>
                ) : (
                  <div>Create New Appointment</div>
                )
              ) : (
                <div></div>
              )}
            </div>
          );
        }}
        // startHour={workHours.start}
        // endHour={workHours.end}

        // workDays={workingDays}
        // workHours={workHours}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda, DragAndDrop, Resize]} />
      </ScheduleComponent>
    </div>
  );
};

export default CalendarPage;

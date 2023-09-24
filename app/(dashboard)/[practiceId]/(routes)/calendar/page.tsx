"use client";
import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

import {registerLicense} from '@syncfusion/ej2-base'
registerLicense(process.env.SYNCFUSION_LICENSE || "")

import {
  ScheduleComponent,
  Day, 
  Week,
  Month,
  Agenda,
  Inject,
  ViewDirective,
  ViewsDirective,
  EventSettingsModel,
  ActionEventArgs,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { timelineResourceData } from "./datasource";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";
import { useOrigin } from "@/hooks/use-origin";

const CalendarPage = ({ params }: { params: { practiceId: string } }) => {
  //   const [dataManager, setDataManager] = useState<DataManager | null>(null);

  //   const origin = window.location.origin;
  //   console.log("🚀 ~ file: page.tsx:28 ~ origin:", origin);
  //   console.log(
  //     "🚀 ~ file: page.tsx:37 ~ fetchData ~ params.practiceId:",
  //     params.practiceId
  //   );
  //   console.log(`${origin}/api/${params.practiceId}/appointments`);

  //   const onActionBegin = (args:ActionEventArgs) => {
  //     if(args.requestType === "eventCreate") {
  //       console.log('DATA ARGS',args.data);
  //       console.log('DATA ARGS',args.requestType);
  //   }
  // }

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const manager = new DataManager({
  //         url: `${origin}/api/${params.practiceId}/appointments/`,
  //         crudUrl:`${origin}/api/${params.practiceId}/appointments/$batch`,
  //         adaptor: new ODataV4Adaptor(),
  //       });
  //       await manager.ready;
  //       console.log(manager.dataSource);
  //       setDataManager(manager);
  //     };
  //     fetchData();
  //   }, []);

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
        selectedDate={new Date()}
        enablePersistence={true}
        allowDragAndDrop
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

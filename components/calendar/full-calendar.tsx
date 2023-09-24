"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { v4 as uuidv4 } from "uuid";

import { CheckIcon, TriangleIcon } from "lucide-react";
import { CalendarModal } from "../modals/create-appointment-modal";
import { DateInfoObject, EventObject } from "@/types";
import * as z from "zod"
import { appointmentFormSchema } from "../modals/create-appointment-modal";



const Calendar = () => {
  const [events, setEvents] = useState<EventObject[]>([
    { title: "event 1", id: "1",start: new Date("2021-09-01T10:30:00"), allDay: false },
  ]);

  const [allEvents, setAllEvents] = useState<EventObject[]>(events);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState<EventObject>({
    title: "",
    start: null,
    allDay: false,
    id: "",
  });

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl),
        {
          itemSelector: ".fc-event",
          eventData: function (eventEl: HTMLElement) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            let start = eventEl.getAttribute("start");
            return {
              title: title,
              id: id,
              start: start,
            };
          },
        };
    }
  }, []);


  function handleDateClick(dateInfo:DateInfoObject) {
    setNewEvent({
      ...newEvent,
      start: dateInfo.date,
      allDay: dateInfo.allDay,
      id: uuidv4(),
    });
    setOpenCreateModal(true);
  }

  function addEvent(data: DropArg) {
    const event = {
      ...newEvent,
      start: data.date,
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: uuidv4(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setOpenDeleteModal(true);
    setIdToDelete(data.event.id);
  }

  function handleDelete() {
    setAllEvents(allEvents.filter((event) => event.id !== idToDelete));
    setOpenDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setNewEvent({
      title: "",
      start: null,
      allDay: false,
      id: "",
    });
    setOpenCreateModal(false);

    setOpenDeleteModal(false);
    setIdToDelete(null);
  }



  function handleSubmit(values:z.infer<typeof appointmentFormSchema>) {
    setAllEvents([...allEvents, newEvent]);
    setOpenCreateModal(false);
    setNewEvent({
      title: "",
      start: null,
      allDay: false,
      id: "",
    });
  }

  return (
    <>
      <CalendarModal
        isOpen={openCreateModal}
        onClose={handleCloseModal}
        onConfirm={() => handleSubmit}
        loading={false}
        newEvent={newEvent}
      />

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={allEvents as EventSourceInput}
              eventOverlap={false}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>
          <div className="ml-8 w-full border-2 p-2 rounded-md mt-16 h-[63%] bg-violet-50">
            <h1 className="font-bold text-lg text-center">Drag EventObject</h1>
          </div>
        </div>
      </main>
      {JSON.stringify(allEvents)}
    </>
  );
};

export default Calendar;

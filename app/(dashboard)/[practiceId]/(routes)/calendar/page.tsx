"use client"
import React from 'react'

import {
  Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { timelineResourceData } from './(test)/datasource';

const CalendarPage = () => {
  const eventSettings: EventSettingsModel = { dataSource: timelineResourceData }
  const group = { byGroupID: false, resources: ['Projects', 'Categories'] }

  const projectData: Object[] = [
    { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
  ];
  const categoryData: Object[] = [
    { text: 'Development', id: 1, color: '#1aaa55' },
  ];
  return (
    <>
    <h2 className=''>Syncfusion React Schedule Component</h2>
    <ScheduleComponent className='mt-20 mr-20' width='100%' height='550px' currentView='Month' selectedDate={new Date(2018, 3, 4)} eventSettings={eventSettings} group={group} >
      <ViewsDirective>
        <ViewDirective option='Week' />
        <ViewDirective option='Month' />
        <ViewDirective option='Agenda' />
      </ViewsDirective>
      <ResourcesDirective>
        <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false}
          dataSource={projectData} textField='text' idField='id' colorField='color'>
        </ResourceDirective>
        <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true}
          dataSource={categoryData} textField='text' idField='id' colorField='color'>
        </ResourceDirective>
      </ResourcesDirective>
      <Inject services={[Week, Month, Agenda, Resize, DragAndDrop]} />
    </ScheduleComponent>
  </>
  )
}

export default CalendarPage
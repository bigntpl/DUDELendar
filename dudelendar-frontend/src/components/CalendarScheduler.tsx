import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'

import { ModalInfosEventCalendar } from './ModalInfosEventCalendar'
import { useDisclosure } from '../hooks/useDiscloure'
import { useState } from 'react'
import { ContainerCalendar } from './styles'
import { updateEventCalendar } from '../services/eventCalendarApi'
import { toast } from 'react-toastify'
import { IEventCalendar } from '../domain/EventCalendar'

type CalendarSchedulerProps = {
  eventsCalendar: IEventCalendar[]
}

export const CalendarScheduler = ({ eventsCalendar }: CalendarSchedulerProps) => {
  const [eventInfos, setEventInfos] = useState()
  const [isEditCard, setIsEditCard] = useState<boolean>(false)

  const weekends = {
    weekendsVisible: true,
    currentEvents: [],
  }

  const modalInfosEvent = useDisclosure(false)

  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
    setIsEditCard(false)
    setEventInfos(selectInfo)
    modalInfosEvent.handleOpen()
  }

  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    setIsEditCard(true)
    setEventInfos(clickInfo)
    modalInfosEvent.handleOpen()
  }

  const handleUpdateEventSelect = async (changeInfo: any) => {
    try {
      const eventCalendarUpdated = {
        eventCalendar: {
          _id: changeInfo.event.id,
          title: changeInfo.event.title,
          start: changeInfo.event.startStr,
          end: changeInfo.event.endStr,
          backgroundColor: changeInfo.event.backgroundColor,
          textColor: changeInfo.event.textColor,
        },
      }

      await updateEventCalendar(eventCalendarUpdated)
    } catch (err) {
      toast.error('Houve um erro ao atualizar o evento')
    }
  }

  console.log("eventsCalendar: ",eventsCalendar)
  return (
    <ContainerCalendar>
      <ModalInfosEventCalendar
        open={modalInfosEvent.isOpen}
        handleClose={modalInfosEvent.handleClose}
        eventInfos={eventInfos}
        isEditCard={isEditCard}
      />
      {/* <div>{eventsCalendar !== undefined ? eventsCalendar: "wrong"}</div> */}
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        locale="en"
        timeZone='local'
        titleFormat={{ year: 'numeric', month: 'short', day: 'numeric' }}
        // googleCalendarApiKey="AIzaSyDRJn-F9sU7yKqeool89eXoQuz9svEwZaE"
        // eventSources={[
        //   {
        //     googleCalendarId: 'classroom104878545612951217677@group.calendar.google.com',
        //     className: 'nattapon',
        //   },
        //   {
        //     googleCalendarId: 'th.th#holiday@group.v.calendar.google.com',
        //     className: 'วันหยุดในไทย',
        //   },
        // ]}
        weekends={weekends.weekendsVisible}
        select={handleAddEventSelectAndOpenModal}
        eventClick={handleEditEventSelectAndOpenModal}
        eventChange={handleUpdateEventSelect}
        initialEvents={eventsCalendar}
        longPressDelay={1000}
        eventLongPressDelay={1000}
        selectLongPressDelay={1000}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={true}
        height="700px"
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
          list: 'List',
        }}
      />
    </ContainerCalendar>
  )
}

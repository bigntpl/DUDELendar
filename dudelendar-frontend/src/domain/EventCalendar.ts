export interface IEventCalendar {
  _id: string
  id?: string
  title: string
  end: string
  start: string
  user: string
}

export const mapEventCalendar = (eventCalendar: IEventCalendar) => ({
  ...eventCalendar,
  id: eventCalendar?._id,
})

export const mapArrayEventCalendar = (listEventsCalendar: IEventCalendar[]) => {
  if (listEventsCalendar !== null) {
    const listEventsCalendarFormated = listEventsCalendar.map((eventCalendar) => mapEventCalendar(eventCalendar));
    // console.log("listcalendar: ", listEventsCalendar[0].id)
    console.log("listEventsCalendarFormated: ", listEventsCalendarFormated)
    // return listEventsCalendarFormated;
    return listEventsCalendar;
  }
  console.log("null")
}

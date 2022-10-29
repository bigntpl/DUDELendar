export interface IEventCalendar {
  _id: string;
  id?: string;
  title: string;
  end: string;
  start: string;
  user: string;
}

export const mapEventCalendar = (eventCalendar: IEventCalendar) => ({
  ...eventCalendar,
  id: eventCalendar?._id,
});

export const mapArrayEventCalendar = (listEventsCalendar: IEventCalendar[]) => {
  if(listEventsCalendar !== undefined){
    // const listEventsCalendarFormated = listEventsCalendar.map((eventCalendar) => mapEventCalendar(eventCalendar));
    const listEventsCalendarFormated = listEventsCalendar[0];
    return listEventsCalendarFormated;
  }
};

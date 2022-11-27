import { Button, Modal, TextField } from '@mui/material'
import { CalendarApi } from '@fullcalendar/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createEventCalendar } from '../../services/eventCalendarApi'
import { BoxContainer } from './styles'

import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useSession } from 'next-auth/react'

interface ICardColor {
  backgroundColor: string
  textColor: string
}

interface IModalInfosEventCalendaryProps {
  open: boolean
  handleClose: () => void
  eventInfos: any
  isEditCard: boolean
}

export const ModalInfosEventCalendar = ({
  handleClose,
  open,
  eventInfos,
  isEditCard,
}: IModalInfosEventCalendaryProps) => {
  const [title, setTitle] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cardColor, setCardColor] = useState<ICardColor>({
    backgroundColor: '#039be5',
    textColor: '#ffffff',
  })
  const [value, setValue] = React.useState<Dayjs | null>(dayjs())
  const [value2, setValue2] = React.useState<Dayjs | null>(dayjs())
  const [text, setText] = useState<string>('')
  const { data: session } = useSession()

  useEffect(() => {
    if (isEditCard) {
      setTitle(eventInfos?.event?.title)
      setCardColor({
        backgroundColor: eventInfos?.event?.backgroundColor,
        textColor: eventInfos?.event?.textColor,
      })
      let startT = eventInfos.event?.startStr.toString()
      startT = startT.replace('T', ' ')
      startT = startT.replace('Z', '')

      let endT = eventInfos.event?.endStr.toString()
      endT = endT.replace('T', ' ')
      endT = endT.replace('Z', '')

      setText(eventInfos?.event?.extendedProps.detail)
      setValue(dayjs(startT))
      setValue2(dayjs(endT))
    } else {
      setTitle('')
      setCardColor({ backgroundColor: '#039be5', textColor: '#ffffff' })
    }
  }, [eventInfos, isEditCard])

  // const handleSelectCardColor = (color: ColorsCard) => {
  //   setCardColor({
  //     backgroundColor: color.backgroundColor,
  //     textColor: color.textColor,
  //   })
  // }

  const handleAddedEvent = async () => {
    if (!session) return
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar
      const eventCalendar = await createEventCalendar({
        name: title === '' ? 'untitled' : title,
        detail: text,
        start: value ? value.format('YYYY-MM-DD HH:mm:ss') : '',
        end: value2 ? value2.format('YYYY-MM-DD HH:mm:ss') : '',
        userid: session.userid,
      })

      calendarApi.addEvent({
        name: eventCalendar.name,
        detail: text,
        start: eventCalendar.start,
        end: eventCalendar.endStr,
        userid: session.userid,
      })
    } catch (err) {
      toast.error('Houve um erro ao criar um evento')
    } finally {
      setTitle('')
      handleClose()
    }
  }

  // const handleDeleteEvent = async () => {
  //   try {
  //     await deleteEventCalendar({ id: eventInfos.event.id })
  //     eventInfos.event.remove()
  //   } catch (error) {
  //     toast.error('Houve um erro ao deletar o evento')
  //   } finally {
  //     setTitle('')
  //     handleClose()
  //   }
  // }

  // const handleUpdatedEvent = async () => {
  //   try {
  //     const calendarApi: CalendarApi = eventInfos.view.calendar

  //     const eventCalendarUpdated = {
  //       eventCalendar: {
  //         _id: eventInfos.event.id,
  //         title: title !== '' ? title : 'Sem título',
  //         start: eventInfos.event.startStr,
  //         end: eventInfos.event.endStr,
  //         backgroundColor: cardColor.backgroundColor,
  //         textColor: cardColor.textColor,
  //       },
  //     }

  //     const currentEvent = calendarApi.getEventById(eventInfos.event.id)

  //     if (currentEvent) {
  //       currentEvent.setProp('title', title !== '' ? title : 'Sem título')
  //       currentEvent.setProp('backgroundColor', cardColor.backgroundColor)
  //       currentEvent.setProp('textColor', cardColor.textColor)
  //     }

  //     // await updateEventCalendar(eventCalendarUpdated)
  //   } catch (error) {
  //     toast.error('Houve um erro ao atualizar o evento')
  //   } finally {
  //     setTitle('')
  //     handleClose()
  //   }
  // }

  return (
    <Modal open={open} onClose={handleClose}>
      <BoxContainer>
        <TextField
          label={isEditCard ? '' : 'Add task...'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          disabled={isEditCard ? true : false}
        />
        <div className="flex flex-cols items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label=""
              value={value}
              disabled={isEditCard ? true : false}
              onChange={(newValue) => {
                setValue(newValue)
              }}
            />
          </LocalizationProvider>
          <div className="p-5">to</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label=""
              value={value2}
              disabled={isEditCard ? true : false}
              onChange={(newValue) => {
                setValue2(newValue)
              }}
            />
          </LocalizationProvider>
        </div>

        <TextField
          label={isEditCard ? '' : 'Detail'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          disabled={isEditCard ? true : false}
        />

        {isEditCard ? (
          ''
        ) : (
          <Button variant="outlined" fullWidth onClick={handleAddedEvent} sx={{ marginTop: '0.5rem' }}>
            {isEditCard ? '' : 'Add Event'}
          </Button>
        )}

        {/* {isEditCard && (
          <Button variant="outlined" fullWidth sx={{ marginTop: '0.5rem' }} onClick={handleDeleteEvent}>
            Delete Event
          </Button>
        )} */}
      </BoxContainer>
    </Modal>
  )
}

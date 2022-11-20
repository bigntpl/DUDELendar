import { Button, Modal, TextField } from '@mui/material'
import { CalendarApi } from '@fullcalendar/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ColorsCard, ListColorsCard } from '../../constants/ListColorsCard'
import { createEventCalendar, deleteEventCalendar, updateEventCalendar } from '../../services/eventCalendarApi'
import { BackgroundColorRounded, BoxContainer, SelectColors } from './styles'

import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import RichTextEditor from '../RichText';

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
  const [cardColor, setCardColor] = useState<ICardColor>({
    backgroundColor: '#039be5',
    textColor: '#ffffff',
  })

  useEffect(() => {
    if (isEditCard) {
      setTitle(eventInfos?.event?.title)
      setCardColor({
        backgroundColor: eventInfos?.event?.backgroundColor,
        textColor: eventInfos?.event?.textColor,
      })
    } else {
      setTitle('')
      setCardColor({ backgroundColor: '#039be5', textColor: '#ffffff' })
    }
  }, [eventInfos, isEditCard])

  const handleSelectCardColor = (color: ColorsCard) => {
    setCardColor({
      backgroundColor: color.backgroundColor,
      textColor: color.textColor,
    })
  }

  const handleAddedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar

      const eventCalendar = await createEventCalendar({
        eventCalendar: {
          title: title === '' ? 'Sem título' : title,
          start: eventInfos.startStr,
          end: eventInfos.endStr,
          backgroundColor: cardColor.backgroundColor,
          textColor: cardColor.textColor,
        },
      })

      calendarApi.addEvent({
        id: eventCalendar._id,
        title: eventCalendar.title,
        start: eventCalendar.start,
        end: eventCalendar.endStr,
        backgroundColor: cardColor.backgroundColor,
        textColor: cardColor.textColor,
      })
    } catch (err) {
      toast.error('Houve um erro ao criar um evento')
    } finally {
      setTitle('')
      handleClose()
    }
  }

  const handleDeleteEvent = async () => {
    try {
      await deleteEventCalendar({ id: eventInfos.event.id })
      eventInfos.event.remove()
    } catch (error) {
      toast.error('Houve um erro ao deletar o evento')
    } finally {
      setTitle('')
      handleClose()
    }
  }

  const handleUpdatedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar

      const eventCalendarUpdated = {
        eventCalendar: {
          _id: eventInfos.event.id,
          title: title !== '' ? title : 'Sem título',
          start: eventInfos.event.startStr,
          end: eventInfos.event.endStr,
          backgroundColor: cardColor.backgroundColor,
          textColor: cardColor.textColor,
        },
      }

      const currentEvent = calendarApi.getEventById(eventInfos.event.id)

      if (currentEvent) {
        currentEvent.setProp('title', title !== '' ? title : 'Sem título')
        currentEvent.setProp('backgroundColor', cardColor.backgroundColor)
        currentEvent.setProp('textColor', cardColor.textColor)
      }

      await updateEventCalendar(eventCalendarUpdated)
    } catch (error) {
      toast.error('Houve um erro ao atualizar o evento')
    } finally {
      setTitle('')
      handleClose()
    }
  }

  const [value, setValue] = React.useState<Dayjs | null>(dayjs())
  const [value2, setValue2] = React.useState<Dayjs | null>(dayjs())

  return (
    <Modal open={open} onClose={handleClose}>
      <BoxContainer>
        <TextField label={'Add task...'} value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        {/* <SelectColors>
          {ListColorsCard.map((color, index) => (
            <BackgroundColorRounded
              key={index}
              selected={false}
              color={color.backgroundColor}
              onClick={() => handleSelectCardColor(color)}
            >
              <input type="radio" name="cardColor" checked={color.backgroundColor === cardColor.backgroundColor} />
            </BackgroundColorRounded>
          ))}
        </SelectColors> */}
        <div className="flex flex-cols items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label=""
              value={value}
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
              onChange={(newValue) => {
                setValue2(newValue)
              }}
            />
          </LocalizationProvider>
        </div>

        <RichTextEditor id="rte"></RichTextEditor>

        <Button
          variant="outlined"
          fullWidth
          onClick={isEditCard ? handleUpdatedEvent : handleAddedEvent}
          sx={{ marginTop: '0.5rem'}}
        >
          {isEditCard ? 'Update Event' : 'Add Event'}
        </Button>

        {isEditCard && (
          <Button variant="outlined" fullWidth sx={{ marginTop: '0.5rem' }} onClick={handleDeleteEvent}>
            Delete Event
          </Button>
        )}
      </BoxContainer>
    </Modal>
  )
}
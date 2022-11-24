import React from 'react'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { CalendarScheduler } from '../../components/CalendarScheduler'
import { mapArrayEventCalendar } from '../../domain/EventCalendar'
import { getAllEventsCalendar, getAllEventsCalendarById } from '../../services/eventCalendarApi'
import { ContainerMain } from '../../styles/Home'
import { getSession, useSession } from 'next-auth/react'

interface IHomeProps {
  listAllEventsCalendar: any
}

const Home = ({ listAllEventsCalendar }: IHomeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [listEventsCalendar, setListEventsCalendar] = useState<any[]>(listAllEventsCalendar)
  // const eventsCalendar = getAllEventsCalendar()
  // console.log('eventsCalendar', eventsCalendar)
  // const a = listEventsCalendar

  // var b:any[]
  console.log('listEventsCalendar: ', listEventsCalendar)
  const { data: session } = useSession()

  console.log('session from event', session?.userid)
  console.log('listEventsCalendar', listEventsCalendar)

  const eventById = getAllEventsCalendarById(session != undefined ? session.userid : 0)
  console.log('test', eventById)
  // const newEvents = mapArrayEventCalendar(test)

  // console.log("log from server", eventsCalendar)
  // if (test !== undefined) {
  // }
  // a.forEach((event, index) => {
  //   if (session && session.user?.userid != event.user) {
  //     b.push(event)
  //   }
  // })
  // console.log('listEventsCalendar after', b)

  // useEffect(()=>{
  //   // const a = listEventsCalendar;
  //   // console.log('listEventsCalendar: ', listEventsCalendar)
  //   // const { data:session} = useSession();
  //   // a.forEach((event, index) =>{
  //   //   if (session && session.user?.userid != event.user) {
  //   //     listAllEventsCalendar.splice(index, 1)
  //   //   }
  //   // })
  //   setListEventsCalendar(a)
  // },[JSON.stringify(listEventsCalendar)])

  return (
    <>
      <Head>
        <title>DUDELendar Scheduler</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=""></div>
      <ContainerMain>
        <CalendarScheduler eventsCalendar={listEventsCalendar} />
      </ContainerMain>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const session = await getSession()
  // console.log('session from server', session != null ? session : 'nothing')
  const eventsCalendar = await getAllEventsCalendar()
  // console.log("log from server", eventsCalendar)
  const listAllEventsCalendar = mapArrayEventCalendar(eventsCalendar)
  // console.log("listAllEventsCalendar: ",listAllEventsCalendar)

  return {
    props: {
      listAllEventsCalendar: listAllEventsCalendar ?? [],
    },
  }
}

export default Home

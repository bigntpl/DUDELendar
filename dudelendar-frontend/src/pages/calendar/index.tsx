import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { CalendarScheduler } from '../../components/CalendarScheduler'
import { mapArrayEventCalendar } from '../../domain/EventCalendar'
import { getAllEventsCalendar } from '../../services/eventCalendarApi'
import { ContainerMain } from '../../styles/Home'

interface IHomeProps {
  listAllEventsCalendar: any
}

const Home = ({ listAllEventsCalendar }: IHomeProps) => {
  const [listEventsCalendar, setListEventsCalendar] = useState<any[]>(listAllEventsCalendar)
  const eventsCalendar = getAllEventsCalendar()
  console.log('eventsCalendar', eventsCalendar)
  console.log('listEventsCalendar: ', listEventsCalendar)

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
  const eventsCalendar = await getAllEventsCalendar();
  console.log("log from server", eventsCalendar)
  const listAllEventsCalendar = mapArrayEventCalendar(eventsCalendar)
  console.log("listAllEventsCalendar: ",listAllEventsCalendar)

  return {
    props: {
      listAllEventsCalendar: listAllEventsCalendar ?? [],
    },
  };
};

export default Home

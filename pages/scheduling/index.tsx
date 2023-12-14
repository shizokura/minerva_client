import HomePageLayout from '@/layout/homepagelayout'
import PageWithLayout from '@/layout/pagewithlayout'
import Image from 'next/image';
import React, { FC, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "@/styles/customer/customer.module.scss";
import Script from 'next/script';


const Scheduling: FC = () => {
  const [ selectedDate, setSelectedDate ] = useState<Date | null>(null);
  const [ selectedTime, setSelectedTime ] = useState<string>('');

  const handleTimeButtonClick = (time: string) => {
    // Handle the click event for time buttons
    setSelectedTime(time);
  };
  const handleScheduleClick = () => {
    // Handle the click event for the "Schedule" button
    // You can use selectedDate and selectedTime in your logic here
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
  };

  return (
    <div className={styles.bodyProducts}>

      <div className="w-screen relative top-20">
        <div className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-yellow-100/60 py-32 text-center shadow-xl shadow-gray-300">
          <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">Book a Service</h1>
          <p className="mt-6 text-lg text-white">Set up your Appointment</p>
          <Image className="absolute top-0 left-0 -z-10 h-full w-full object-cover" src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
        </div>

        <div className='flex flex-col items-center justify-center'>
          <div className="flex flex-row items-center justify-center mx-auto max-w-screen-[2000px] px-4 pb-20 gap-60">
            <div className="w-full lg:max-w-sm bg-white border border-gray-200 rounded-lg shadow transition-all duration-700 hover:scale-105">
              <div>
                <Image src={'/services.png'} alt={""} height={350} width={450} />
              </div>
              <div className="p-4">
                <h4 className="text-xl font-semibold text-black-600 text-center">
                  Tire Change
                </h4>
                <p className="mb-2 leading-normal text-center">
                  Lorem Ipsum
                </p>
                <p className="mr-2 text-lg font-bold text-black dark:text-black">
                  PHP 500.00
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="">
                <p className="mt-8 font-serif text-xl font-bold text-white">Select a Date</p>
                <div className="relative mt-4 w-56">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    dateFormat="MM/dd/yyyy"
                    className="datepicker-input block w-full rounded-lg border border-yellow-100 bg-yellow-50 p-2.5 pl-10 text-black-800 outline-none ring-opacity-30 placeholder:text-black-800 focus:ring focus:ring-[#FFBD59] sm:text-sm"
                    placeholderText="Select date"
                  />
                </div>
              </div>

              <div className="">
                <p className="mt-8 font-serif text-xl font-bold text-white">Select a Time</p>
                <div className="mt-4 grid grid-cols-3 gap-2 lg:max-w-xl">
                  {[ '08:00', '09:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00' ].map((time) => (
                    <button
                      key={time}
                      className={`rounded-lg ${selectedTime === time ? 'bg-[#FFBD59] text-white' : 'bg-yellow-100 text-black-900'
                        } px-4 py-2 font-medium active:scale-95 hover:bg-[#FFBD59] hover:text-white border-2 focus:outline-none`}
                      onClick={() => handleTimeButtonClick(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="mt-8 w-56 rounded-full border-6 border-yellow-100 bg-[#FFBD59] px-16 py-4 text-base font-bold text-white transition hover:translate-y-1"
                onClick={handleScheduleClick}
              >
                Schedule
              </button>
            </div>
          </div>
        </div>

      </div>
      <Script src="https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"></Script>

    </div>
  )

}

(Scheduling as PageWithLayout).layout = HomePageLayout
export default Scheduling

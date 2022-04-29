import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

export default function Navbar() {
  const router = useRouter()


  return (
    <Disclosure as="nav" className="bg-gray-800 z-50 sticky top-0">
    {({ open }) => (
      <>
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-2">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                {/* logo */}
                <Link href='/'>
                  <a className='text-gray-300 px-1 py-2 text-sm font-medium rounded'>Video Games Suggestion</a>
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {/* nav links */}
                  <Link href='/results'>
                    <a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded cursor-pointer'>Results</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className='flex space-x-4 items-center'>
              </div>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* mobile nav links */}
            <Link href='/results'>
              <Disclosure.Button
                as="a"
                className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer'
              >
                Results
              </Disclosure.Button>
            </Link>
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>

  )
}

"use client"
import React from 'react'
import Link from 'next/link'

const IdPage = ({ params }: { params: { id: string } }) => {

  return (
    <div className='text-center m-6 font-bold text-xl text-blue-950'>
      <Link href={`/${params.id}/visit-companion`}>Click to Visit Companion</Link>
    </div>
  );
}

export default IdPage;

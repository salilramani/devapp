import Link from 'next/link'
import React from 'react'

const Markupcard = () => {
  return (
    <>
        <div>Markupcard</div>
        <Link href = "https://assuredpsychology.com/">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Assured Psychology Markup</div>
                        <p class="text-gray-700 text-base">
                        Click here to open the markup file.
                        </p>
                    </div>

        </div>
        </Link>
    </>
    
  )
}

export default Markupcard
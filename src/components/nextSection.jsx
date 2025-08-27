'use client'
import React, { useRef } from 'react'

const Section = () => {
    const nextSectionRef = useRef(null);

    return (
        <div>
            <div ref={nextSectionRef} className="h-screen bg-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-6xl font-bold mb-8">Next Section</h2>
                    <p className="text-xl max-w-2xl">
                        This is your next section that comes after the Avitec animation completes.
                        You can add any content here - hero sections, feature cards, testimonials, etc.
                    </p>
                    <button className="mt-8 px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Section
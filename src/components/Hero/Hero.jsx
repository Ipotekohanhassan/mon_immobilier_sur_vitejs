import React from 'react'
import HeroImg from '../../assets/logo.png'

const Hero = () => {
  return (
    <>
        <section>
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[550px] relative">
                {/* Brand Info */}
                <div className='flex flex-col justify-center py-14 md:py-0 font-playfair '>
                    <div className='text-center md:text-left space-y-6'>
                        <h1 className='text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal'>
                              Bienvenue sur <span className='italic'> Mon <span className='text-primary'>Immobilier sûr</span></span>{" "}
                        </h1>
                        <p className='text-gray-600 xl:max-w-[500px]'>
                              Que vous soyez un chercheur de propriété en quête de votre prochain bien immobilier ou un agent souhaitant mieux gérer vos annonces, nous avons la solution qu'il vous faut.
                        </p> 
                        {/* Button Section    */}
                        <div className='flex justify-center gap-8 md:justify-start !mt-4'>
                            <button className='primary-btn flex items-center gap-2'>Contactez-Nous</button>
                            <button className='flex justify-center items-center gap-2'>A propos de nous</button>
                        </div>
                    </div>
                </div>
                {/* Hero Image */}
                <div className='flex justify-center items-center'>
                    <img src={HeroImg} alt="" className='w-[350px] md:w-[550px] xl:w-[700px] drop-shadow-sm'/>
                </div>
            </div>
        </section>
    </>
  )
}

export default Hero
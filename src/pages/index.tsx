import React from 'react'
import dynamic from 'next/dynamic'
import {NextPageWithLayout} from '@/interfaces/layout'
import {MainLayout} from '@/components/layout'

const DynamicHomeHero = dynamic(() => import('../components/home/hero'))
const DynamicHomeFeature = dynamic(() => import('../components/home/feature'))
const DynamicHomePopularCourse = dynamic(() => import('../components/home/popular-courses'))
const DynamicHomeTestimonial = dynamic(() => import('../components/home/testimonial'))
const DynamicHomeOurMentors = dynamic(() => import('../components/home/doctors'))
const DynamicHomeNewsLetter = dynamic(() => import('../components/home/newsletter'))

const Home: NextPageWithLayout = () => {
    return (
        <>
            <DynamicHomeHero/>
            <DynamicHomePopularCourse/>
            <DynamicHomeFeature/>
            <DynamicHomeTestimonial/>
            <DynamicHomeOurMentors/>
            <DynamicHomeNewsLetter/>
        </>
    )
}

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Home.getInitialProps = null
export default Home

import React from 'react';
import { NextPageWithLayout } from '@/interfaces/layout';
import { MainLayout } from '@/components/layout';
import {
    HomeFeature,
    HomeHero,
    HomeNewsLetter,
    HomeOurMentors,
    HomePopularCourse,
    HomeTestimonial,
} from '@/components/home';

const Index: NextPageWithLayout = () => {
    return (
        <React.Fragment>
            <HomeHero />
            <HomePopularCourse />
            <HomeFeature />
            <HomeTestimonial />
            <HomeOurMentors />
            <HomeNewsLetter />
        </React.Fragment>
    );
};
Index.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default Index;
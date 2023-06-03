import type {Course} from '@/interfaces/course'

export const data: Array<Course> = [
    {
        id: 1,
        cover: '/images/depart/neuro.jpeg',
        title: 'Відділ неврології:',
        desc: 'Експертна діагностика та лікування розладів нервової системи.',
        category: 'Beginner',
    },
    {
        id: 2,
        cover: '/images/depart/cardio.jpeg',
        title: 'Відділ кардіології',
        desc: 'Передові методи лікування серцево-судинних захворювань.',
        category: 'Intermediate',
    },
    {
        id: 3,
        cover: '/images/depart/onco.jpeg',
        title: 'Відділ онкології:',
        desc: 'Індивідуальний підхід у боротьбі з онкологічними захворюваннями.',
        category: 'Beginner',
    },
    {
        id: 4,
        cover: '/images/depart/gastro.jpeg',
        title: 'Відділ гастроентерології: ',
        desc: 'Діагностика та лікування розладів шлунково-кишкового тракту.',
        category: 'Intermediate',
    },
    {
        id: 5,
        cover: '/images/depart/trauma.png',
        title: 'Відділ травматології: ',
        desc: 'Кваліфікована допомога у лікуванні травматичних ушкоджень.',
        category: 'Intermediate',
    },
    {
        id: 6,
        cover: '/images/depart/genicologist.jpeg',
        title: 'Відділ гінекології:',
        desc: 'Індивідуальна підтримка та лікування репродуктивних проблем.',
        category: 'Beginner',
    },
    {
        id: 7,
        cover: '/images/depart/padiatr.jpeg',
        title: 'Відділ педіатрії:',
        desc: 'Комплексна медична допомога та поради батькам для здоров\'я дітей.',
        category: 'Beginner',
    },
]

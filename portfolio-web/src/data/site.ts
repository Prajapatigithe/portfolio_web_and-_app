export const profile = {
  name: 'Ankit Kumar',
  title: 'React Native Developer',
  intro:
    'I craft performant mobile experiences with React Native, TypeScript, and scalable architecture. Passionate about clean UI, reliable APIs, and shipping products users love.',
  image: '/Ankit.png',
}

export const about = {
  paragraphs: [
    'I am a React Native developer focused on building polished cross-platform apps with strong attention to performance, accessibility, and maintainability.',
    'My experience spans JavaScript and TypeScript, state management with Redux, REST and GraphQL-style integrations, and Firebase-backed features such as auth and realtime data.',
    'I enjoy collaborating with designers and backend engineers to turn ideas into stable releases and measurable user value.',
  ],
}

export const skills = [
  'React Native',
  'JavaScript',
  'TypeScript',
  'Redux',
  'APIs',
  'Firebase',
] as const

export type Project = {
  title: string
  description: string
  tech: string[]
  github: string
}

export const projects: Project[] = [
  {
    title: 'NewTapri',
    description: 'A modern mobile application built with React Native, focused on delivering a smooth and responsive user experience. The app includes real-time data handling, optimized performance, and clean navigation.',
    tech: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    github: 'https://github.com/Prajapatigithe',
  },
  {
    title: 'Khajanchi',
    description: 'An e-commerce mobile application designed for seamless product browsing, secure transactions, and smooth user experience. Built with a focus on scalability and performance.',

    tech: ['React Native', 'JavaScript', 'Redux', 'APIs'],
    github: 'https://github.com/Prajapatigithe',
  },
  {
    title: 'AchiDeal',
    description:
      'A marketplace mobile application that allows users to buy and sell products locally. The app focuses on real-time listings, smooth user experience, and easy interaction between buyers and sellers.',
    tech: ['React Native', 'TypeScript', 'Firebase', 'APIs'],
    github: 'https://github.com/Prajapatigithe',
  },
]

export const contact = {
  email: 'officialankit2306@gmail.com',
  phone: '+91 9889091773',
  linkedin: 'https://www.linkedin.com/in/ankit-kumar-01603b2b8/',
  github: 'https://github.com/Prajapatigithe',
}

export const resumeFile = '/ResumeAnkitKumar1.pdf'

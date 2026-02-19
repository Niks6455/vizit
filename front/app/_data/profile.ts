export type ProfileLink = {
  label: string;
  href: string;
};

export type ProfileProject = {
  name: string;
  description: string;
  stack?: string[];
  href?: string;
  details?: string;
  images?: string[];
  links?: Array<{ label: string; href: string }>;
};

export type ProfileExperience = {
  period: string;
  company: string;
  title: string;
  bullets: string[];
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  summary: string;
  contacts: ProfileLink[];
  stack: {
    primary: string[];
    also: string[];
  };
  experience: ProfileExperience[];
  achievements: string[];
  projects: ProfileProject[];
};

export const profile: Profile = {
  name: "Никита Капылов",
  title: "Front-end Developer",
  location: "Россия, г. Таганрог",
  summary:
    "Делаю интерфейсы для продуктовых web-систем: от корпоративных сервисов до b2b-платформ. Основной стек — React / Next.js, Vue / Nuxt, TypeScript. Люблю аккуратный UI, сложные пользовательские сценарии и интерфейсы, которые остаются быстрыми при росте данных.",
  contacts: [
    { label: "Email", href: "mailto:7929189niks64@gmail.com" },
    { label: "Телефон", href: "tel:+79508630484" },
    { label: "GitHub", href: "https://github.com/Niks6455" },
    { label: "Telegram", href: "https://t.me/NiksKap" },
    { label: "VK", href: "https://vk.com/nkapylov" },
  ],
  stack: {
    primary: [
      "TypeScript",
      "React",
      "Next.js",
      "Redux",
      "Zustand",
      "Vue",
      "Nuxt",
      "Pinia",
      "REST API",
      "WebSocket",
      "Tailwind CSS",
    ],
    also: [
      "PrimeVue",
      "Material UI",
      "Git",
      "Postman",
      "Sentry",
      "Figma",
      "PgAdmin",
      "WordPress",
      "Gulp",
      "SCSS",
      "CSR",
      "SSG",
      "SSR",
    ],
  },
  experience: [
    {
      period: "Март 2025 — настоящее время",
      company: "Hantico",
      title: "Front-end Developer",
      bullets: [
        "Разработка платформы-агрегатора для таксопарков.",
        "Интеграция с API Яндекса (авторизация, обмен данными, мониторинг заказов).",
        "Разработка корпоративных лендингов и посадочных страниц.",
        "Оптимизация UI и производительности, покрытие кода тестами.",
      ],
    },
    {
      period: "Август 2023 — Март 2025",
      company: "ООО «Центр исследований и разработки»",
      title: "Front-end Developer",
      bullets: [
        "Workload — система распределения учебной нагрузки: сложные таблицы, формы, фильтрация, CRUD-сценарии.",
        "РУМЦ — инклюзивная платформа для студентов и работодателей: формы, роли, бизнес-логика, работа с данными.",
        "ССПС — внутренний сервис с большим количеством сущностей, фильтрацией и статусными сценариями.",
        "Ostarbaiter — веб-платформа с data-driven интерфейсами и CRUD-логикой.",
        "ICTIS — информационный портал для студентов сотрудников.",
        "Ilinsky — корпоративный сайт и внутренние модули, верстка и интеграция с API.",
        "Корпоративные сайты и сервисы — разработка интерфейсов, формы, таблицы, оптимизация UI.",
      ],
    },
    {
      period: "Январь 2022 — Июль 2022",
      company: "SOVA-TECH",
      title: "Front-end Developer",
      bullets: [
        "Разработка CRM системы: таблицы, формы, бизнес-логика.",
        "Интеграция с REST API, БД и Telegram-ботом.",
        "Работа над оптимизацией UI и производительности, улучшение SEO.",
      ],
    },
  ],
  achievements: [
    "Победитель хакатона CuberGarden 19: «Система анализа вовлечённости пользователей в медиаконтент» (Нейротех).",
    "Победитель «Южный ИТ-форум 2025»: «Сервис проверки хостов и DNS-резолвинга» (AEZA).",
    "Победитель хакатона CuberGarden 18: «Интерактивная карта офиса» (IBS DUNICE).",
    "Участие в хакатонах CuberGarden 16/17, реализации кейсов от компаний IBS DUNICE / OJJETTO.",
  ],
  projects: [
    {
      name: "Hantico",
      description:
        "CRM-платформа для управления таксопарками и платформенной занятостью.",
      href: "https://hantico.ru/",
      details:
        "Продуктовая CRM-система для таксопарков: управление клиентами и водителями, финансы, отчёты и аналитика. Реализация сложных интерфейсов с таблицами, фильтрацией и визуализацией данных, интеграции с внешними сервисами и API. Фокус на производительность, масштабируемость и удобство работы с большими объёмами данных.",
      stack: [
        "Vue",
        "Nuxt",
        "TypeScript",
        "REST API",
        "WebSocket",
        "PrimeVue",
        "Pinia",
      ],
      images: ["/images/hanticoFirst.png", "/images/hanticoSecond.png"],
      links: [{ label: "Сайт", href: "https://hantico.ru/" }],
    },
    {
      name: "РУМЦ",
      description: "Инклюзивная платформа для студентов и работодателей.",
      href: "https://digitaltwin.sfedu.ru/",
      details:
        "Платформа для студентов с особыми образовательными потребностями и работодателей: личные кабинеты, формы, роли, коммуникация между студентами, вузами и организациями. Фокус на доступность и понятные пользовательские сценарии.",
      stack: [
        "React",
        "TypeScript",
        "Zustand",
        "Tanstack Query",
        "React Hook Form",
      ],
      images: ["/images/rumcFirst.png", "/images/rumcSecond.png"],
      links: [{ label: "Platform", href: "https://digitaltwin.sfedu.ru/" }],
    },
    {
      name: "ССПС",
      description: "Платформа научной конференции.",
      href: "https://ssas.sfedu.ru/",
      details:
        "Платформа для проведения конференции: роли пользователей, модули аутентификации, формы подачи материалов, интеграция с REST API.",
      stack: ["React", "TypeScript", "Tanstack Query", "Redux"],
      images: ["/images/ssFirst.png", "/images/ssSecond.png"],
      links: [
        { label: "Platform", href: "https://ssas.sfedu.ru/" },
        { label: "GitHub", href: "https://github.com/Niks6455" },
      ],
    },
    {
      name: "WORKLOAD",
      description: "Система распределения учебной нагрузки.",
      details:
        "Информационная система для распределения учебной нагрузки преподавателей: сложные CRUD-сценарии, фильтрации, роли пользователей, работа с большими таблицами и формами.",
      stack: ["React", "TypeScript", "REST API", "WebSocket", "Redux"],
      images: ["/images/workloadFirst.png", "/images/workloadSecond.png"],
      links: [
        { label: "GitHub", href: "https://github.com/simai1/workloadICTIS" },
      ],
    },
    {
      name: "ICTIS",
      description: "Внутренняя платформа института ИКТИБ ЮФУ.",
      href: "https://ictis.sfedu.ru/",
      details:
        "Корпоративная платформа института ИКТИБ для хранения и управления всей внутренней информацией. Личные кабинеты, формы и сервисы для студентов, сотрудников и администраций. Реализована работа с данными, пользовательскими сценариями и интеграция с backend-API.",
      stack: ["JavaScrip", "WordPress", "Elementor", "PHP", "MySQL"],
      images: ["/images/ictisFirst.png", "/images/ictisSecond.png"],
      links: [{ label: "Platform", href: "https://ictis.sfedu.ru/" }],
    },

    {
      name: "SOVA-fix",
      description: "CRM для ремонта, эксплуатации и ТО.",
      href: "https://sova-fix.com",
      details:
        "CRM-система для управления ремонтом и эксплуатацией объектов: таблицы и формы, бизнес-логика, фильтрация, статусы, интеграции с API.",
      stack: ["Vue", "Nuxt", "TypeScript", "REST API", "Pinia", "PrimeVue"],
      images: ["/images/sovaFirst.png", "/images/sovaSecond.png"],
      links: [{ label: "Landing", href: "https://sova-fix.com" }],
    },
  ],
};

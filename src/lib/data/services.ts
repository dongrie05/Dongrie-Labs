import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'mobile',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description:
      'iOS and Android apps with React Native. One codebase, two stores. Native-feel performance and fast delivery.',
  },
  {
    id: 'ai',
    icon: 'Brain',
    title: 'AI Integration',
    description:
      'Integrate LLMs, vision, and automation into your product or workflows. Custom chatbots and intelligent tools.',
  },
  {
    id: 'automation',
    icon: 'Workflow',
    title: 'Business Automation',
    description:
      'Workflows, scripts, and tools that save hours every week. Connect your stack and automate the rest.',
  },
  {
    id: 'mvp',
    icon: 'Rocket',
    title: 'MVP Development',
    description:
      'Get a working product in weeks so you can validate and iterate. Clear scope, fixed timeline.',
  },
  {
    id: 'api',
    icon: 'Plug',
    title: 'API Integrations',
    description:
      'Connect your app to payment, CRM, or any third-party API. Reliable integrations with proper error handling.',
  },
  {
    id: 'custom',
    icon: 'Code2',
    title: 'Custom Software Tools',
    description:
      'Bespoke web or desktop tools tailored to your workflow. Dashboards, admin panels, niche tools.',
  },
];

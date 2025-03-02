import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { Staff } from '../models/Staff';
import { i18n } from '../models/Translation';

const { t } = i18n;

export interface MenuItem {
  title: string;
  href?: string;
  icon?: IconProp;
  list?: MenuItem[];
  roles?: Staff['type'][];
}

export const menus: () => MenuItem[] = () => [
  {
    title: t('basic_settings'),
    list: [
      {
        title: t('edit_activity'),
        href: 'edit',
        icon: 'edit',
      },
      {
        title: t('edit_questionnaire'),
        href: 'questionnaire',
        icon: 'edit',
      },
      {
        title: t('sign_up_user'),
        href: 'participant',
        icon: 'user',
        list: [
          {
            title: t('registration_statistics'),
            href: 'participant/statistic',
          },
        ],
      },
      {
        title: t('admin'),
        href: 'administrator',
        icon: 'user-secret',
      },
      {
        title: t('prize_settings'),
        href: 'award',
        icon: 'trophy',
      },
      {
        title: t('join_activity_team'),
        href: 'team',
        icon: 'people-group',
        roles: ['judge'],
      },
      {
        title: t('works_awards'),
        href: 'evaluation',
        icon: 'star',
      },
      {
        title: t('sponsor_information'),
        href: 'organization',
        icon: 'sitemap',
      },
      {
        title: t('announcement'),
        href: 'message',
        icon: 'bullhorn',
      },
      {
        title: t('log'),
        href: 'log',
        icon: 'message',
      },
    ],
  },
  {
    title: t('advance_settings'),
    list: [
      {
        title: t('cloud_resource'),
        href: 'git',
        icon: 'cloud',
      },
    ],
  },
];

export const activityTeamMenus: () => MenuItem[] = () => [
  {
    title: t('team_manage'),
    list: [
      {
        title: t('team_registration'),
        href: 'participant',
        icon: 'user',
        roles: ['admin'],
      },
      {
        title: t('role_management'),
        href: 'role',
        icon: 'user-secret',
        roles: ['admin'],
      },
      {
        title: t('cloud_development_environment'),
        href: 'git',
        icon: 'cloud',
      },
    ],
  },
];

export const adminMenus: () => MenuItem[] = () => [
  {
    title: t('platform_management'),
    list: [
      {
        title: t('activity_manage'),
        href: '/',
        icon: 'user',
      },
      {
        title: t('admin_management'),
        href: 'platform-admin',
        icon: 'user-secret',
      },
    ],
  },
];
